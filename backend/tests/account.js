import assert from "assert"
import { describe, it } from "node:test"
import { acc, ArMem, connect } from "wao/test"
import * as AoTestUtils from "./utilities.js"

const mem = new ArMem()
const ao = connect(mem)

describe("Junction-Account Process", () => {
  let accountProcessId
  const accountOwner = acc[0]
  const user = acc[1]

  const aoTestUtils = AoTestUtils.init(mem, ao, accountOwner.signer)

  it("spawns", async () => {
    const result = await aoTestUtils.initProcess("build/account.lua", {
      Name: "TEST-ACCOUNT",
      Description: "TEST-DESCRIPTION",
      DispatcherId: "TEST-DISPATCHER-ID",
      RegistryId: "TEST-REGISTRY-ID",
    })

    assert.equal(result.error, undefined)
    assert.equal(result.processId.length, 43)

    accountProcessId = result.processId
  })

  it("handles Info action dryrun", async () => {
    const result = await ao.dryrun({
      process: accountProcessId,
      tags: [{ name: "Action", value: "Info" }],
    })

    const replyMessage = result.Messages.find((m) => m.Target === "")

    aoTestUtils.assertSuccess(replyMessage)
    const processInfo = JSON.parse(replyMessage.Data)
    assert.equal(processInfo.Name, "TEST-ACCOUNT")
    assert.equal(processInfo.Description, "TEST-DESCRIPTION")
    assert.equal(processInfo.Members[accountOwner.addr], "Owner")
    assert.equal(processInfo.DispatcherId, "TEST-DISPATCHER-ID")
    assert.equal(processInfo.RegistryId, "TEST-REGISTRY-ID")
    assert.equal(processInfo.Reports.length, 0)
    assert.equal(typeof processInfo.MemoryUsage, "number")
  })

  it("handles UpdateInfo action message from owner", async () => {
    const result = await aoTestUtils.messageResult({
      process: accountProcessId,
      signer: accountOwner.signer,
      tags: [{ name: "Action", value: "UpdateInfo" }],
      data: JSON.stringify({
        Name: "TEST-ACCOUNT-UPDATED",
        Description: "TEST-DESCRIPTION-UPDATED",
        DispatcherId: "TEST-DISPATCHER-ID-UPDATED",
        RegistryId: "TEST-REGISTRY-ID-UPDATED",
      }),
    })

    const replyMessage = result.Messages.find(
      (m) => m.Target === accountOwner.addr
    )

    aoTestUtils.assertSuccess(replyMessage)
    const processInfo = JSON.parse(replyMessage.Data)
    assert.equal(processInfo.Name, "TEST-ACCOUNT-UPDATED")
    assert.equal(processInfo.Description, "TEST-DESCRIPTION-UPDATED")
    assert.equal(processInfo.DispatcherId, "TEST-DISPATCHER-ID-UPDATED")
    assert.equal(processInfo.RegistryId, "TEST-REGISTRY-ID") // can't be updated
  })

  it("ignores UpdateInfo action message from user", async () => {
    const result = await aoTestUtils.messageResult({
      process: accountProcessId,
      signer: user.signer,
      tags: [{ name: "Action", value: "UpdateInfo" }],
      data: JSON.stringify({ Name: "X" }),
    })

    const replyMessage = result.Messages.find((m) => m.Target === user.addr)

    aoTestUtils.assertError(replyMessage)

    const infoResult = await ao.dryrun({
      process: accountProcessId,
      tags: [{ name: "Action", value: "Info" }],
    })

    const processInfo = JSON.parse(infoResult.Messages[0].Data)
    assert.equal(processInfo.Name, "TEST-ACCOUNT-UPDATED")
  })

  it("handles member UpdateInfo action message from owner", async () => {
    const result = await aoTestUtils.messageResult({
      process: accountProcessId,
      signer: accountOwner.signer,
      tags: [{ name: "Action", value: "UpdateInfo" }],
      data: JSON.stringify({
        Members: { [accountOwner.addr]: "Owner", [user.addr]: "User" },
      }),
    })

    const replyMessage = result.Messages.find(
      (m) => m.Target === accountOwner.addr
    )

    aoTestUtils.assertSuccess(replyMessage)
    const processInfo = JSON.parse(replyMessage.Data)
    assert.equal(processInfo.Members[accountOwner.addr], "Owner")
    assert.equal(processInfo.Members[user.addr], "User")
    assert.equal(Object.keys(processInfo.Members).length, 2)
  })

  it("handles report UpdateInfo action message from user", async () => {
    const result = await aoTestUtils.messageResult({
      process: accountProcessId,
      signer: accountOwner.signer,
      tags: [{ name: "Action", value: "UpdateInfo" }],
      data: JSON.stringify({
        Reports: [{ name: "TEST-REPORT", processId: "TEST-REPORT-PROCESS-ID" }],
      }),
    })

    const replyMessage = result.Messages.find(
      (m) => m.Target === accountOwner.addr
    )

    aoTestUtils.assertSuccess(replyMessage)
    const processInfo = JSON.parse(replyMessage.Data)
    assert.equal(processInfo.Reports.length, 1)
    assert.equal(processInfo.Reports[0].name, "TEST-REPORT")
    assert.equal(processInfo.Reports[0].processId, "TEST-REPORT-PROCESS-ID")
  })
})
