import assert from "assert"
import { describe, it } from "node:test"
import { acc, ArMem, connect } from "wao/test"
import * as AoTestUtils from "./utilities.js"

const mem = new ArMem()
const ao = connect(mem)

describe("Report-Devices Process", () => {
  let reportProcessId
  const reportOwner = acc[0]
  const dispatcher = acc[1]
  const user = acc[2]

  const aoTestUtils = AoTestUtils.init(mem, ao, reportOwner.signer)

  it("spawns", async () => {
    const result = await aoTestUtils.initProcess("build/report-devices.lua", {
      DispatcherId: dispatcher.addr,
    })

    assert.equal(result.error, undefined)
    assert.equal(result.processId.length, 43)

    reportProcessId = result.processId
  })

  it("handles Info action dryrun", async () => {
    const result = await ao.dryrun({
      process: reportProcessId,
      tags: [{ name: "Action", value: "Info" }],
    })

    const replyMessage = result.Messages.find((m) => m.Target === "")

    aoTestUtils.assertSuccess(replyMessage)
    const processInfo = JSON.parse(replyMessage.Data)
    assert.equal(processInfo.Id, reportProcessId)
    assert.equal(processInfo.Name, "devices")
    assert.equal(processInfo.Owner, reportOwner.addr)
    assert.equal(processInfo.Members[reportOwner.addr], "Owner")
    assert.equal(processInfo.DispatcherId, dispatcher.addr)
    assert.equal(processInfo.ProcessedEventCount, 0)
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
        {
          name: "ua",
          value:
            "Mozilla/5.0 (iPad; CPU OS 8_1_3 like Mac OS X) AppleWebKit/600.1.4 (KHTML, like Gecko) Mobile/12B466",
        },
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
    assert.equal(processInfo.ProcessedEventCount, 1)
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
    assert.equal(processInfo.ProcessedEventCount, 1)
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
