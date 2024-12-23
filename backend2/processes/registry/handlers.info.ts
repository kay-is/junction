import * as Accounts from "./handlers.accounts"
import * as Utils from "../common/utilities"

Name = "Junction-Registry"

export const info = Utils.createHandler({
  handler: () => ({
    Name,
    AccountCount: Accounts.getAccountCount(),
    MemoryUsage: collectgarbage("count"),
  }),
})
