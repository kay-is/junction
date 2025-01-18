import assert from "node:assert"
import fs from "node:fs/promises"
import { scheduler } from "wao/test"

const LOCAL_AUTHORITY = "eNaLJLsMiWCSWvQKNbk_YT-9ydeWl9lrWwXxLVp9kcg"

export const init = (mem, aoconnect, signer) => {
  return {
    initProcess: async (luaFilePath, tags = {}) => {
      const code = await fs.readFile(luaFilePath, "utf-8")

      const spawnTags = [
        { name: "On-Boot", value: "Data" },
        { name: "Authority", value: LOCAL_AUTHORITY },
        ...Object.entries(tags).map(([name, value]) => ({ name, value })),
      ]

      const processId = await aoconnect.spawn({
        signer,
        scheduler,
        module: mem.modules.aos2_0_1,
        tags: spawnTags,
        data: code,
      })

      const spawnResults = await aoconnect.results({ process: processId })

      const result = {}
      if (spawnResults.edges[0].node.Error)
        result.error = spawnResults.edges[0].node.Error
      else result.processId = processId
      return result
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
      assert.equal(typeof message, "object", "No message in result.")
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
