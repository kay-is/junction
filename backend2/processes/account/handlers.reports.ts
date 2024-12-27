import * as Utils from "../common/utilities"
import * as Info from "./handlers.info"

export type Report = {
  processId: string
  name: string
}

declare let Reports: Report[]
if (Reports === undefined) Reports = []

export const getReports = () => Reports

export const addReport = Utils.createHandler({
  protected: true,
  requiredTags: ["Name", "ProcessId"],
  handler: (message) => {
    Reports.push({
      processId: message.Tags.ProcessId,
      name: message.Tags.Name,
    })

    ao.send({
      Target: Info.getDispatcherId(),
      Action: "AddReport",
      Tags: { name: "ProcessId", value: message.Tags.ProcessId },
    })
  },
})

export const removeReport = Utils.createHandler({
  protected: true,
  requiredTags: ["Name"],
  handler: (message) => {
    const removedRecord = Reports.find(
      (report) => report.name === message.Tags.Name
    )

    if (!removedRecord) return { Error: "Report not found." }

    Reports = Reports.filter((report) => report.name !== message.Tags.Name)

    ao.send({
      Target: Info.getDispatcherId(),
      Action: "RemoveReport",
      Tags: { name: "ProcessId", value: removedRecord.processId },
    })
  },
})
