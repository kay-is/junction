import assert from "assert"
import { describe, it } from "node:test"
import { acc, ArMem, connect } from "wao/test"
import * as AoTestUtils from "./utilities.js"

const mem = new ArMem()
const ao = connect(mem)

const NINETY_DAYS_IN_MS = 1000 * 60 * 60 * 24 * 90

describe("Junction", () => {
  let registryProcessId
  describe("registry owner", () => {
    const registryOwner = acc[0]
    const aoTestUtilsRegistry = AoTestUtils.init(mem, ao, registryOwner.signer)
    it("spawns the registry", async () => {
      const result = await aoTestUtilsRegistry.initProcess("build/registry.lua")

      assert.equal(result.error, undefined)
      assert.equal(result.processId.length, 43)

      registryProcessId = result.processId
    })
  })

  let dispatcherProcessId
  let accountProcessId
  let reportProcessId
  describe("account owner", () => {
    const accountOwner = acc[1]
    const aoTestUtilsAccount = AoTestUtils.init(mem, ao, accountOwner.signer)

    it("spawns a dispatcher", async () => {
      const result = await aoTestUtilsAccount.initProcess(
        "build/dispatcher.lua"
      )

      assert.equal(result.error, undefined)
      assert.equal(result.processId.length, 43)

      dispatcherProcessId = result.processId
    })

    it("spawns an account", async () => {
      const result = await aoTestUtilsAccount.initProcess("build/account.lua", {
        Name: "TEST-ACCOUNT",
        Description: "TEST-DESCRIPTION",
        DispatcherId: dispatcherProcessId,
        RegistryId: registryProcessId,
      })

      assert.equal(result.error, undefined)
      assert.equal(result.processId.length, 43)

      accountProcessId = result.processId
    })

    it("adds account to dispatcher", async () => {
      const result = await aoTestUtilsAccount.messageResult({
        process: dispatcherProcessId,
        signer: accountOwner.signer,
        tags: [
          { name: "Action", value: "SetAccount" },
          { name: "ProcessId", value: accountProcessId },
        ],
      })

      aoTestUtilsAccount.assertSuccess(result.Messages[0])
    })

    it("spawns a report", async () => {
      const result = await aoTestUtilsAccount.initProcess(
        "build/top-pages-report.lua",
        {
          DispatcherId: dispatcherProcessId,
          RecordsMaxAge: "" + NINETY_DAYS_IN_MS,
        }
      )

      assert.equal(result.error, undefined)
      assert.equal(result.processId.length, 43)

      reportProcessId = result.processId
    })

    it("adds report to dispatcher", async () => {
      const result = await aoTestUtilsAccount.messageResult({
        process: dispatcherProcessId,
        signer: accountOwner.signer,
        tags: [
          { name: "Action", value: "AddReport" },
          { name: "ProcessId", value: reportProcessId },
        ],
      })

      const replyMessage = result.Messages.find(
        (m) => m.Target === accountOwner.addr
      )
      aoTestUtilsAccount.assertSuccess(replyMessage)

      const infoResult = await ao.dryrun({
        process: dispatcherProcessId,
        tags: [{ name: "Action", value: "Info" }],
      })

      aoTestUtilsAccount.assertSuccess(infoResult.Messages[0])
      const accountInfo = JSON.parse(infoResult.Messages[0].Data)
      assert.equal(accountInfo.ReportIds.length, 1)
      assert.equal(accountInfo.ReportIds[0], reportProcessId)
    })

    it("adds report to account", async () => {
      const result = await aoTestUtilsAccount.messageResult({
        process: accountProcessId,
        signer: accountOwner.signer,
        tags: [
          { name: "Action", value: "AddReport" },
          { name: "Name", value: "top-pages" },
          { name: "ProcessId", value: reportProcessId },
        ],
      })

      const replyMessage = result.Messages.find(
        (m) => m.Target === accountOwner.addr
      )
      aoTestUtilsAccount.assertSuccess(replyMessage)

      const infoResult = await ao.dryrun({
        process: accountProcessId,
        tags: [{ name: "Action", value: "Info" }],
      })

      aoTestUtilsAccount.assertSuccess(infoResult.Messages[0])
      const accountInfo = JSON.parse(infoResult.Messages[0].Data)
      assert.equal(accountInfo.Reports.length, 1)
      assert.equal(accountInfo.Reports[0].name, "top-pages")
      assert.equal(accountInfo.Reports[0].processId, reportProcessId)
    })
  })

  describe("user", () => {
    const user = acc[2]
    const aoTestUtilsUser = AoTestUtils.init(mem, ao, user.signer)

    it("sends 3 Track messages to dispatcher", async () => {
      const sendEvent = async () =>
        await aoTestUtilsUser.messageResult({
          process: dispatcherProcessId,
          signer: user.signer,
          tags: [
            { name: "Action", value: "Track" },
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

      await sendEvent()
      await sendEvent()
      await sendEvent()

      const dispatcherInfoResult = await ao.dryrun({
        process: dispatcherProcessId,
        tags: [{ name: "Action", value: "Info" }],
      })

      aoTestUtilsUser.assertSuccess(dispatcherInfoResult.Messages[0])
      const dispatcherInfo = JSON.parse(dispatcherInfoResult.Messages[0].Data)
      assert.equal(dispatcherInfo.AssignedEventCount, 3)

      const reportInfoResult = await ao.dryrun({
        process: reportProcessId,
        tags: [{ name: "Action", value: "Info" }],
      })

      aoTestUtilsUser.assertSuccess(reportInfoResult.Messages[0])
      const reportInfo = JSON.parse(reportInfoResult.Messages[0].Data)
      assert.equal(reportInfo.ProcessedEventCount, 3)
      assert.equal(reportInfo.ActiveRecords, 1)
      assert.equal(reportInfo.ActiveSessions, 1)
    })

    it("sends GetRecord dryrun to top-pages report", async () => {
      const result = await ao.dryrun({
        process: reportProcessId,
        tags: [
          { name: "Action", value: "GetRecords" },
          { name: "Start", value: "0" },
          { name: "Stop", value: "" + Date.now() },
        ],
      })

      aoTestUtilsUser.assertSuccess(result.Messages[0])

      const records = JSON.parse(result.Messages[0].Data)

      const recordArray = Object.entries(records)
      assert.equal(recordArray.length, 1)
      assert.equal(recordArray[0][1]["https://example.com/"].pageViews, 3)
      assert.equal(recordArray[0][1]["https://example.com/"].visitors, 1)
    })
  })
})
