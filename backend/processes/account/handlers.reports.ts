import * as Utils from "../.common/utilities"
import * as ProcessState from "./process.state"

export type AccountAddReportResponse = void

export const addReport = Utils.createHandler({
  protected: true,
  requiredTags: ["Name", "ProcessId"],
  handler: (message): AccountAddReportResponse => {
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

export type AccountRemoveReportResponse = AccountAddReportResponse

export const removeReport = Utils.createHandler({
  protected: true,
  requiredTags: ["Name"],
  handler: (message): AccountRemoveReportResponse | { Error: string } => {
    const removedReport = ProcessState.removeReport(message.Tags.Name)
    if (!removedReport) return { Error: "Report not found." }

    const relatedViews = ProcessState.getReportViews().filter(
      (rv) => rv.sourceReportName === removedReport.name
    )

    if (!message.Tags.PurgeReportViews && relatedViews.length > 0)
      return {
        Error:
          "Can't delete report with active views. Use PurgeReportViews tag to remove this report's active views.",
      }

    for (const reportView of relatedViews)
      ProcessState.removeReportView(reportView.name)

    ao.send({
      Target: ProcessState.getDispatcherId(),
      Action: "RemoveReport",
      Tags: { name: "ProcessId", value: removedReport.processId },
    })
  },
})

export const addReportView = Utils.createHandler({
  protected: true,
  requiredTags: ["Name", "SourceReportName"],
  handler: (message) => {
    const relatedReport = ProcessState.getReports().find(
      (r) => r.name === message.Tags.SourceReportName
    )
    if (!relatedReport) return { Error: "Source report not found." }
    ProcessState.addReportView({
      name: message.Tags.Name,
      sourceReportName: message.Tags.SourceReportName,
    })
  },
})

export const removeReportView = Utils.createHandler({
  protected: true,
  requiredTags: ["Name"],
  handler: (message) => {
    const removedReport = ProcessState.removeReport(message.Tags.Name)
    if (!removedReport) return { Error: "Report view not found." }
  },
})
