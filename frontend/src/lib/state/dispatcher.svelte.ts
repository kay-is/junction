import * as DispatcherClient from '../clients/dispatcher'

export type Info = Awaited<ReturnType<typeof DispatcherClient.getInfo>>

export class Dispatcher {
  id = $state('')
  name = $state('')
  reportIds: string[] = $state([])
  assignedEventCount = $state(0)
  memoryUsage = $state(0)
  members = $state({})
  membersArray = $derived.by(() => Object.entries(this.members))
  loading = $state(false)

  constructor(id: string) {
    this.id = id
    const infoString = localStorage.getItem('dispatcherInfo-' + id)
    if (infoString) this.#setFields(JSON.parse(infoString))
  }

  #setFields = (fields: Info) => {
    this.id = fields.Id
    this.name = fields.Name
    this.reportIds = fields.ReportIds
    this.assignedEventCount = fields.AssignedEventCount
    this.memoryUsage = fields.MemoryUsage
    this.members = fields.Members
  }

  load = async () => {
    this.loading = true
    const info = await DispatcherClient.getInfo(this.id)
    this.#setFields(info)
    this.loading = false
    localStorage.setItem('dispatcherInfo', JSON.stringify(info))
  }
}
