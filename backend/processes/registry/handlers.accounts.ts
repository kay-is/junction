import * as json from "json"
import * as Utils from "../common/utilities"

type JunctionAccount = {
  name: string
  processId: string
  members: string[]
}
declare var Accounts: Record<string, JunctionAccount>
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

export type CreateAccountResponse = JunctionAccount

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
  handler: (message) => {
    const account = Object.values(Accounts).find(
      (account) => account.processId === message.From
    )

    if (account === undefined) return { Error: "Account not found." }

    type Data = { name?: string; members?: string[] }
    const data: Data = json.decode(message.Data)
    account.name = data.name ?? account.name
    account.members = data.members ?? account.members
  },
})
