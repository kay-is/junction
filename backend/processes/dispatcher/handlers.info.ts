import * as Utils from "../.common/utilities"
import * as Tracking from "./handlers.tracking"

Name = "dispatcher"

declare var ReceivedEventCount: number
declare var InvalidEventCount: number
declare var AssignedEventCount: number
declare var HistoricEventIds: string[]

export interface DispatcherInfoResponse extends Utils.BasicInfo {
  ReportIds: ReturnType<typeof Tracking.getReportIds>
  ReceivedEventCount: number
  InvalidEventCount: number
  AssignedEventCount: number
  HistoricEventIds: string[]
}

export const info = Utils.createHandler({
  handler: (): DispatcherInfoResponse => ({
    ...Utils.getBasicInfo(),
    ReportIds: Tracking.getReportIds(),
    ReceivedEventCount,
    InvalidEventCount,
    AssignedEventCount,
    HistoricEventIds,
  }),
})
