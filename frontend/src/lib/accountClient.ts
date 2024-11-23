import AppState from './appState.svelte'
import * as AoClient from './aoClient'

export const getInfo = async (accountId: string): Promise<JunctionAccountInfo> =>
  AoClient.request({
    dryrun: true,
    processId: accountId,
    tags: { Action: 'Info' }
  })

export type JunctionReport = {
  name: string
  processId: string
  status: 'ready' | 'pending'
}

export type JunctionAccountInfo = {
  Name: string
  Description: string
  Members: Record<string, string>
  DispatcherId: string
  Reports: Record<string, JunctionReport>
  MemoryUsage: number
}

export const updateInfo = async (
  accountId: string,
  newInfo: Partial<JunctionAccountInfo>
): Promise<JunctionAccountInfo> =>
  AoClient.request({
    signer: AppState.wallet.signer,
    processId: accountId,
    tags: { Action: 'Update-Info' },
    data: newInfo
  })

export type JunctionReportDefinition = {
  CodeTxId: string
  Name: string
  RecordsMaxAge: string
}

export const addReport = async (accountId: string, report: JunctionReportDefinition) =>
  AoClient.request({
    signer: AppState.wallet.signer,
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
    signer: AppState.wallet.signer,
    processId: accountId,
    tags: { Action: 'Remove-Report', Name: reportName }
  })
