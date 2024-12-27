import assert from "assert"
import { describe, it } from "node:test"
import { acc, ArMem, connect } from "wao/test"
import * as AoTestUtils from "./utilities.js"

const mem = new ArMem()
const ao = connect(mem)

describe("Junction-Registry Process", () => {
  let registryProcessId

  const registryOwner = acc[0]
  const accountOwner = acc[1]
  const user = acc[2]
  const accountProcess = acc[0]

  const aoTestUtils = AoTestUtils.init(mem, ao, registryOwner.signer)

  it("spawns", async () => {
    registryProcessId = await aoTestUtils.initProcess("build/registry.lua")
    assert.equal(typeof registryProcessId, "string")
  })

  it("handles Info action dryrun", async () => {
    const result = await ao.dryrun({
      process: registryProcessId,
      tags: [{ name: "Action", value: "Info" }],
    })

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

    const newAccount = JSON.parse(result.Messages[0].Data)
    assert.equal(newAccount.name, "TEST-ACCOUNT-NAME")
    assert.equal(newAccount.processId, accountProcess.addr)
    assert.equal(newAccount.members[0], accountOwner.addr)
  })

  it("handles GetAccount action dryrun", async () => {
    const result = await ao.dryrun({
      process: registryProcessId,
      tags: [
        { name: "Action", value: "GetAccount" },
        { name: "Name", value: "TEST-ACCOUNT-NAME" },
      ],
    })

    const account = JSON.parse(result.Messages[0].Data)
    assert.equal(account.name, "TEST-ACCOUNT-NAME")
    assert.equal(account.processId, accountProcess.addr)
    assert.equal(account.members[0], accountOwner.addr)
  })

  it("handles GetAccountList action dryrun", async () => {
    const result = await ao.dryrun({
      process: registryProcessId,
      tags: [
        { name: "Action", value: "GetAccountList" },
        { name: "Address", value: accountOwner.addr },
      ],
    })

    const accounts = JSON.parse(result.Messages[0].Data)
    assert.equal(accounts[0].name, "TEST-ACCOUNT-NAME")
    assert.equal(accounts[0].processId, accountProcess.addr)
  })

  it("handles UpdateAccount action message from account process", async () => {
    await ao.message({
      process: registryProcessId,
      signer: accountProcess.signer,
      tags: [{ name: "Action", value: "UpdateAccount" }],
      data: JSON.stringify({
        name: "NEW-TEST-ACCOUNT-NAME",
        members: [accountOwner.addr, user.addr],
      }),
    })

    const result = await ao.dryrun({
      process: registryProcessId,
      tags: [
        { name: "Action", value: "GetAccountList" },
        { name: "Address", value: user.addr },
      ],
    })

    const accounts = JSON.parse(result.Messages[0].Data)
    assert.equal(accounts[0].name, "NEW-TEST-ACCOUNT-NAME")
    assert.equal(accounts[0].processId, accountProcess.addr)
  })

  it("ignores UpdateAccount action message from unknown account address", async () => {
    await ao.message({
      process: registryProcessId,
      signer: user.signer,
      tags: [{ name: "Action", value: "UpdateAccount" }],
      data: JSON.stringify({ name: "", members: [] }),
    })

    const result = await ao.dryrun({
      process: registryProcessId,
      tags: [
        { name: "Action", value: "GetAccountList" },
        { name: "Address", value: accountOwner.addr },
      ],
    })

    const accounts = JSON.parse(result.Messages[0].Data)
    assert.equal(accounts[0].name, "NEW-TEST-ACCOUNT-NAME")
    assert.equal(accounts[0].processId, accountProcess.addr)
  })

  it("ignores Eval action message from wrong address", async () => {
    const result = await aoTestUtils.messageResult({
      process: registryProcessId,
      signer: user.signer,
      tags: [{ name: "Action", value: "Eval" }],
      data: "",
    })

    assert.equal(result.Messages.length, 0)
  })

  it("replies with error on missing tag", async () => {
    const result = await ao.dryrun({
      process: registryProcessId,
      tags: [{ name: "Action", value: "GetAccount" }],
    })

    const errorTag = result.Messages[0].Tags.find((tag) => tag.name === "Error")
    assert.equal(errorTag.value, "Missing tags: Name")
  })
})
