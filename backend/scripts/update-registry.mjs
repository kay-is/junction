import { readFileSync } from "node:fs"
import * as AoClient from "@permaweb/aoconnect"

console.log("Updating registry code...")

const wallet = JSON.parse(readFileSync("wallet.json").toString())
const processId = readFileSync("process-id").toString()
const registryCode = readFileSync("src/registry.lua").toString()

console.log("Process: " + processId)

const messageId = await AoClient.message({
  process: processId,
  tags: [{ name: "Action", value: "Eval" }],
  signer: AoClient.createDataItemSigner(wallet),
  data: registryCode,
})

console.log("Message: " + messageId)
console.log("Waiting for result...")

const result = await AoClient.result({
  message: messageId,
  process: processId,
})

const status = result.Messages.pop().Tags.find((tag) => tag.name === "Status")

if (status.value === "Success")
  console.log("Registry code updated successfully!")
