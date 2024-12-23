import * as Utils from "../../common/utilities"

Name = ao.env.Process.Tags.Name

// Globals defined in handlers.calculate.ts
declare const DispatcherId: string
declare const RecordsMaxAge: number
declare const ProcessedEvents: number
declare const ActiveRecords: number
declare const ActiveSessions: number

type JunctionReportInfo = {
  Name: string
  DispatcherId: string
  RecordsMaxAge: number
  ProcessedEvents: number
  ActiveSessions: number
  ActiveRecords: number
  MemoryUsage: number
}

export const info = Utils.createHandler({
  handler: (): JunctionReportInfo => ({
    Name,
    DispatcherId,
    RecordsMaxAge,
    ProcessedEvents,
    ActiveSessions,
    ActiveRecords,
    MemoryUsage: collectgarbage("count"),
  }),
})
