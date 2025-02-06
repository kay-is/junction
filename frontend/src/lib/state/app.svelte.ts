import * as Svelte from 'svelte'
import { Account } from '$lib/state/account.svelte'
import { CodeRegistry } from '$lib/state/codeRegistry.svelte'
import { DateRange } from '$lib/state/daterange.svelte'
import { Registry } from '$lib/state/registry.svelte'
import { Wallet } from '$lib/state/wallet.svelte'

export type AppState = {
  date: DateRange
  wallet: Wallet
  registry: Registry
  account: Account
  codeRegistry: CodeRegistry
}

export let appState: AppState

export const init = () => {
  appState = {
    date: new DateRange(),
    wallet: new Wallet(),
    codeRegistry: new CodeRegistry(),
    registry: new Registry(),
    account: new Account()
  }
  return appState
}

const contextKey = Symbol('appState')

export const setContext = (state: AppState) => Svelte.setContext(contextKey, state)

export const getContext = (): AppState => Svelte.getContext(contextKey)
