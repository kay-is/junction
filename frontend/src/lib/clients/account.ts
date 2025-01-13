import { appState } from '../state/app.svelte'
import * as AoClient from './ao'
import * as CodeRegistryClient from './codeRegistry'
import * as HandlerTypes from './handlers'

type JunctionAccountConfig = {
  Name: string
  Description: string
  DispatcherId: string
}

export const create = async (accountConfig: JunctionAccountConfig) => {
  const codeRegistryInfo = await CodeRegistryClient.getInfo()
  return AoClient.spawn({
    codeTxId: codeRegistryInfo.Environment['accountCodeId'],
    signer: appState.wallet.signer,
    tags: accountConfig
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

export const addReport = async (accountId: string, report: JunctionReportDefinition) =>
  AoClient.request({
    signer: appState.wallet.signer,
    processId: accountId,
    tags: {
      Action: 'Add-Report',
      CodeTxId: report.CodeTxId,
      Name: report.Name,
      RecordsMaxAge: report.RecordsMaxAge
    }
  })

export const removeReport = async (accountId: string, reportName: string) =>
  AoClient.request({
    signer: appState.wallet.signer,
    processId: accountId,
    tags: { Action: 'Remove-Report', Name: reportName }
  })
