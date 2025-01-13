import * as Svelte from 'svelte'
import { Account } from './account.svelte'
import { Registry } from './registry.svelte'
import { Settings } from './settings.svelte'
import { Wallet } from './wallet.svelte'

export let appState: AppState
export const init = () => {
  appState = {
    settings: new Settings(),
    wallet: new Wallet(),
    registry: new Registry(),
    account: new Account()
  }
  return appState
}

export type AppState = {
  settings: Settings
  wallet: Wallet
  registry: Registry
  account: Account
}

const contextKey = Symbol('appState')

export const setContext = (state: AppState) => Svelte.setContext(contextKey, state)

export const getContext = (): AppState => Svelte.getContext(contextKey)
