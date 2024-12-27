import fs from "node:fs/promises"
import { scheduler } from "wao/test"

export const init = (mem, aoconnect, signer) => {
  return {
    initProcess: async (luaFilePath) => {
      const code = await fs.readFile(luaFilePath, "utf-8")

      const processId = await aoconnect.spawn({
        signer,
        scheduler,
        module: mem.modules.aos2_0_1,
      })

      await aoconnect.message({
        process: processId,
        tags: [{ name: "Action", value: "Eval" }],
        data: code,
        signer,
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
  }
}
