import { page } from '$app/state'
import * as AccountClient from '../clients/account'
import { Report } from './report.svelte'
import { Dispatcher } from './dispatcher.svelte'

export type Info = Awaited<ReturnType<typeof AccountClient.getInfo>>

export class Account {
  id = $state('')
  name = $state('')
  description = $state('')
  dispatcher: Dispatcher = $state(new Dispatcher(''))
  registryId = $state('')
  members: Record<string, string> = $state({})
  membersArray = $derived.by(() => Object.entries(this.members))
  reports: Record<string, Report> = $state({})
  reportsArray = $derived.by(() => Object.values(this.reports))
  reportViews: Record<string, { name: string; reportId: string }> = $state({})
  reportViewsArray = $derived.by(() => Object.values(this.reportViews))
  memoryUsage = $state(0)
  loading = $state(false)

  constructor() {
    const infoString = localStorage.getItem('accountInfo')
    if (infoString) {
      const account = JSON.parse(infoString)
      this.#setFields(account)
    }
    $effect(() => {
      if (page.params.accountId) this.load()
    })
  }

  #cacheAccount = () => {
    const info: Info = {
      Id: this.id,
      Name: this.name,
      Description: this.description,
      DispatcherId: this.dispatcher.id,
      RegistryId: this.registryId,
      Reports: Object.values(this.reports).map((r) => ({ processId: r.id, name: r.name })),
      ReportViews: Object.values(this.reportViews),
      Members: this.members,
      MemoryUsage: this.memoryUsage
    }
    localStorage.setItem('accountInfo', JSON.stringify(info))
  }

  #setFields = (fields: Info) => {
    this.id = fields.Id
    this.name = fields.Name
    this.description = fields.Description
    this.registryId = fields.RegistryId
    this.members = fields.Members
    this.memoryUsage = fields.MemoryUsage

    this.dispatcher = new Dispatcher(fields.DispatcherId)

    for (const report of fields.Reports)
      this.reports[report.name] = new Report(report.processId, report.name)
  }

  load = async () => {
    this.loading = true
    const info = await AccountClient.getInfo(page.params.accountId)
    this.#setFields(info)
    await this.dispatcher.load()
    this.loading = false
    this.#cacheAccount()
  }

  save = async () => {
    this.loading = true
    const updatedInfo = await AccountClient.updateInfo(this.id, {
      Name: this.name,
      Description: this.description,
      Members: this.members
    })
    this.#setFields(updatedInfo)
    this.loading = false
    this.#cacheAccount()
  }

  addReport = async (name: string, codeTxId: string) => {
    this.loading = true
    await AccountClient.addReport(this.id, {
      CodeTxId: codeTxId,
      Name: name,
      RecordsMaxAge: '7776000000' // 90 days in ms
    })
    this.loading = false
  }
}
