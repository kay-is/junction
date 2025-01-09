import * as proc from "./process"
import * as json from "json"
import * as Utils from "../common/utilities"
import * as ProcessState from "./process.state"

export type AccountInfoResponse = {
  Name: string
  Description: string
  Members: ReturnType<typeof Utils.getMembers>
  DispatcherId: string
  RegistryId: string
  Reports: ProcessState.Report[]
  MemoryUsage: number
}

type GetInfoFunction = (this: void) => AccountInfoResponse

const getInfo: GetInfoFunction = () => ({
  Name: ProcessState.getName(),
  Description: ProcessState.getDescription(),
  Members: Utils.getMembers(),
  RegistryId: ProcessState.getRegistryId(),
  DispatcherId: ProcessState.getDispatcherId(),
  Reports: ProcessState.getReports(),
  MemoryUsage: collectgarbage("count"),
})

export const info = Utils.createHandler({ handler: getInfo })

export type AccountUpdateInfoResponse = AccountInfoResponse

export const updateInfo = Utils.createHandler({
  protected: true,
  dataRequired: true,
  handler: (message): AccountUpdateInfoResponse => {
    const data: AccountUpdateInfoResponse = json.decode(message.Data)

    let registryUpdateRequired = false
    if (data.Name !== undefined) {
      Name = data.Name
      registryUpdateRequired = true
    }
    if (data.Members !== undefined) {
      const members = Utils.getMembers()
      for (const address of Object.keys(members)) Utils.removeMember(address)
      for (const [address, name] of Object.entries(data.Members))
        Utils.setMember(address, name)
      registryUpdateRequired = true
    }

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

    if (registryUpdateRequired === true) {
      ao.send({
        Target: ProcessState.getRegistryId(),
        Action: "UpdateAccount",
        Data: json.encode({ name: Name, members: Utils.getMembers() }),
      })
    }

    return getInfo()
  },
})
