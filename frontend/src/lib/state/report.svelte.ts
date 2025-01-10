import * as ReportClient from '../clients/report'

export type Records = Awaited<ReturnType<typeof ReportClient.getRecords>>
export type Info = Awaited<ReturnType<typeof ReportClient.getInfo>>

export class Report {
  id = $state('')
  name = $state('')
  loaded = $state(false)
  processedEvents = $state(0)
  activeSessions = $state(0)
  dispatcherId = $state('')
  recordsMaxAge = $state(0)
  memoryUsage = $state(0)
  records: Records = $state({})
  activeRecords = $state(0)
  loading = false

  constructor(id: string, name: string) {
    this.id = id
    this.name = name

    const info = localStorage.getItem('reportInfo-' + id)
    if (info) this.#setFields(JSON.parse(info))

    const records = localStorage.getItem('reportRecords-' + id)
    if (records) this.records = JSON.parse(records)
  }

  #cacheReport = () => {
    const info: Info = {
      Id: this.id,
      Name: this.name,
      ProcessedEvents: this.processedEvents,
      ActiveSessions: this.activeSessions,
      DispatcherId: this.dispatcherId,
      RecordsMaxAge: this.recordsMaxAge,
      MemoryUsage: this.memoryUsage,
      ActiveRecords: this.activeRecords
    }
    localStorage.setItem('reportInfo-' + info.Id, JSON.stringify(info))
  }

  #setFields = (fields: Awaited<ReturnType<typeof ReportClient.getInfo>>) => {
    this.id = fields.Id
    this.name = fields.Name
    this.processedEvents = fields.ProcessedEvents
    this.activeSessions = fields.ActiveSessions
    this.dispatcherId = fields.DispatcherId
    this.recordsMaxAge = fields.RecordsMaxAge
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

  loadRecords = async (start: Date, stop: Date) => {
    this.loading = true
    const receivedRecords = await ReportClient.getRecords(this.id, +start, +stop)
    // fill in the gaps
    const recordsMap = new Map(Object.entries(receivedRecords))
    const records: Records = {}
    for (let t = +start; t <= +stop; t += 3600000) {
      const key = t.toString()
      records[key] = recordsMap.get(key) ?? {}
    }
    this.records = records
    localStorage.setItem('reportRecords-' + this.id, JSON.stringify(this.records))
    this.loading = false
  }
}
