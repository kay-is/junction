import { appState } from '../state/app.svelte'
import * as AoClient from './ao'
import * as CodeRegistryClient from './codeRegistry'
import * as HandlerTypes from './handlers'

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
