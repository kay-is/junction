import { Account } from './account.svelte'
import { Registry } from './registry.svelte'
import { Settings } from './settings.svelte'
import { Wallet } from './wallet.svelte'

export default {
  settings: new Settings(),
  wallet: new Wallet(),
  registry: new Registry(),
  account: new Account()
}
