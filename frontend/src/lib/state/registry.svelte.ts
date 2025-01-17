import * as RegistryClient from '../clients/registry'
import * as DispatcherClient from '../clients/dispatcher'
import * as AccountClient from '../clients/account'
import * as Constants from '$lib/clients/constants'

export type Accounts = Awaited<ReturnType<typeof RegistryClient.getAccounts>>

export class Registry {
  accounts: Accounts = $state([])
  loading = $state(false)

  constructor() {
    const accounts = localStorage.getItem('accounts')
    if (accounts) this.accounts = JSON.parse(accounts)
  }

  #cacheAccounts = () => {
    localStorage.setItem('accounts', JSON.stringify(this.accounts))
  }

  load = async () => {
    this.loading = true
    this.accounts = await RegistryClient.getAccounts()
    this.loading = false
    this.#cacheAccounts()
  }

  register = async (Name: string, Description: string) => {
    this.loading = true
    const dispatcherId = await DispatcherClient.create()
    console.log('Dispatcher created:', dispatcherId)
    const accountId = await AccountClient.create({
      Name,
      Description,
      DispatcherId: dispatcherId,
      RegistryId: Constants.REGISTRY_PROCESS_ID
    })
    console.log('Account created:', accountId)
    const newAccount = await RegistryClient.createAccount(Name, accountId)
    this.accounts.push(newAccount)
    console.log('Account registered!')
    this.loading = false
    this.#cacheAccounts()
  }
}
