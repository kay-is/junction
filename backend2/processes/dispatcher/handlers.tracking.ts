import * as Utils from "../common/utilities"

declare let ReportIds: string[]
ReportIds = ReportIds ?? []

declare let AssignedEventCount: number
AssignedEventCount = AssignedEventCount ?? 0

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
    if (message.From !== ao.id) return

    ao.assign({ Processes: ReportIds, Message: message.Id })
    AssignedEventCount += ReportIds.length
  },
})
