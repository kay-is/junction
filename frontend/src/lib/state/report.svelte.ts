import * as ReportClient from '../clients/report'

export type Records = Awaited<ReturnType<typeof ReportClient.getRecords>>
export type Info = Awaited<ReturnType<typeof ReportClient.getInfo>>

export class Report {
  id = $state('')
  name = $state('')
  owner = $state('')
  members: Record<string, string> = $state({})
  loaded = $state(false)
  processedEventCount = $state(0)
  activeSessions = $state(0)
  activeRecords = $state(0)
  dispatcherId = $state('')
  memoryUsage = $state(0)
  loading = $state(false)

  currentRecords: Records = $state({})
  currentRecordsArray = $derived.by(() =>
    Object.entries(this.currentRecords).map(([timestamp, records]) => ({
      timestamp: +timestamp,
      records
    }))
  )

  referenceRecords: Records = $state({})
  referenceRecordsArray = $derived.by(() =>
    Object.entries(this.referenceRecords).map(([timestamp, records]) => ({
      timestamp: +timestamp,
      records
    }))
  )

  constructor(id: string, name: string) {
    this.id = id
    this.name = name

    const info = localStorage.getItem('report-' + id)
    if (info) this.#setFields(JSON.parse(info))

    const currentRecords = localStorage.getItem('report-records-current-' + id)
    if (currentRecords) this.currentRecords = JSON.parse(currentRecords)

    const referenceRecords = localStorage.getItem('report-records-reference-' + id)
    if (referenceRecords) this.referenceRecords = JSON.parse(referenceRecords)
  }

  #cacheReport = () => {
    const info: Info = {
      Id: this.id,
      Name: this.name,
      ProcessedEventCount: this.processedEventCount,
      Owner: this.owner,
      Members: this.members,
      ActiveSessions: this.activeSessions,
      DispatcherId: this.dispatcherId,
      MemoryUsage: this.memoryUsage,
      ActiveRecords: this.activeRecords
    }
    localStorage.setItem('report-' + info.Id, JSON.stringify(info))
  }

  #setFields = (fields: Awaited<ReturnType<typeof ReportClient.getInfo>>) => {
    this.id = fields.Id
    this.name = fields.Name
    this.owner = fields.Owner
    this.members = fields.Members
    this.processedEventCount = fields.ProcessedEventCount
    this.activeSessions = fields.ActiveSessions
    this.dispatcherId = fields.DispatcherId
    this.memoryUsage = fields.MemoryUsage
    this.activeRecords = fields.ActiveRecords
    this.loaded = true
  }

  load = async () => {
    this.loading = true
    const info = await ReportClient.getInfo(this.id)
    this.#setFields(info)
    this.loading = false
    this.#cacheReport()
  }

  loadRecords = async (type: 'current' | 'reference', start: Date, stop: Date) => {
    this.loading = true
    const receivedRecords = await ReportClient.getRecords(this.id, +start, +stop)
    // fill in the gaps
    const recordsMap = new Map(Object.entries(receivedRecords))
    const records: Records = {}
    for (let t = +start; t <= +stop; t += 3600000) {
      const key = t.toString()
      records[key] = recordsMap.get(key) ?? {}
    }

    if (type === 'current') {
      this.currentRecords = records
      localStorage.setItem('report-records-current-' + this.id, JSON.stringify(records))
    } else {
      this.referenceRecords = records
      localStorage.setItem('report-records-reference-' + this.id, JSON.stringify(records))
    }
    this.loading = false
  }
}
