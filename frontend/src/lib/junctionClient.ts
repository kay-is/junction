import AppState from './appState.svelte'
import * as AoClient from './aoClient'
import * as Constants from './constants'

export const getInfo = async () =>
  AoClient.request({
    dryrun: true,
    processId: Constants.REGISTRY_PROCESS_ID,
    tags: { Action: 'Info' }
  })

export const registerAccount = async (name: string) =>
  AoClient.request({
    signer: AppState.wallet.signer,
    processId: Constants.REGISTRY_PROCESS_ID,
    tags: { Action: 'Register-Account', Name: name }
  })

export const getAccounts = async () =>
  AoClient.request({
    dryrun: true,
    processId: Constants.REGISTRY_PROCESS_ID,
    tags: { Action: 'Get-Accounts', Address: AppState.wallet.address }
  })
