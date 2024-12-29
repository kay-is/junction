import * as json from "json"

export type createHandlerOptions = {
  handler: (
    this: void,
    message: ao.message.Received,
    environment?: ao.Ao["env"]
  ) => any | void
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

export const addMember = (address: string, name: string) => {
  Members[address] = name
}

export const getMembers = () => Members

export const removeMember = (address: string) => {
  delete Members[address]
}

export const createHandler: CreateHandlerFunction = (options) => (message) => {
  if (options.protected && Members[message.From] === undefined)
    return message.reply({ Status: "Error", Error: "Unauthorized" })

  let missingTags = []

  if (options.requiredTags) {
    for (let tag of options.requiredTags) {
      if (!message.Tags[tag]) missingTags.push(tag)
    }
  }

  if (options.dataRequired && !message.Data) missingTags.push("Data")

  if (missingTags.length > 0) {
    return message.reply({
      Status: "Error",
      Error: `Missing tags: ${missingTags.join(", ")}`,
    })
  }

  const replyData = options.handler(message)

  if (replyData === undefined) return message.reply({ Status: "Success" })

  if (replyData.Error)
    return message.reply({ Status: "Error", Error: replyData.Error })

  return message.reply({
    Data: json.encode(replyData),
    Tags: { ["Content-Type"]: "application/json", Status: "Success" },
  })
}
