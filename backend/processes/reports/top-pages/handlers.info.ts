import * as Utils from "../../common/utilities"

Name = "top-pages"

// Globals defined in handlers.calculate.ts
declare const DispatcherId: string
declare const ProcessedEventCount: number
declare const ActiveRecords: number
declare const ActiveSessions: number

export interface ReportInfoResponse extends Utils.BasicInfo {
  DispatcherId: string
  ProcessedEventCount: number
  ActiveSessions: number
  ActiveRecords: number
}

export const info = Utils.createHandler({
  handler: (): ReportInfoResponse => ({
    ...Utils.getBasicInfo(),
    DispatcherId,
    ProcessedEventCount,
    ActiveSessions,
    ActiveRecords,
  }),
})
