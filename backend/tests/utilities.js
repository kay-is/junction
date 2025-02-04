import assert from "node:assert"
import fs from "node:fs/promises"
import { ArMem, connect } from "wao/test"

const mem = new ArMem()
const aoconnect = connect(mem)

const LOCAL_AUTHORITY = "eNaLJLsMiWCSWvQKNbk_YT-9ydeWl9lrWwXxLVp9kcg"
const LOCAL_SCHEDULER = "_GQ33BkPtZrqxA84vM8Zk-N2aO0toNNu_C-l-rawrBA"
const AOS201_MODULE_TXID = "Do_Uc2Sju_ffp6Ev0AnLVdPtot15rvMjP-a9VVaA5fM"

const logDebug = (result) => {
  const debugMessages = result.Messages.filter((m) => m.Target === "DEBUG")

  if (debugMessages.length > 0)
    debugMessages.forEach((m) => console.log(m.Data))

  result.Messages = result.Messages.filter((m) => m.Target !== "DEBUG")
}

export const init = (signer) => {
  return {
    dryrun: async (options) => {
      const result = await aoconnect.dryrun(options)
      logDebug(result)
      return result
    },
    initProcess: async (luaFilePath, tags = {}) => {
      const code = await fs.readFile(luaFilePath, "utf-8")

      const spawnTags = [
        { name: "On-Boot", value: "Data" },
        { name: "Authority", value: LOCAL_AUTHORITY },
        ...Object.entries(tags).map(([name, value]) => ({ name, value })),
      ]

      const processId = await aoconnect.spawn({
        signer,
        scheduler: LOCAL_SCHEDULER,
        module: AOS201_MODULE_TXID,
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
      const result = await aoconnect.result({
        process: message.process,
        message: messageId,
      })

      logDebug(result)

      return result
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
