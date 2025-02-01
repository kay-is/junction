import * as Utils from "../common/utilities"

// holds the last 1000 event IDs
declare var HistoricEventIds: string[]
if (HistoricEventIds === undefined) HistoricEventIds = []

const recordEventId = (id: string) => {
  HistoricEventIds.push(id)
  if (HistoricEventIds.length > 1000) HistoricEventIds.shift()
}

declare var ReportIds: string[]
if (ReportIds === undefined) ReportIds = []

export const getReportIds = () => ReportIds

declare var ReceivedEventCount: number
if (ReceivedEventCount === undefined) ReceivedEventCount = 0

declare var AssignedEventCount: number
if (AssignedEventCount === undefined) AssignedEventCount = 0

export const setAccount = Utils.createHandler({
  protected: true,
  requiredTags: ["ProcessId"],
  handler: (message) => {
    Utils.setMember(message.Tags.ProcessId, "Account")
  },
})

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
    if (message.Tags.ts === undefined) return { NoReply: true }
    if (message.Tags.ev === undefined) return { NoReply: true }
    ReceivedEventCount++
    // Message will be assigned to report processes that expect the Calculate action
    message.Tags.Action = "Calculate"
    message.Tags.ad = message.From
    for (const id of ReportIds) ao.send({ Target: id, Tags: message.Tags })
    return { NoReply: true }
  },
})

export const calculate = Utils.createHandler({
  handler: (message) => {
    if (message.From !== ao.id) return { NoReply: true }
    ao.assign({ Processes: ReportIds, Message: message.Id })
    AssignedEventCount += ReportIds.length
    recordEventId(message.Id)
    return { NoReply: true }
  },
})
