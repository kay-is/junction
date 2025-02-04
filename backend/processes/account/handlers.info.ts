import * as json from "json"
import * as Utils from "../.common/utilities"
import * as ProcessState from "./process.state"

export interface AccountInfoResponse extends Utils.BasicInfo {
  Description: string
  DispatcherId: string
  RegistryId: string
  Reports: ProcessState.Report[]
  ReportViews: ProcessState.ReportView[]
}

type GetInfoFunction = (this: void) => AccountInfoResponse

const getInfo: GetInfoFunction = () => ({
  ...Utils.getBasicInfo(),
  Description: ProcessState.getDescription(),
  RegistryId: ProcessState.getRegistryId(),
  DispatcherId: ProcessState.getDispatcherId(),
  Reports: ProcessState.getReports(),
  ReportViews: ProcessState.getReportViews(),
})

export const info = Utils.createHandler({ handler: getInfo })

export type AccountUpdateInfoResponse = AccountInfoResponse

export const updateInfo = Utils.createHandler({
  protected: true,
  dataRequired: true,
  handler: (message): AccountUpdateInfoResponse => {
    const data: AccountUpdateInfoResponse = json.decode(message.Data)

    if (data.Name !== undefined) Name = data.Name
    if (data.Description !== undefined)
      ProcessState.setDescription(data.Description)
    if (data.DispatcherId !== undefined)
      ProcessState.setDispatcherId(data.DispatcherId)
    if (data.Reports !== undefined) {
      const reports = ProcessState.getReports()
      for (const report of reports) {
        if (data.Reports.find((r) => r.name === report.name) === undefined)
          ProcessState.removeReport(report.name)
      }
      for (const report of data.Reports) ProcessState.addReport(report)
    }
    if (data.Members !== undefined) {
      const members = Utils.getMembers()
      for (const address of Object.keys(members)) Utils.removeMember(address)
      for (const [address, name] of Object.entries(data.Members))
        Utils.setMember(address, name)
    }

    return getInfo()
  },
})
