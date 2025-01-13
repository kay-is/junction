import { appState } from '../state/app.svelte'
import * as AoClient from './ao'
import * as Constants from './constants'
import * as HandlerTypes from './handlers'

export const getInfo = async (): Promise<HandlerTypes.RegistryInfoResponse> =>
  AoClient.request({
    dryrun: true,
    processId: Constants.REGISTRY_PROCESS_ID,
    tags: { Action: 'Info' }
  })

export const createAccount = async (
  Name: string,
  ProcessId: string
): Promise<HandlerTypes.CreateAccountResponse> =>
  AoClient.request({
    signer: appState.wallet.signer,
    processId: Constants.REGISTRY_PROCESS_ID,
    tags: { Action: 'CreateAccount', Name, ProcessId }
  })

export const getAccounts = async (): Promise<HandlerTypes.AccountListResponse> =>
  AoClient.request({
    dryrun: true,
    processId: Constants.REGISTRY_PROCESS_ID,
    tags: { Action: 'GetAccountList', Address: appState.wallet.address }
  })
