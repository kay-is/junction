import assert from "assert"
import { describe, it } from "node:test"
import { acc } from "wao/test"
import * as AoTestUtils from "./utilities.js"

describe("Junction-Registry Process", () => {
  let registryProcessId

  const registryOwner = acc[0]
  const accountOwner = acc[1]
  const user = acc[2]
  const accountProcess = acc[0]

  const aoTestUtils = AoTestUtils.init(registryOwner.signer)

  it("spawns", async () => {
    const result = await aoTestUtils.initProcess("build/registry.lua")

    assert.equal(result.error, undefined)
    assert.equal(result.processId.length, 43)

    registryProcessId = result.processId
  })

  it("handles Info action dryrun", async () => {
    const result = await aoTestUtils.dryrun({
      process: registryProcessId,
      tags: [{ name: "Action", value: "Info" }],
    })

    aoTestUtils.assertSuccess(result.Messages[0])
    const processInfo = JSON.parse(result.Messages[0].Data)
    assert.equal(processInfo.Name, "Junction-Registry")
    assert.equal(processInfo.AccountCount, 0)
    assert.equal(typeof processInfo.MemoryUsage, "number")
  })

  it("handles CreateAccount action message", async () => {
    const result = await aoTestUtils.messageResult({
      process: registryProcessId,
      signer: accountOwner.signer,
      tags: [
        { name: "Action", value: "CreateAccount" },
        { name: "Name", value: "TEST-ACCOUNT-NAME" },
        { name: "ProcessId", value: accountProcess.addr },
      ],
    })

    aoTestUtils.assertSuccess(result.Messages[0])
    const newAccount = JSON.parse(result.Messages[0].Data)
    assert.equal(newAccount.name, "TEST-ACCOUNT-NAME")
    assert.equal(newAccount.processId, accountProcess.addr)
    assert.equal(newAccount.members[0], accountOwner.addr)
  })

  it("handles GetAccount action dryrun", async () => {
    const result = await aoTestUtils.dryrun({
      process: registryProcessId,
      tags: [
        { name: "Action", value: "GetAccount" },
        { name: "Name", value: "TEST-ACCOUNT-NAME" },
      ],
    })

    aoTestUtils.assertSuccess(result.Messages[0])
    const account = JSON.parse(result.Messages[0].Data)
    assert.equal(account.name, "TEST-ACCOUNT-NAME")
    assert.equal(account.processId, accountProcess.addr)
    assert.equal(account.members[0], accountOwner.addr)
  })

  it("handles GetAccountList action dryrun", async () => {
    const result = await aoTestUtils.dryrun({
      process: registryProcessId,
      tags: [
        { name: "Action", value: "GetAccountList" },
        { name: "Address", value: accountOwner.addr },
      ],
    })

    aoTestUtils.assertSuccess(result.Messages[0])
    const accounts = JSON.parse(result.Messages[0].Data)
    assert.equal(accounts[0].name, "TEST-ACCOUNT-NAME")
    assert.equal(accounts[0].processId, accountProcess.addr)
  })

  it("handles UpdateAccount action message from account member", async () => {
    const updateResult = await aoTestUtils.messageResult({
      process: registryProcessId,
      signer: accountOwner.signer,
      tags: [
        { name: "Action", value: "UpdateAccount" },
        { name: "Name", value: "TEST-ACCOUNT-NAME" },
      ],
      data: JSON.stringify({
        name: "NEW-TEST-ACCOUNT-NAME",
        members: [accountOwner.addr, user.addr],
      }),
    })

    aoTestUtils.assertSuccess(updateResult.Messages[0])

    const accountListResult = await aoTestUtils.dryrun({
      process: registryProcessId,
      tags: [
        { name: "Action", value: "GetAccountList" },
        { name: "Address", value: user.addr },
      ],
    })

    aoTestUtils.assertSuccess(accountListResult.Messages[0])
    const accounts = JSON.parse(accountListResult.Messages[0].Data)
    assert.equal(accounts[0].name, "NEW-TEST-ACCOUNT-NAME")
    assert.equal(accounts[0].processId, accountProcess.addr)
  })

  it("ignores UpdateAccount action message from unknown account address", async () => {
    const updateResult = await aoTestUtils.messageResult({
      process: registryProcessId,
      signer: user.signer,
      tags: [{ name: "Action", value: "UpdateAccount" }],
      data: JSON.stringify({ name: "", members: [] }),
    })

    aoTestUtils.assertError(updateResult.Messages[0])

    const result = await aoTestUtils.dryrun({
      process: registryProcessId,
      tags: [
        { name: "Action", value: "GetAccountList" },
        { name: "Address", value: accountOwner.addr },
      ],
    })

    aoTestUtils.assertSuccess(result.Messages[0])
    const accounts = JSON.parse(result.Messages[0].Data)
    assert.equal(accounts[0].name, "NEW-TEST-ACCOUNT-NAME")
    assert.equal(accounts[0].processId, accountProcess.addr)
  })

  it("replies with error on missing tag", async () => {
    const result = await aoTestUtils.dryrun({
      process: registryProcessId,
      tags: [{ name: "Action", value: "GetAccount" }],
    })

    aoTestUtils.assertError(result.Messages[0])
  })
})
