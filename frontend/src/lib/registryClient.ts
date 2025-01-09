import AppState from './appState.svelte'
import * as AoClient from './aoClient'
import * as Constants from './constants'
import * as HandlerTypes from './handlerTypes'

export const getInfo = async () =>
  AoClient.request<HandlerTypes.RegistryInfoResponse>({
    dryrun: true,
    processId: Constants.REGISTRY_PROCESS_ID,
    tags: { Action: 'Info' }
  })

export const createAccount = async (Name: string, ProcessId: string) =>
  AoClient.request<HandlerTypes.CreateAccountResponse>({
    signer: AppState.wallet.signer,
    processId: Constants.REGISTRY_PROCESS_ID,
    tags: { Action: 'CreateAccount', Name, ProcessId }
  })

export const getAccounts = async () =>
  AoClient.request<HandlerTypes.AccountListResponse>({
    dryrun: true,
    processId: Constants.REGISTRY_PROCESS_ID,
    tags: { Action: 'GetAccountList', Address: AppState.wallet.address }
  })
