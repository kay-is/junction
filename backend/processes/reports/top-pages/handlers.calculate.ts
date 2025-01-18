import * as Utils from "../../common/utilities"

// -------------------- Report State --------------------

declare var DispatcherId: string
if (DispatcherId === undefined) DispatcherId = ao.env.Process.Tags.DispatcherId

declare var ProcessedEventCount: number
if (ProcessedEventCount === undefined) ProcessedEventCount = 0

declare var ActiveRecords: number
if (ActiveRecords === undefined) ActiveRecords = 0

type JunctionSession = {
  id: string
  startedAt: number
  pages: Record<string, boolean>
  firstPage: string
  firstPageTimestamp: number
}

declare var Sessions: Record<string, JunctionSession>
if (Sessions === undefined) Sessions = {}

declare var ActiveSessions: number
if (ActiveSessions === undefined) ActiveSessions = 0

type JunctionRecord = {
  pageViews: number
  visitors: number
  web3Visitors: number
  singleViewVisitors: number
  sumLoadingTime: number
}

type PageUrl = string
type Timestamp = string
export type RecordsType = Record<Timestamp, Record<PageUrl, JunctionRecord>>
declare var Records: RecordsType
if (Records === undefined) Records = {}

type JunctionEvent = {
  ad: string // Arweave wallet address
  ts: number // Timestamp
  ev: string // Event name
  url: string // Page URL
  "j-lt": number // Loading time
  eth: string // Ethereum wallet name
  sol: string // Solana wallet name
  ar: string // Arweave wallet name
}

// -------------------- Handler Functions --------------------

export const calculate = Utils.createHandler({
  handler: (message) => {
    if (message.From !== DispatcherId) return { Error: "Unauthorized." }

    const event = parseEvent(message)

    if (event.ev !== "pv") return

    const session = loadSession(event)
    const record = loadRecord(event.ts, event.url)

    record.pageViews++

    record.sumLoadingTime += event["j-lt"]

    if (!session.pages[event.url]) {
      session.pages[event.url] = true
      record.visitors++

      if (
        event.eth !== undefined ||
        event.sol !== undefined ||
        event.ar !== undefined
      )
        record.web3Visitors++
    }

    if (session.firstPageTimestamp === 0) {
      session.firstPageTimestamp = event.ts
      session.firstPage = event.url
      record.singleViewVisitors++
    } else {
      const hourlyFirstViewTimestamp = getHourlyTimestamp(
        session.firstPageTimestamp
      )
      const recordWithFirstPageView =
        Records[hourlyFirstViewTimestamp]?.[session.firstPage]
      // record could be deleted if it's too old
      if (recordWithFirstPageView !== undefined)
        recordWithFirstPageView.singleViewVisitors--
    }

    clearOldSessions()
    clearOldRecords()

    ProcessedEventCount++
  },
})

// -------------------- Utility Functions --------------------

const getHourlyTimestamp = (timestamp: number): number =>
  Math.floor(timestamp / 3600000) * 3600000

const parseEvent = (message: ao.message.Received): JunctionEvent => ({
  ad: message.Tags.ad,
  ts: parseInt(message.Tags.ts),
  ev: message.Tags.ev,
  url: message.Tags.url,
  "j-lt": parseInt(message.Tags["j-lt"]),
  eth: message.Tags.eth,
  sol: message.Tags.sol,
  ar: message.Tags.ar,
})

const loadSession = (event: JunctionEvent): JunctionSession => {
  let session = Sessions[event.ad]
  if (!session) {
    session = {
      id: event.ad,
      startedAt: event.ts,
      pages: {},
      firstPage: "",
      firstPageTimestamp: 0,
    }
    Sessions[event.ad] = session
    ActiveSessions++
  }

  return session
}

const THIRTY_MINUTES_IN_MS = 30 * 60 * 1000
const clearOldSessions = () => {
  const currentTimestamp = os.time()
  const oldestTimestamp = currentTimestamp - THIRTY_MINUTES_IN_MS
  for (let [sessionId, session] of Object.entries(Sessions)) {
    if (session.startedAt < oldestTimestamp) {
      delete Sessions[sessionId]
      ActiveSessions--
    }
  }
}

const loadRecord = (timestamp: number, url: string): JunctionRecord => {
  const hourlyTimestamp = getHourlyTimestamp(timestamp)
  const hourlyTimestampKey = "" + hourlyTimestamp

  let recordsOfOneHour = Records[hourlyTimestampKey]
  if (!recordsOfOneHour) {
    recordsOfOneHour = {}
    Records[hourlyTimestampKey] = recordsOfOneHour
  }

  let record = recordsOfOneHour[url]
  if (!record) {
    record = {
      pageViews: 0,
      visitors: 0,
      web3Visitors: 0,
      singleViewVisitors: 0,
      sumLoadingTime: 0,
    }
    recordsOfOneHour[url] = record
    ActiveRecords++
  }

  return record
}

// -------------------- Memory Management --------------------

import * as utils from ".utils"

let memoryLimit = ao.env.Process.Tags["Memory-Limit"]
if (memoryLimit === undefined) memoryLimit = "1-gb"

const [memoryAmount, memoryUnit] = memoryLimit.split("-")
let MEMORY_LIMIT_IN_KB = parseInt(memoryAmount)
if (memoryUnit === "mb") MEMORY_LIMIT_IN_KB *= 1024
else if (memoryUnit === "gb") MEMORY_LIMIT_IN_KB *= 1024 * 1024

MEMORY_LIMIT_IN_KB *= 0.9 // 90% of the limit

const clearOldRecords = () => {
  if (collectgarbage("count") < MEMORY_LIMIT_IN_KB) return

  const timestamps = Object.keys(Records)

  // sort timestamps in ascending order
  timestamps.sort((a, b) => parseInt(a) - parseInt(b))

  // get the oldest timestamp
  const oldestTimestamp = timestamps[0]
  const deletedRecordCount = Object.values(Records[oldestTimestamp]).length
  delete Records[oldestTimestamp]
  ActiveRecords -= deletedRecordCount
}
