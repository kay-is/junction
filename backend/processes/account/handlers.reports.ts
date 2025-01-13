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
    const removedReport = ProcessState.removeReport(message.Tags.Name)
    if (!removedReport) return { Error: "Report not found." }

    const relatedViews = ProcessState.getReportViews().filter(
      (rv) => rv.reportId === removedReport.processId
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
  requiredTags: ["Name", "ReportId"],
  handler: (message) => {
    const relatedReport = ProcessState.getReports().find(
      (r) => r.processId === message.Tags.ReportId
    )
    if (!relatedReport) return { Error: "ReportId not found." }
    ProcessState.addReportView({
      name: message.Tags.Name,
      reportId: message.Tags.ReportId,
    })
  },
})

export const removeReportView = Utils.createHandler({
  protected: true,
  requiredTags: ["Name"],
  handler: (message) => {
    const removedReport = ProcessState.removeReport(message.Tags.Name)
    if (!removedReport) return { Error: "Report not found." }
  },
})
