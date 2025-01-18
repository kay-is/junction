import assert from "assert"
import { describe, it } from "node:test"
import { acc, ArMem, connect } from "wao/test"
import * as AoTestUtils from "./utilities.js"

const mem = new ArMem()
const ao = connect(mem)

describe("Junction-Code-Registry Process", () => {
  let processId
  const processOwner = acc[0]

  const aoTestUtils = AoTestUtils.init(mem, ao, processOwner.signer)

  it("spawns", async () => {
    const result = await aoTestUtils.initProcess("build/code-registry.lua")

    assert.equal(result.error, undefined)
    assert.equal(result.processId.length, 43)

    processId = result.processId
  })

  it("handles Info action dryrun", async () => {
    const result = await ao.dryrun({
      process: processId,
      tags: [{ name: "Action", value: "Info" }],
    })

    aoTestUtils.assertSuccess(result.Messages[0])
  })
})
