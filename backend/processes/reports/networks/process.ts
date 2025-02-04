Name = "networks-report"

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
      let networks: string[] = []

      if (event.ar !== undefined) networks.push("Arweave")
      if (event.sol !== undefined) networks.push("Solana")
      if (event["eth-chain"] !== undefined) networks.push(event["eth-chain"])

      return networks
    },
    calculateAdditionalMetrics: ({ event, record }) => {
      ReportUtils.increment(record, "sumLoadingTime", +event["j-lt"])
    },
  })
)
