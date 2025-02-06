import type * as HandlerTypes from '$lib/backend.types'
import * as AoClient from '$lib/clients/ao'
import * as DeploymentOutput from '$lib/deployment.output'
import { appState } from '$lib/state/app.svelte'

export const getInfo = async (): Promise<HandlerTypes.RegistryInfoResponse> =>
  AoClient.request({
    dryrun: true,
    processId: DeploymentOutput.REGISTRY_PROCESS_ID,
    tags: { Action: 'Info' }
  })

export const createAccount = async (
  Name: string,
  ProcessId: string
): Promise<HandlerTypes.CreateAccountResponse> =>
  AoClient.request({
    signer: appState.wallet.signer,
    processId: DeploymentOutput.REGISTRY_PROCESS_ID,
    tags: { Action: 'CreateAccount', Name, ProcessId }
  })

export const getAccounts = async (): Promise<HandlerTypes.AccountListResponse> =>
  AoClient.request({
    dryrun: true,
    processId: DeploymentOutput.REGISTRY_PROCESS_ID,
    tags: { Action: 'GetAccountList', Address: appState.wallet.address }
  })
