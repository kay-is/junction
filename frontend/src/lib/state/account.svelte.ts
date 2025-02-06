import { page } from '$app/state'
import type * as BackendTypes from '$lib/backend.types'
import * as AccountClient from '$lib/clients/account'
import * as ReportClient from '$lib/clients/report'
import * as ReportState from '$lib/state/report.svelte'
import * as DispatcherState from '$lib/state/dispatcher.svelte'

export type Info = Awaited<ReturnType<typeof AccountClient.getInfo>>

export type AccountReports = {
  [key in BackendTypes.AvailableReports]?: ReportState.Report
}

export class Account {
  id = $state('')
  name = $state('')
  description = $state('')
  owner = $state('')
  dispatcher = $state(new DispatcherState.Dispatcher(''))
  registryId = $state('')
  members: Record<string, string> = $state({})
  membersArray = $derived.by(() => Object.entries(this.members))
  reports: AccountReports = $state({})
  reportsArray = $derived.by(() => Object.values(this.reports))
  memoryUsage = $state(0)
  codeTxId = $state('')
  loading = $state(false)

  constructor() {
    const infoString = localStorage.getItem(`account`)
    if (infoString) {
      const account = JSON.parse(infoString)
      this.#setFields(account)
    }
  }

  #cacheAccount = () => {
    const info: Info = {
      Id: this.id,
      Name: this.name,
      Description: this.description,
      Owner: this.owner,
      DispatcherId: this.dispatcher.id,
      RegistryId: this.registryId,
      Reports: Object.values(this.reports).map((r) => ({
        processId: r.id,
        name: r.name as BackendTypes.AvailableReports
      })),
      ReportViews: [],
      Members: this.members,
      CodeTxId: this.codeTxId,
      MemoryUsage: this.memoryUsage
    }
    localStorage.setItem(`account`, JSON.stringify(info))
  }

  #setFields = (fields: Info) => {
    this.id = fields.Id
    this.name = fields.Name
    this.owner = fields.Owner
    this.description = fields.Description
    this.registryId = fields.RegistryId
    this.members = fields.Members
    this.memoryUsage = fields.MemoryUsage
    this.codeTxId = fields.CodeTxId || 'N/A'

    this.dispatcher = new DispatcherState.Dispatcher(fields.DispatcherId)

    for (const report of fields.Reports)
      this.reports[report.name] = new ReportState.Report(report.processId, report.name)
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

  addReport = async (name: BackendTypes.AvailableReports) => {
    this.loading = true
    const reportId = await ReportClient.create(name)
    this.reports[name] = new ReportState.Report(reportId, name)
    await AccountClient.addReport(this.id, name, reportId)
    await this.dispatcher.addReport(reportId)
    this.loading = false
    this.#cacheAccount()
  }

  removeReport = async (name: BackendTypes.AvailableReports) => {
    if (!this.reports[name]) return
    this.loading = true
    const reportId = this.reports[name].id
    await AccountClient.removeReport(this.id, name)
    await this.dispatcher.removeReport(reportId)
    this.loading = false
    this.#cacheAccount()
  }

  updateProcess = async (codeTxId: string) => {
    this.loading = true
    await AccountClient.updateProcess(this.id, codeTxId)
    this.codeTxId = codeTxId
    this.loading = false
    this.#cacheAccount()
  }
}
