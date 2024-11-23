import { Othent, type AppInfo } from '@othent/kms'
import * as JunctionClient from './junctionClient'
import * as AccountClient from './accountClient'
import * as DispatcherClient from './dispatcherClient'
import * as ReportClient from './reportClient'

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

type JunctionAccount = {
  name: string
  id: string
  members: string[]
  status: 'ready' | 'pending'
}

class Accounts {
  list: JunctionAccount[] = $state([])
  loading = $state(false)

  constructor() {
    const accounts = localStorage.getItem('accounts')
    if (accounts) this.list = JSON.parse(accounts)
  }

  load = async () => {
    this.loading = true
    this.list = await JunctionClient.getAccounts()
    this.loading = false
    localStorage.setItem('accounts', JSON.stringify(this.list))
  }

  register = async (name: string) => {
    this.loading = true
    const account = await JunctionClient.registerAccount(name)
    this.list.push(account)
    const refreshAccounts = async () => {
      await this.load()
      const a = this.list.find((a) => a.id === account.id)
      if (!a || a.status !== 'ready') return setTimeout(refreshAccounts, 10000)
      this.loading = false
    }
    setTimeout(refreshAccounts, 10000)
    localStorage.setItem('accounts', JSON.stringify(this.list))
  }
}

class Account {
  id = $state('')
  name = $state('')
  description = $state('')
  dispatcherId = $state('')
  members: Record<string, string> = $state({})
  reportInfos: Record<string, AccountClient.JunctionReport> = $state({})
  reports: Record<string, Report> = $state({})

  loading = $state(false)

  constructor() {
    const info = localStorage.getItem('accountInfo')
    if (info) {
      const parsed = JSON.parse(info)
      this.#setFields(parsed.id, parsed)
    }
  }

  #setFields = (accountId: string, fields: Partial<AccountClient.JunctionAccountInfo>) => {
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

    await this.load(this.id)

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

    this.records = await ReportClient.getRecords(this.id, +start, +stop)

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
  accountId = $state('')
  reports: string[] = $state([])
  assignedEventCount = $state(0)
  reportErrors: ReportError[] = $state([])
  memoryUsed = $state(0)

  constructor() {
    const info = localStorage.getItem('dispatcherInfo')
    if (info) {
      const parsed = JSON.parse(info)
      this.name = parsed.Name
      this.accountId = parsed.AccountId
      this.reports = parsed.Reports
      this.assignedEventCount = parsed.AssignedEventCount
      this.reportErrors = parsed.ReportErrors
      this.memoryUsed = parsed.MemoryUsed
    }
  }

  load = async (dispatcherId: string) => {
    const info = await DispatcherClient.getInfo(dispatcherId)

    this.name = info.Name
    this.accountId = info.AccountId
    this.reports = info.Reports
    this.assignedEventCount = info.AssignedEventCount
    this.reportErrors = info.ReportErrors
    this.memoryUsed = info.MemoryUsed

    localStorage.setItem(
      'dispatcherInfo',
      JSON.stringify({
        Name: this.name,
        AccountId: this.accountId,
        Reports: this.reports,
        Assigned: this.assignedEventCount,
        ReportErrors: this.reportErrors,
        MemoryUsed: this.memoryUsed
      })
    )
  }
}

export default {
  wallet: new Wallet(),
  accounts: new Accounts(),
  account: new Account(),
  dispatcher: new Dispatcher()
}
