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

export type Members = Record<string, string>
declare let Members: Members
Members = Members ?? { Owner }

export const addMember = (id: string, name: string) => {
  Members[id] = name
}

export const getMembers = () => Members

export const removeMember = (id: string) => {
  delete Members[id]
}

export const createHandler: CreateHandlerFunction = (options) => (message) => {
  if (options.protected && !Members[message.From])
    return message.reply({ Error: "Unauthorized" })

  let missingTags = []

  if (options.requiredTags) {
    for (let tag of options.requiredTags) {
      if (!message.Tags[tag]) missingTags.push(tag)
    }
  }

  if (options.dataRequired && !message.Data) missingTags.push("Data")

  if (missingTags.length > 0) {
    return message.reply({
      Error: `Missing tags: ${missingTags.join(", ")}`,
    })
  }

  const replyData = options.handler(message)

  if (replyData) {
    if (replyData.Error) message.reply({ Error: replyData.Error })
    else
      message.reply({
        Data: json.encode(replyData),
        Tags: { ["Content-Type"]: "application/json" },
      })
  }
}
