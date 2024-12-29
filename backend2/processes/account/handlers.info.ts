import * as json from "json"
import * as Utils from "../common/utilities"
import * as Reports from "./handlers.reports"

if (ao.env.Process.Tags.Name && Name === "aos") Name = ao.env.Process.Tags.Name

declare var Description: string
if (Description === undefined) Description = ao.env.Process.Tags.Description

declare var RegistryId: string
if (RegistryId === undefined) RegistryId = ao.env.Process.Tags.RegistryId

declare var DispatcherId: string
if (DispatcherId === undefined) DispatcherId = ao.env.Process.Tags.DispatcherId

export const getDispatcherId = () => DispatcherId

type JunctionAccountInfo = {
  Name: string
  Description: string
  Members: ReturnType<typeof Utils.getMembers>
  DispatcherId: string
  Reports: ReturnType<typeof Reports.getReports>
  MemoryUsage: number
}

type GetInfoFunction = (this: void) => JunctionAccountInfo

const getInfo: GetInfoFunction = () => ({
  Name,
  Description,
  Members: Utils.getMembers(),
  DispatcherId: DispatcherId,
  Reports: Reports.getReports(),
  MemoryUsage: collectgarbage("count"),
})

export const info = Utils.createHandler({
  handler: getInfo,
})

export const updateInfo = Utils.createHandler({
  protected: true,
  dataRequired: true,
  handler: (message): JunctionAccountInfo => {
    const data: JunctionAccountInfo = json.decode(message.Data)

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
