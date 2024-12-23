import * as Utils from "../common/utilities"

Name = Name ?? ao.env.Process.Tags.Name

export const info = Utils.createHandler({
  handler: () => ({
    Name,
    MemoryUsage: collectgarbage("count"),
  }),
})
