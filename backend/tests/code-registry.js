import assert from "assert"
import { describe, it } from "node:test"
import { acc } from "wao/test"
import * as AoTestUtils from "./utilities.js"

describe("Junction-Code-Registry Process", () => {
  let processId
  const processOwner = acc[0]

  const aoTestUtils = AoTestUtils.init(processOwner.signer)

  it("spawns", async () => {
    const result = await aoTestUtils.initProcess("build/code-registry.lua")

    assert.equal(result.error, undefined)
    assert.equal(result.processId.length, 43)

    processId = result.processId
  })

  it("handles Info action dryrun", async () => {
    const result = await aoTestUtils.dryrun({
      process: processId,
      tags: [{ name: "Action", value: "Info" }],
    })

    aoTestUtils.assertSuccess(result.Messages[0])
  })
})
