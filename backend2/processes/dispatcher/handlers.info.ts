import * as Utils from "../common/utilities"
import * as Tracking from "./handlers.tracking"

Name = "Junction-Dispatcher"

declare var AssignedEventCount: number

type JunctionDispatcherInfo = {
  Name: string
  Members: ReturnType<typeof Utils.getMembers>
  AssignedEventCount: number
  ReportIds: ReturnType<typeof Tracking.getReportIds>
  MemoryUsage: number
}

export const info = Utils.createHandler({
  handler: (): JunctionDispatcherInfo => ({
    Name,
    Members: Utils.getMembers(),
    AssignedEventCount: AssignedEventCount,
    ReportIds: Tracking.getReportIds(),
    MemoryUsage: collectgarbage("count"),
  }),
})
