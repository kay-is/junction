import { Othent, type AppInfo } from '@othent/kms'
import * as RegistryClient from './registryClient'
import * as AccountClient from './accountClient'
import * as DispatcherClient from './dispatcherClient'
import * as ReportClient from './reportClient'
import type * as HandlerTypes from './handlerTypes'

const appInfo: AppInfo = {
  name: 'Junction',
  version: '0.1.0',
  env: 'development'
}

class Wallet {
  readonly audience = !window.arweaveWallet ? 'web2' : 'web3'
  connected = $state(localStorage.getItem('walletConnected') === 'true')

  address = $state(localStorage.getItem('walletAddress') ?? '')
  #wallet: Othent | typeof window.arweaveWallet

  loading = $state(false)

  constructor() {
    this.#wallet = this.audience === 'web3' ? window.arweaveWallet : new Othent({ appInfo })
  }

  connect = async () => {
    this.loading = true
    if (this.#wallet instanceof Othent) {
      await this.#wallet.connect()
      // required to populate the public key of the wallet
      await this.#wallet.getActivePublicKey()
    } else {
      await this.#wallet.connect([
        'ACCESS_ADDRESS',
        'SIGN_TRANSACTION',
        'ACCESS_PUBLIC_KEY',
        'SIGNATURE'
      ])
    }
    this.address = await this.#wallet.getActiveAddress()
    this.connected = true
    this.loading = false

    localStorage.setItem('walletConnected', 'true')
    localStorage.setItem('walletAddress', this.address)
  }

  disconnect = async () => {
    this.loading = true
    await this.#wallet.disconnect()
    this.connected = false
    this.address = ''
    this.loading = false

    localStorage.removeItem('walletConnected')
    localStorage.removeItem('walletAddress')
  }

  get signer() {
    return this.#wallet as typeof window.arweaveWallet
  }
}

class Accounts {
  list: HandlerTypes.AccountListResponse = $state([])
  loading = $state(false)

  constructor() {
    const accounts = localStorage.getItem('accounts')
    if (accounts) this.list = JSON.parse(accounts)
  }

  load = async () => {
    this.loading = true
    this.list = await RegistryClient.getAccounts()
    this.loading = false
    localStorage.setItem('accounts', JSON.stringify(this.list))
  }

  register = async (Name: string, Description: string) => {
    this.loading = true
    const dispatcherId = await DispatcherClient.create()
    const accountId = await AccountClient.create({
      Name,
      Description,
      DispatcherId: dispatcherId
    })
    const account = await RegistryClient.createAccount(Name, accountId)
    this.list.push(account)
    localStorage.setItem('accounts', JSON.stringify(this.list))
    this.loading = false
  }
}

class Account {
  id = $state('')
  name = $state('')
  description = $state('')
  dispatcherId = $state('')
  members: Record<string, string> = $state({})
  reportInfos: HandlerTypes.AccountInfoResponse['Reports'] = $state([])
  reports: Record<string, Report> = $state({})

  loading = $state(false)

  constructor() {
    const info = localStorage.getItem('accountInfo')
    if (info) {
      const parsed = JSON.parse(info)
      this.#setFields(parsed.id, parsed)
    }
  }

  #setFields = (accountId: string, fields: Partial<HandlerTypes.AccountInfoResponse>) => {
    this.id = accountId
    this.name = fields.Name ?? this.name
    this.description = fields.Description ?? this.description
    this.dispatcherId = fields.DispatcherId ?? this.dispatcherId
    this.members = fields.Members ?? this.members
    this.reportInfos = fields.Reports ?? this.reportInfos
    this.reports = Object.entries(this.reportInfos).reduce(
      (reports, [name, info]) => {
        reports[name] = new Report(info.processId)
        return reports
      },
      {} as Record<string, Report>
    )

    localStorage.setItem(
      'accountInfo',
      JSON.stringify({
        id: accountId,
        Name: this.name,
        Description: this.description,
        DispatcherId: this.dispatcherId,
        Members: this.members,
        Reports: this.reportInfos
      })
    )
  }

  load = async (accountId: string) => {
    this.loading = true

    const info = await AccountClient.getInfo(accountId)

    this.#setFields(accountId, info)

    this.loading = false
  }

  save = async () => {
    this.loading = true

    const updatedInfo = await AccountClient.updateInfo(this.id, {
      Name: this.name,
      Description: this.description,
      Members: this.members
    })

    this.#setFields(this.id, updatedInfo)

    this.loading = false
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

export type JunctionRecord = Record<
  string,
  {
    pageViews: number
    visitors: number
    web3Visitors: number
    avgLoadingTime: number
    sumLoadingTime: number
    singleViewVisitors: number
  }
>

class Report {
  id = $state('')
  name = $state('')
  processedEvents = $state(0)
  activeSessions = $state(0)
  dispatcherId = $state('')
  recordsMaxAge = $state(0)
  memoryUsed = $state(0)
  records: Record<string, JunctionRecord> = $state({})
  loading = false

  constructor(id: string) {
    this.id = id
    const info = localStorage.getItem('reportInfo-' + id)
    if (info) this.#setFields(JSON.parse(info))

    const records = localStorage.getItem('reportRecords-' + id)
    if (records) this.records = JSON.parse(records)
  }

  #setFields = (fields: Partial<ReportClient.JunctionReportInfo>) => {
    this.name = fields.Name ?? this.name
    this.processedEvents = fields.ProcessedEvents ?? this.processedEvents
    this.activeSessions = fields.ActiveSessions ?? this.activeSessions
    this.dispatcherId = fields.DispatcherId ?? this.dispatcherId
    this.recordsMaxAge = fields.RecordsMaxAge ?? this.recordsMaxAge
    this.memoryUsed = fields.MemoryUsed ?? this.memoryUsed

    localStorage.setItem(
      'reportInfo-' + this.id,
      JSON.stringify({
        Name: this.name,
        ProcessedEvents: this.processedEvents,
        ActiveSessions: this.activeSessions,
        DispatcherId: this.dispatcherId,
        RecordsMaxAge: this.recordsMaxAge,
        MemoryUsed: this.memoryUsed
      })
    )
  }

  load = async () => {
    this.loading = true

    const info = await ReportClient.getInfo(this.id)

    this.#setFields(info)

    this.loading = false
  }

  loadRecords = async (start: Date, stop: Date) => {
    this.loading = true

    const receivedRecords = await ReportClient.getRecords(this.id, +start, +stop)

    // fill in the gaps
    const recordsMap = new Map(Object.entries(receivedRecords))
    const records: Record<string, JunctionRecord> = {}
    for (let t = +start; t <= +stop; t += 3600000) {
      const key = t.toString()
      records[key] = recordsMap.get(key) ?? {}
    }

    this.records = records

    localStorage.setItem('reportRecords-' + this.id, JSON.stringify(this.records))

    this.loading = false
  }
}

export type ReportError = {
  timestamp: number
  message: string
  processId: string
}

class Dispatcher {
  name = $state('')
  reportIds: string[] = $state([])
  assignedEventCount = $state(0)
  memoryUsage = $state(0)

  constructor() {
    const info = localStorage.getItem('dispatcherInfo')
    if (info) {
      const parsed = JSON.parse(info)
      this.name = parsed.Name
      this.reportIds = parsed.ReportsIds
      this.assignedEventCount = parsed.AssignedEventCount
      this.memoryUsage = parsed.MemoryUsed
    }
  }

  load = async (dispatcherId: string) => {
    const info = await DispatcherClient.getInfo(dispatcherId)

    this.name = info.Name
    this.reportIds = info.ReportIds
    this.assignedEventCount = info.AssignedEventCount
    this.memoryUsage = info.MemoryUsage

    localStorage.setItem('dispatcherInfo', JSON.stringify(info))
  }
}

export default {
  wallet: new Wallet(),
  accounts: new Accounts(),
  account: new Account(),
  dispatcher: new Dispatcher()
}
