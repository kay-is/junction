import * as AoClient from './aoClient'
import type { JunctionRecord } from './appState.svelte'

export type JunctionReportInfo = {
  Name: string
  ProcessedEvents: number
  ActiveSessions: number
  DispatcherId: string
  RecordsMaxAge: number
  MemoryUsed: number
}

export const getInfo = async (reportId: string): Promise<JunctionReportInfo> =>
  AoClient.request({
    dryrun: true,
    processId: reportId,
    tags: { Action: 'Info' }
  })

export const getRecords = async (
  reportId: string,
  start: number,
  stop: number
): Promise<Record<string, JunctionRecord>> =>
  AoClient.request({
    dryrun: true,
    processId: reportId,
    tags: { Action: 'Get-Records', Start: '' + start, Stop: '' + stop }
  })
