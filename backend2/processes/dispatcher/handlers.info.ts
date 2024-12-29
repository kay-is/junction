import * as Utils from "../common/utilities"
import * as Tracking from "./handlers.tracking"

Name = "Junction-Dispatcher"

type JunctionDispatcherInfo = {
  Name: string
  Members: ReturnType<typeof Utils.getMembers>
  ReportIds: ReturnType<typeof Tracking.getReportIds>
  MemoryUsage: number
}

export const info = Utils.createHandler({
  handler: (): JunctionDispatcherInfo => ({
    Name,
    Members: Utils.getMembers(),
    ReportIds: Tracking.getReportIds(),
    MemoryUsage: collectgarbage("count"),
  }),
})
