import AppState from './appState.svelte'
import * as AoClient from './aoClient'

const PROCESS_ID = 'O5fFggIu-79HDzBCcOpyTU8te7MQeSsdZNqmL7UNkHc'

export const getInfo = async () =>
  AoClient.request({ dryrun: true, processId: PROCESS_ID, tags: { Action: 'Info' } })

export const registerAccount = async (name: string) =>
  AoClient.request({
    signer: AppState.wallet.signer,
    processId: PROCESS_ID,
    tags: { Action: 'Register-Account', Name: name }
  })

export const getAccounts = async () =>
  AoClient.request({
    dryrun: true,
    processId: PROCESS_ID,
    tags: { Action: 'Get-Accounts', Address: AppState.wallet.address }
  })
