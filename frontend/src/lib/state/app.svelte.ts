import * as Svelte from 'svelte'
import { Account } from './account.svelte'
import { DateRange } from './daterange.svelte'
import { Registry } from './registry.svelte'
import { Wallet } from './wallet.svelte'

export type AppState = {
  date: DateRange
  wallet: Wallet
  registry: Registry
  account: Account
}

export let appState: AppState

export const init = () => {
  appState = {
    date: new DateRange(),
    wallet: new Wallet(),
    registry: new Registry(),
    account: new Account()
  }
  return appState
}

const contextKey = Symbol('appState')

export const setContext = (state: AppState) => Svelte.setContext(contextKey, state)

export const getContext = (): AppState => Svelte.getContext(contextKey)
