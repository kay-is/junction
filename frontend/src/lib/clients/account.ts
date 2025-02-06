import * as HandlerTypes from '$lib/backend.types'
import * as AoClient from '$lib/clients/ao'
import * as CodeRegistryClient from '$lib/clients/codeRegistry'
import { appState } from '$lib/state/app.svelte'

type AccountConfig = {
  Name: string
  Description: string
  DispatcherId: string
  RegistryId: string
}

export const create = async (accountConfig: AccountConfig) => {
  const codeRegistryInfo = await CodeRegistryClient.getInfo()
  return AoClient.spawn({
    codeTxId: codeRegistryInfo.CodeTxIds['account'],
    signer: appState.wallet.signer,
    tags: { ...accountConfig, ProcessType: 'Account' }
  })
}

export const getInfo = async (accountId: string) =>
  AoClient.request<HandlerTypes.AccountInfoResponse>({
    dryrun: true,
    processId: accountId,
    tags: { Action: 'Info' }
  })

type JunctionReport = {
  name: string
  processId: string
  status: 'ready' | 'pending'
}

type JunctionAccountInfo = {
  Name: string
  Description: string
  Members: Record<string, string>
  DispatcherId: string
  Reports: Record<string, JunctionReport>
  MemoryUsage: number
}

export const updateInfo = async (accountId: string, newInfo: Partial<JunctionAccountInfo>) =>
  AoClient.request<HandlerTypes.AccountUpdateInfoResponse>({
    signer: appState.wallet.signer,
    processId: accountId,
    tags: { Action: 'UpdateInfo' },
    data: newInfo
  })

export type JunctionReportDefinition = {
  CodeTxId: string
  Name: string
  RecordsMaxAge: string
}

export const addReport = async (accountId: string, reportName: string, reportProcessId: string) =>
  AoClient.request<HandlerTypes.AccountAddReportResponse>({
    signer: appState.wallet.signer,
    processId: accountId,
    tags: {
      Action: 'AddReport',
      Name: reportName,
      ProcessId: reportProcessId
    }
  })

export const removeReport = async (accountId: string, reportName: string) =>
  AoClient.request({
    signer: appState.wallet.signer,
    processId: accountId,
    tags: { Action: 'RemoveReport', Name: reportName }
  })

export const updateProcess = async (accountId: string, codeTxId: string) =>
  AoClient.update({
    signer: appState.wallet.signer,
    processId: accountId,
    codeTxId
  })
