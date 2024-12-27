import * as json from "json"
import * as Utils from "../common/utilities"
import * as Reports from "./handlers.reports"

if (Name === undefined) Name = ao.env.Process.Tags.Name

declare let Description: string
if (Description === undefined) Description = ao.env.Process.Tags.Description

declare let RegistryId: string
if (RegistryId === undefined) RegistryId = ao.env.Process.Tags.RegistryId

declare let DispatcherId: string
if (DispatcherId === undefined) DispatcherId = ao.env.Process.Tags.DispatcherId

export const getDispatcherId = () => DispatcherId

type AccountInfo = {
  Name: string
  Description: string
  Members: Utils.Members
  DispatcherId: string
  Reports: Reports.Report[]
  MemoryUsage: number
}

type GetInfoFunction = (this: void) => AccountInfo

const getInfo: GetInfoFunction = () => ({
  Name,
  Description,
  Members: Utils.getMembers(),
  DispatcherId,
  Reports: Reports.getReports(),
  MemoryUsage: collectgarbage("count"),
})

export const info = Utils.createHandler({
  handler: getInfo,
})

export const updateInfo = Utils.createHandler({
  protected: true,
  dataRequired: true,
  handler: (message): AccountInfo => {
    const data: AccountInfo = json.decode(message.Data)

    let registryUpdateRequired = false
    if (data.Name !== undefined) {
      Name = data.Name
      registryUpdateRequired = true
    }
    if (data.Description !== undefined) Description = data.Description
    if (data.DispatcherId !== undefined) DispatcherId = data.DispatcherId
    if (data.Members !== undefined) {
      for (let id in data.Members) Utils.addMember(id, data.Members[id])
      registryUpdateRequired = true
    }

    if (registryUpdateRequired === true) {
      ao.send({
        Target: RegistryId,
        Action: "UpdateAccount",
        Data: json.encode({ name: Name, members: Utils.getMembers() }),
      })
    }

    return getInfo()
  },
})
