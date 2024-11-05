import { readFileSync } from "node:fs"
import * as AoClient from "@permaweb/aoconnect"

console.log("Updating account code...")

const wallet = JSON.parse(readFileSync("wallet.json").toString())
const processId = readFileSync("process-id").toString()
const accountCode = readFileSync("src/account.lua").toString()

console.log("Process: " + processId)

const messageId = await AoClient.message({
  process: processId,
  tags: [{ name: "Action", value: "Set-Account-Code" }],
  signer: AoClient.createDataItemSigner(wallet),
  data: accountCode,
})

console.log("Message: " + messageId)
console.log("Waiting for result...")

const result = await AoClient.result({
  process: processId,
  message: messageId,
})

const status = result.Messages.pop().Tags.find((tag) => tag.name === "Status")

if (status.value === "Success")
  console.log("Account code updated successfully!")
