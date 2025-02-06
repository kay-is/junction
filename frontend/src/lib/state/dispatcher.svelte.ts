import * as DispatcherClient from '$lib/clients/dispatcher'

export type Info = Awaited<ReturnType<typeof DispatcherClient.getInfo>>

export class Dispatcher {
  id = $state('')
  name = $state('')
  reportIds: string[] = $state([])
  assignedEventCount = $state(0)
  receivedEventCount = $state(0)
  memoryUsage = $state(0)
  members = $state({})
  membersArray = $derived.by(() => Object.entries(this.members))
  codeTxId = $state('')
  loading = $state(false)

  constructor(id: string) {
    this.id = id
    const infoString = localStorage.getItem('dispatcher-' + id)
    if (infoString) this.#setFields(JSON.parse(infoString))
  }

  #setFields = (fields: Info) => {
    this.id = fields.Id
    this.name = fields.Name
    this.reportIds = fields.ReportIds
    this.receivedEventCount = fields.ReceivedEventCount
    this.assignedEventCount = fields.AssignedEventCount
    this.memoryUsage = fields.MemoryUsage
    this.members = fields.Members
    this.codeTxId = fields.CodeTxId || 'N/A'
  }

  load = async () => {
    this.loading = true
    const info = await DispatcherClient.getInfo(this.id)
    this.#setFields(info)
    this.loading = false
    this.#cacheDispatcher()
  }

  #cacheDispatcher = () => {
    localStorage.setItem(
      'dispatcher-' + this.id,
      JSON.stringify({
        Id: this.id,
        Name: this.name,
        ReportIds: this.reportIds,
        AssignedEventCount: this.assignedEventCount,
        MemoryUsage: this.memoryUsage,
        Members: this.members,
        CodeTxId: this.codeTxId
      })
    )
  }

  addReport = async (reportId: string) => {
    this.loading = true
    await DispatcherClient.addReport(this.id, reportId)
    this.reportIds.push(reportId)
    this.loading = false
    this.#cacheDispatcher()
  }

  removeReport = async (reportId: string) => {
    this.loading = true
    await DispatcherClient.removeReport(this.id, reportId)
    this.reportIds = this.reportIds.filter((id) => id !== reportId)
    this.loading = false
    this.#cacheDispatcher()
  }

  updateProcess = async (codeTxId: string) => {
    this.loading = true
    await DispatcherClient.updateProcess(this.id, codeTxId)
    this.codeTxId = codeTxId
    this.loading = false
    this.#cacheDispatcher()
  }
}
