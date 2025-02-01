import { appState } from '../state/app.svelte'
import * as AoClient from './ao'
import * as CodeRegistryClient from './codeRegistry'
import type * as HandlerTypes from './handlers'

export const create = async (name: string) => {
  const codeRegistryInfo = await CodeRegistryClient.getInfo()
  return AoClient.spawn({
    codeTxId: codeRegistryInfo.CodeTxIds[name],
    signer: appState.wallet.signer,
    tags: {
      ProcessType: 'Report',
      DispatcherId: appState.account.dispatcher.id
    }
  })
}

export const getInfo = async (reportId: string): Promise<HandlerTypes.ReportInfoResponse> =>
  AoClient.request({
    dryrun: true,
    processId: reportId,
    tags: { Action: 'Info' }
  })

export const getRecords = async (reportId: string, start: number, stop: number) => {
  let records = await AoClient.request<HandlerTypes.GetRecordsResponse>({
    dryrun: true,
    processId: reportId,
    tags: { Action: 'GetRecords', Start: '' + start, Stop: '' + stop }
  })

  // Lua json.encode returns an array for empty tables
  if (Array.isArray(records)) records = {}

  return records
}
