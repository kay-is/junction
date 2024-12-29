import assert from "assert"
import { describe, it } from "node:test"
import { acc, ArMem, connect } from "wao/test"
import * as AoTestUtils from "./utilities.js"

const mem = new ArMem()
const ao = connect(mem)

describe("Junction-Dispatcher Process", () => {
  let dispatcherProcessId
  const dispatcherOwner = acc[0]
  const user = acc[1]

  const aoTestUtils = AoTestUtils.init(mem, ao, dispatcherOwner.signer)

  it("spawns", async () => {
    dispatcherProcessId = await aoTestUtils.initProcess("build/dispatcher.lua")
    assert.equal(typeof dispatcherProcessId, "string")
  })

  it("handles Info action dryrun", async () => {
    const result = await ao.dryrun({
      process: dispatcherProcessId,
      tags: [{ name: "Action", value: "Info" }],
    })

    aoTestUtils.assertSuccess(result.Messages[0])
    const processInfo = JSON.parse(result.Messages[0].Data)
    assert.equal(processInfo.Name, "Junction-Dispatcher")
    assert.equal(processInfo.ReportIds.length, 0)
    assert.equal(typeof processInfo.MemoryUsage, "number")
  })

  it("handles Track action message from user", async () => {
    const result = await aoTestUtils.messageResult({
      process: dispatcherProcessId,
      signer: user.signer,
      tags: [{ name: "Action", value: "Track" }],
    })

    aoTestUtils.assertSuccess(result.Messages[0])
  })

  it("ignores Calculate action message from user", async () => {
    const result = await aoTestUtils.messageResult({
      process: dispatcherProcessId,
      signer: user.signer,
      tags: [{ name: "Action", value: "Calculate" }],
    })
    aoTestUtils.assertError(result.Messages[0])
    assert.equal(result.Assignments.length, 0)
  })

  it("ignores AddReport action message from user", async () => {
    const addReportResult = await aoTestUtils.messageResult({
      process: dispatcherProcessId,
      signer: user.signer,
      tags: [
        { name: "Action", value: "AddReport" },
        { name: "ProcessId", value: "USER-REPORT-ID" },
      ],
    })

    aoTestUtils.assertError(addReportResult.Messages[0])

    const infoResult = await ao.dryrun({
      process: dispatcherProcessId,
      tags: [{ name: "Action", value: "Info" }],
    })

    aoTestUtils.assertSuccess(infoResult.Messages[0])
    const processInfo = JSON.parse(infoResult.Messages[0].Data)
    assert.equal(processInfo.ReportIds.length, 0)
  })

  it("handles AddReport action message from owner", async () => {
    const addReportResult = await aoTestUtils.messageResult({
      process: dispatcherProcessId,
      signer: dispatcherOwner.signer,
      tags: [
        { name: "Action", value: "AddReport" },
        { name: "ProcessId", value: "TEST-REPORT-ID" },
      ],
    })

    aoTestUtils.assertSuccess(addReportResult.Messages[0])

    const infoResult = await ao.dryrun({
      process: dispatcherProcessId,
      tags: [{ name: "Action", value: "Info" }],
    })

    aoTestUtils.assertSuccess(infoResult.Messages[0])
    const processInfo = JSON.parse(infoResult.Messages[0].Data)
    assert.equal(processInfo.ReportIds.length, 1)
  })

  it("ignores RemoveReport action message from user", async () => {
    const addReportResult = await aoTestUtils.messageResult({
      process: dispatcherProcessId,
      signer: user.signer,
      tags: [
        { name: "Action", value: "RemoveReport" },
        { name: "ProcessId", value: "TEST-REPORT-ID" },
      ],
    })

    aoTestUtils.assertError(addReportResult.Messages[0])

    const infoResult = await ao.dryrun({
      process: dispatcherProcessId,
      tags: [{ name: "Action", value: "Info" }],
    })

    aoTestUtils.assertSuccess(infoResult.Messages[0])
    const processInfo = JSON.parse(infoResult.Messages[0].Data)
    assert.equal(processInfo.ReportIds.length, 1)
  })

  it("handles RemoveReport action message from owner", async () => {
    const addReportResult = await aoTestUtils.messageResult({
      process: dispatcherProcessId,
      signer: dispatcherOwner.signer,
      tags: [
        { name: "Action", value: "RemoveReport" },
        { name: "ProcessId", value: "TEST-REPORT-ID" },
      ],
    })

    aoTestUtils.assertSuccess(addReportResult.Messages[0])

    const infoResult = await ao.dryrun({
      process: dispatcherProcessId,
      tags: [{ name: "Action", value: "Info" }],
    })

    aoTestUtils.assertSuccess(infoResult.Messages[0])
    const processInfo = JSON.parse(infoResult.Messages[0].Data)
    assert.equal(processInfo.ReportIds.length, 0)
  })
})
