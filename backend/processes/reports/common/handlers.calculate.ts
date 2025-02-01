import { encode } from "json"
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
  viewedItems: Record<string, boolean>
  firstViewedItem: string
  firstViewTimestamp: number
}

declare var Sessions: Record<string, JunctionSession>
if (Sessions === undefined) Sessions = {}

declare var ActiveSessions: number
if (ActiveSessions === undefined) ActiveSessions = 0

export interface JunctionRecord {
  views: number
  visitors: number
  singleViewVisitors: number
  [additionalMetricKey: string]: number
}

type AggregationKey = string
type Timestamp = string
export type RecordsType = Record<
  Timestamp,
  Record<AggregationKey, JunctionRecord>
>
declare var Records: RecordsType
if (Records === undefined) Records = {}

type JunctionEvent = {
  ad: string // Arweave wallet address
  ts: number // Timestamp
  ev: string // Event name
  url: string // Page URL
  la: string // Language
  co: string // Cookies enabled
  tz: string // Timezone
  ua: string // User agent
  eth: string // Ethereum wallet name
  "eth-con": string // Ethereum wallet connected
  "eth-chain": string // Ethereum chain ID
  sol: string // Solana wallet name
  "sol-con": string // Solana wallet connected
  ar: string // Arweave wallet name
  "ar-ver": string // Arweave wallet version
  "ar-con": string // Arweave wallet connected
  [additionalKey: string]: string | number
}
// -------------------- Handler Functions --------------------

export type CreateCalculateHandlerOptions = {
  eventType: string
  extractAggregationValue: (event: JunctionEvent) => string
  calculateAdditionalMetrics?: (
    record: JunctionRecord,
    event: JunctionEvent,
    session: JunctionSession
  ) => void
}
export const createCalculateHandler = (
  options: CreateCalculateHandlerOptions
) =>
  Utils.createHandler({
    handler: (message) => {
      if (message.From !== DispatcherId) return { Error: "Unauthorized." }

      const event = parseEvent(message)

      if (event.ev !== options.eventType) return

      const session = loadSession(event)

      const aggregationValue = options.extractAggregationValue(event)
      const record = loadRecord(event.ts, aggregationValue)

      record.views++

      if (!session.viewedItems[aggregationValue]) {
        session.viewedItems[aggregationValue] = true
        record.visitors++
      }

      if (session.firstViewTimestamp === 0) {
        session.firstViewTimestamp = event.ts
        session.firstViewedItem = aggregationValue
        record.singleViewVisitors++
      } else {
        const timestampKey = "" + getHourlyTimestamp(session.firstViewTimestamp)
        const recordWithFirstView =
          Records[timestampKey]?.[session.firstViewedItem]

        // record could be deleted if it's too old
        if (recordWithFirstView !== undefined)
          recordWithFirstView.singleViewVisitors = Math.max(
            recordWithFirstView.singleViewVisitors - 1,
            0
          )
      }

      if (options.calculateAdditionalMetrics)
        options.calculateAdditionalMetrics(record, event, session)

      clearOldSessions()
      clearOldRecords()

      ProcessedEventCount++
      return { NoReply: true }
    },
  })

// -------------------- Utility Functions --------------------

const getHourlyTimestamp = (timestamp: number): number =>
  Math.floor(timestamp / 3600000) * 3600000

const parseEvent = (message: ao.message.Received): JunctionEvent => {
  const event: JunctionEvent = {
    ad: message.Tags.ad,
    ts: parseInt(message.Tags.ts),
    ev: message.Tags.ev,
    url: message.Tags.url,
    la: message.Tags.la,
    co: message.Tags.co,
    tz: message.Tags.tz,
    ua: message.Tags.ua,
    eth: message.Tags.eth,
    "eth-con": message.Tags["eth-con"],
    "eth-chain": message.Tags["eth-chain"],
    sol: message.Tags.sol,
    "sol-con": message.Tags["sol-con"],
    ar: message.Tags.ar,
    "ar-ver": message.Tags["ar-ver"],
    "ar-con": message.Tags["ar-con"],
  }

  for (let [key, value] of Object.entries(message.Tags)) {
    if (key in event) continue
    if (key.includes("j-")) event[key] = value
  }

  return event
}

const loadSession = (event: JunctionEvent): JunctionSession => {
  let session = Sessions[event.ad]
  if (!session) {
    session = {
      id: event.ad,
      startedAt: event.ts,
      viewedItems: {},
      firstViewedItem: "",
      firstViewTimestamp: 0,
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

/**
 * The recordDimension is the dimension that we want to aggregate the data by.
 */
const loadRecord = (
  timestamp: number,
  aggregationValue: string
): JunctionRecord => {
  const hourlyTimestamp = getHourlyTimestamp(timestamp)
  const hourlyTimestampKey = "" + hourlyTimestamp

  let recordsOfOneHour = Records[hourlyTimestampKey]
  if (!recordsOfOneHour) {
    recordsOfOneHour = {}
    Records[hourlyTimestampKey] = recordsOfOneHour
  }

  let record = recordsOfOneHour[aggregationValue]
  if (!record) {
    record = {
      views: 0,
      visitors: 0,
      singleViewVisitors: 0,
    }
    recordsOfOneHour[aggregationValue] = record
    ActiveRecords++
  }

  return record
}

// -------------------- Memory Management --------------------

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
