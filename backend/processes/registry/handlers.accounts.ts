import * as json from "json"
import * as Utils from "../.common/utilities"

type Account = {
  name: string
  processId: string
  members: string[]
}
declare var Accounts: Record<string, Account>
if (Accounts === undefined) Accounts = {}

export const getAccountCount = () => Object.keys(Accounts).length

export const getAccount = Utils.createHandler({
  requiredTags: ["Name"],
  handler: (message) =>
    Accounts[message.Tags.Name]
      ? Accounts[message.Tags.Name]
      : { Error: "Account not found." },
})

export type AccountListResponse = { name: string; processId: string }[]

export const getAccountList = Utils.createHandler({
  requiredTags: ["Address"],
  handler: (message) =>
    Object.values(Accounts)
      .filter((account) => account.members.includes(message.Tags.Address))
      .map(({ name, processId }) => ({ name, processId })),
})

export type CreateAccountResponse = Account

export const createAccount = Utils.createHandler({
  requiredTags: ["Name", "ProcessId"],
  handler: (message) => {
    if (Accounts[message.Tags.Name]) return { Error: "Account already exists." }

    Accounts[message.Tags.Name] = {
      name: message.Tags.Name,
      processId: message.Tags.ProcessId,
      members: [message.From],
    }

    return Accounts[message.Tags.Name]
  },
})

export type UpdateAccountResponse = void

export const updateAccount = Utils.createHandler({
  dataRequired: true,
  requiredTags: ["Name"],
  handler: (message) => {
    const account = Accounts[message.Tags.Name]

    if (account === undefined) return { Error: "Account not found." }
    if (!account.members.includes(message.From))
      return { Error: "Unauthorized." }

    const data: Partial<Account> = json.decode(message.Data)
    account.name = data.name ?? account.name
    account.members = data.members ?? account.members
    account.processId = data.processId ?? account.processId
  },
})
