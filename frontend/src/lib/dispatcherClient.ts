import AppState from './appState.svelte'
import * as AoClient from './aoClient'
import * as CodeRegistryClient from './codeRegistryClient'
import * as HandlerTypes from './handlerTypes'

export const getInfo = async (id: string) =>
  AoClient.request<HandlerTypes.DispatcherInfoResponse>({
    dryrun: true,
    processId: id,
    tags: { Action: 'Info' }
  })

export const create = async () => {
  const codeRegistryInfo = await CodeRegistryClient.getInfo()
  return AoClient.spawn({
    codeTxId: codeRegistryInfo.Environment['dispatcherCodeId'],
    signer: AppState.wallet.signer
  })
}
