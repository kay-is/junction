import * as AoClient from './ao'
import type * as HandlerTypes from './handlers'

export const getInfo = async (reportId: string): Promise<HandlerTypes.ReportInfoResponse> =>
  AoClient.request({
    dryrun: true,
    processId: reportId,
    tags: { Action: 'Info' }
  })

export const getRecords = async (
  reportId: string,
  start: number,
  stop: number
): Promise<HandlerTypes.GetRecordsResponse> =>
  AoClient.request({
    dryrun: true,
    processId: reportId,
    tags: { Action: 'GetRecords', Start: '' + start, Stop: '' + stop }
  })
