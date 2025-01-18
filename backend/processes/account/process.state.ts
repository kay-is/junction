export const getProcessId = () => ao.env.Process.Id

if (ao.env.Process.Tags.Name && Name === "aos") Name = ao.env.Process.Tags.Name
export const getName = () => Name
export const setName = (newName: string) => {
  Name = newName
}

declare let Description: string
if (Description === undefined) Description = ao.env.Process.Tags.Description
export const getDescription = () => Description
export const setDescription = (newDescription: string) => {
  Description = newDescription
}

declare let RegistryId: string
if (RegistryId === undefined) RegistryId = ao.env.Process.Tags.RegistryId
export const getRegistryId = () => RegistryId
export const setRegistryId = (newRegistryId: string) => {
  RegistryId = newRegistryId
}

declare let DispatcherId: string
if (DispatcherId === undefined) DispatcherId = ao.env.Process.Tags.DispatcherId
export const getDispatcherId = () => DispatcherId
export const setDispatcherId = (newDispatcherId: string) => {
  DispatcherId = newDispatcherId
}

export type Report = {
  processId: string
  name: string
}

declare let Reports: Report[]
if (Reports === undefined) Reports = []
export const getReports = () => Reports
export const addReport = (report: Report) => Reports.push(report)
export const removeReport = (name: string) => {
  const removedRecord = Reports.find((report) => report.name === name)
  Reports = Reports.filter((report) => report.name !== name)
  return removedRecord
}

export type ReportView = {
  name: string
  sourceReportName: string
}

declare let ReportViews: ReportView[]
if (ReportViews === undefined) ReportViews = []
export const getReportViews = () => ReportViews
export const addReportView = (reportView: ReportView) =>
  ReportViews.push(reportView)
export const removeReportView = (name: string) => {
  const removedRepordView = ReportViews.find(
    (reportView) => reportView.name === name
  )
  ReportViews = ReportViews.filter((reportView) => reportView.name !== name)
  return removedRepordView
}
