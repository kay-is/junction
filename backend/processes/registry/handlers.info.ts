import * as Accounts from "./handlers.accounts"
import * as Utils from "../common/utilities"

Name = "Junction-Registry"

type JunctionRegistryInfo = {
  Name: string
  Members: ReturnType<typeof Utils.getMembers>
  AccountCount: ReturnType<typeof Accounts.getAccountCount>
  MemoryUsage: number
}

export const info = Utils.createHandler({
  handler: (): JunctionRegistryInfo => ({
    Name,
    Members: Utils.getMembers(),
    AccountCount: Accounts.getAccountCount(),
    MemoryUsage: collectgarbage("count"),
  }),
})
