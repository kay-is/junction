import * as Utils from "../common/utilities"
import * as ProcessState from "./process.state"

export const addReport = Utils.createHandler({
  protected: true,
  requiredTags: ["Name", "ProcessId"],
  handler: (message) => {
    ProcessState.addReport({
      processId: message.Tags.ProcessId,
      name: message.Tags.Name,
    })

    ao.send({
      Target: ProcessState.getDispatcherId(),
      Action: "AddReport",
      Tags: { name: "ProcessId", value: message.Tags.ProcessId },
    })
  },
})

export const removeReport = Utils.createHandler({
  protected: true,
  requiredTags: ["Name"],
  handler: (message) => {
    const removedRecord = ProcessState.removeReport(message.Tags.Name)
    if (!removedRecord) return { Error: "Report not found." }
    ao.send({
      Target: ProcessState.getDispatcherId(),
      Action: "RemoveReport",
      Tags: { name: "ProcessId", value: removedRecord.processId },
    })
  },
})
