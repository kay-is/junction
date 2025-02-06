import * as HandlerTypes from '$lib/backend.types'
import * as AoClient from '$lib/clients/ao'
import * as CodeRegistryClient from '$lib/clients/codeRegistry'
import { appState } from '$lib/state/app.svelte'

export const getInfo = async (id: string) =>
  AoClient.request<HandlerTypes.DispatcherInfoResponse>({
    dryrun: true,
    processId: id,
    tags: { Action: 'Info' }
  })

export const create = async () => {
  const codeRegistryInfo = await CodeRegistryClient.getInfo()
  return AoClient.spawn({
    codeTxId: codeRegistryInfo.CodeTxIds['dispatcher'],
    signer: appState.wallet.signer,
    tags: { ProcessType: 'Dispatcher' }
  })
}

export const addReport = async (id: string, reportId: string) =>
  AoClient.request({
    processId: id,
    signer: appState.wallet.signer,
    tags: { Action: 'AddReport', ProcessId: reportId }
  })

export const removeReport = async (id: string, reportId: string) =>
  AoClient.request({
    processId: id,
    signer: appState.wallet.signer,
    tags: { Action: 'RemoveReport', ProcessId: reportId }
  })

export const updateProcess = async (accountId: string, codeTxId: string) =>
  AoClient.update({
    signer: appState.wallet.signer,
    processId: accountId,
    codeTxId
  })
