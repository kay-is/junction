import * as json from "json"

export type HandlerResponse =
  | { NoReply: true }
  | { Error: string }
  | Record<string, any>
  | void

export type createHandlerOptions = {
  handler: (
    this: void,
    message: ao.message.Received,
    environment?: ao.Ao["env"]
  ) => HandlerResponse
  requiredTags?: string[]
  dataRequired?: boolean
  protected?: boolean
}

type CreateHandlerFunction = (
  this: void,
  options: createHandlerOptions
) => ao.handlers.Handler

declare var Members: Record<string, string>

if (Members === undefined) Members = { [Owner]: "Owner" }

export const setMember = (address: string, name: string) => {
  Members[address] = name
}

type GetMembersFunction = (this: void) => Record<string, string>
export const getMembers: GetMembersFunction = () => Members

export const removeMember = (address: string) => {
  delete Members[address]
}

export const createHandler: CreateHandlerFunction = (options) => (message) => {
  if (options.protected && Members[message.From] === undefined)
    return message.reply({ Status: "Error", Error: "Unauthorized" })

  const missingInfo: {
    tags: string[]
    data: boolean
  } = { tags: [], data: false }

  if (options.requiredTags) {
    for (let tag of options.requiredTags) {
      if (!message.Tags[tag]) missingInfo.tags.push(tag)
    }
  }

  missingInfo.data = options.dataRequired === true && !message.Data

  if (missingInfo.tags.length > 0 || missingInfo.data) {
    let errorMessage = ""

    if (missingInfo.tags.length > 0)
      errorMessage += `Missing tags: ${missingInfo.tags.join(", ")}. `

    if (missingInfo.data) errorMessage += "Missing Data."

    return message.reply({ Status: "Error", Error: errorMessage })
  }

  const replyData = options.handler(message)

  if (replyData === undefined) return message.reply({ Status: "Success" })

  if ("NoReply" in replyData) return

  if ("Error" in replyData)
    return message.reply({ Status: "Error", Error: replyData.Error })

  return message.reply({
    Data: json.encode(replyData),
    Tags: { ["Content-Type"]: "application/json", Status: "Success" },
  })
}

export type BasicInfo = {
  Id: string
  Name: string
  Members: Record<string, string>
  Owner: string
  MemoryUsage: number
}

export const getBasicInfo = (): BasicInfo => ({
  Id: ao.env.Process.Id,
  Name,
  Members: getMembers(),
  Owner,
  MemoryUsage: collectgarbage("count"),
})
