import * as Utils from "../common/utilities"

declare var ReportIds: string[]
if (ReportIds === undefined) ReportIds = []

export const getReportIds = () => ReportIds

declare var AssignedEventCount: number
if (AssignedEventCount === undefined) AssignedEventCount = 0

export const addReport = Utils.createHandler({
  protected: true,
  requiredTags: ["ProcessId"],
  handler: (message) => {
    ReportIds.push(message.Tags.ProcessId)
  },
})

export const removeReport = Utils.createHandler({
  protected: true,
  requiredTags: ["ProcessId"],
  handler: (message) => {
    const index = ReportIds.indexOf(message.Tags.ProcessId)
    if (index > -1) ReportIds.splice(index, 1)
  },
})

export const track = Utils.createHandler({
  handler: (message) => {
    const { Tags } = message

    Tags.Action = "Calculate"
    Tags.ad = message.From

    if (ReportIds.length > 0) ao.send({ Target: ao.id, Tags })
  },
})

export const calculate = Utils.createHandler({
  handler: (message) => {
    if (message.From !== ao.id) return { Error: "Unauthorized" }

    ao.assign({ Processes: ReportIds, Message: message.Id })
    AssignedEventCount += ReportIds.length
  },
})
