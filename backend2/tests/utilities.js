import assert from "node:assert"
import fs from "node:fs/promises"
import { scheduler } from "wao/test"

export const init = (mem, aoconnect, signer) => {
  return {
    initProcess: async (luaFilePath, tags = {}) => {
      const code = await fs.readFile(luaFilePath, "utf-8")

      const processId = await aoconnect.spawn({
        signer,
        scheduler,
        module: mem.modules.aos2_0_1,
        tags: [
          ...Object.entries(tags).map(([name, value]) => ({ name, value })),
          { name: "On-Boot", value: "Data" },
        ],
        data: code,
      })

      return processId
    },

    messageResult: async (message) => {
      const messageId = await aoconnect.message(message)
      return await aoconnect.result({
        process: message.process,
        message: messageId,
      })
    },

    getTag: (message, name) => message.Tags.find((tag) => tag.name === name),

    assertSuccess: (message) => {
      const statusTag = message.Tags.find((tag) => tag.name === "Status")
      assert.equal(
        statusTag.value,
        "Success",
        "Expected message to have Success Status"
      )
    },

    assertError: (message) => {
      const statusTag = message.Tags.find((tag) => tag.name === "Status")
      assert.equal(
        statusTag.value,
        "Error",
        "Expected message to have Error Status"
      )
    },
  }
}
