import assert from "assert"
import { describe, it } from "node:test"
import { acc, ArMem, connect } from "wao/test"
import * as AoTestUtils from "./utilities.js"

const mem = new ArMem()
const ao = connect(mem)

const NINETY_DAYS_IN_MS = 1000 * 60 * 60 * 24 * 90

describe("Junction-Top-Pages-Report Process", () => {
  let reportProcessId
  const reportOwner = acc[0]
  const dispatcher = acc[1]
  const user = acc[2]

  const aoTestUtils = AoTestUtils.init(mem, ao, reportOwner.signer)

  it("spawns", async () => {
    reportProcessId = await aoTestUtils.initProcess(
      "build/top-pages-report.lua",
      {
        DispatcherId: dispatcher.addr,
        RecordsMaxAge: "" + NINETY_DAYS_IN_MS,
      }
    )
    assert.equal(typeof reportProcessId, "string")
  })

  it("handles Info action dryrun", async () => {
    const result = await ao.dryrun({
      process: reportProcessId,
      tags: [{ name: "Action", value: "Info" }],
    })

    const replyMessage = result.Messages.find((m) => m.Target === "")

    aoTestUtils.assertSuccess(replyMessage)
    const processInfo = JSON.parse(replyMessage.Data)
    assert.equal(processInfo.DispatcherId, dispatcher.addr)
    assert.equal(processInfo.RecordsMaxAge, 7776000000)
    assert.equal(processInfo.Name, "Junction-Top-Pages-Report")
    assert.equal(processInfo.ProcessedEvents, 0)
    assert.equal(processInfo.ActiveRecords, 0)
    assert.equal(processInfo.ActiveSessions, 0)
    assert.equal(typeof processInfo.MemoryUsage, "number")
  })

  it("handles Caclulate action message from dispatcher", async () => {
    const result = await aoTestUtils.messageResult({
      process: reportProcessId,
      signer: dispatcher.signer,
      tags: [
        { name: "Action", value: "Calculate" },
        { name: "ad", value: user.addr },
        { name: "ts", value: "" + Date.now() },
        { name: "ev", value: "pv" },
        { name: "url", value: "https://example.com/" },
        { name: "j-lt", value: "9999" },
        { name: "eth", value: "BraveWallet" },
        { name: "sol", value: "BraveWallet" },
        { name: "ar", value: "ArConnect" },
      ],
    })

    aoTestUtils.assertSuccess(result.Messages[0])

    const infoResult = await ao.dryrun({
      process: reportProcessId,
      tags: [{ name: "Action", value: "Info" }],
    })

    const processInfo = JSON.parse(infoResult.Messages[0].Data)
    assert.equal(processInfo.ProcessedEvents, 1)
    assert.equal(processInfo.ActiveRecords, 1)
  })

  it("ignores Caclulate action message from user", async () => {
    const result = await aoTestUtils.messageResult({
      process: reportProcessId,
      signer: user.signer,
      tags: [
        { name: "Action", value: "Calculate" },
        { name: "ad", value: user.addr },
        { name: "ts", value: "" + Date.now() },
        { name: "ev", value: "pv" },
        { name: "url", value: "https://example.com/" },
        { name: "j-lt", value: "9999" },
        { name: "eth", value: "BraveWallet" },
        { name: "sol", value: "BraveWallet" },
        { name: "ar", value: "ArConnect" },
      ],
    })

    aoTestUtils.assertError(result.Messages[0])

    const infoResult = await ao.dryrun({
      process: reportProcessId,
      tags: [{ name: "Action", value: "Info" }],
    })

    const processInfo = JSON.parse(infoResult.Messages[0].Data)
    assert.equal(processInfo.ProcessedEvents, 1)
    assert.equal(processInfo.ActiveRecords, 1)
  })

  it("handles GetRecords action dryrun", async () => {
    const result = await ao.dryrun({
      process: reportProcessId,
      tags: [
        { name: "Action", value: "GetRecords" },
        { name: "Start", value: "0" },
        { name: "Stop", value: "" + Date.now() },
      ],
    })

    aoTestUtils.assertSuccess(result.Messages[0])
    const records = JSON.parse(result.Messages[0].Data)

    assert.equal(Object.entries(records).length, 1)
  })
})
