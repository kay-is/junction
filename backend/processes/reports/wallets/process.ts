Name = "wallets-report"

import * as Info from "../.common/handlers.info"
Handlers.add("Info", "Info", Info.info)

import * as Records from "../.common/handlers.records"
Handlers.add("GetRecords", "GetRecords", Records.getRecords)

import * as ReportUtils from "../.common/report.utilities"
import * as Calculate from "../.common/handlers.calculate"
ao.addAssignable("Calculate", { Action: "Calculate" })
Handlers.add(
  "Calculate",
  "Calculate",
  Calculate.createCalculateHandler({
    eventType: "pv",
    extractAggregationValue: (event) => {
      let wallets: string[] = []

      if (event.eth !== undefined) wallets.push("EVM")
      if (event.sol !== undefined) wallets.push("Solana")
      if (event.ar !== undefined) wallets.push("Arweave")

      return wallets
    },
    calculateAdditionalMetrics: ({ event, record }) => {
      ReportUtils.increment(record, "sumLoadingTime", +event["j-lt"])
    },
  })
)
