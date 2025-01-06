import * as fs from "node:fs"
import concurrently from "concurrently"

const processNames = fs
  .readdirSync("processes")
  .filter((file) => file !== "common" && file !== "reports")

const reportProcessNames = fs
  .readdirSync("processes/reports")
  .filter((file) => file !== "common")
  .map((file) => `reports/${file}`)

const commands = [...processNames, ...reportProcessNames].map(
  (file) => `cd processes/${file} && tstl`
)

await concurrently(commands).result

fs.readdirSync("build").forEach((file) => {
  const stats = fs.statSync(`build/${file}`)
  console.log(`build/${file} ${Math.ceil(stats.size / 1024)}KB`)
})
