import * as Utils from "../../common/utilities"

Name = "Junction-Top-Pages-Report"

// Globals defined in handlers.calculate.ts
declare const DispatcherId: string
declare const RecordsMaxAge: number
declare const ProcessedEvents: number
declare const ActiveRecords: number
declare const ActiveSessions: number

export type ReportInfoResponse = {
  Id: string
  Name: string
  DispatcherId: string
  RecordsMaxAge: number
  ProcessedEvents: number
  ActiveSessions: number
  ActiveRecords: number
  MemoryUsage: number
}

export const info = Utils.createHandler({
  handler: (): ReportInfoResponse => ({
    Id: ao.env.Process.Id,
    Name,
    DispatcherId,
    RecordsMaxAge,
    ProcessedEvents,
    ActiveSessions,
    ActiveRecords,
    MemoryUsage: collectgarbage("count"),
  }),
})
