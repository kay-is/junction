Name = "gateways-report"

import * as Info from "../.common/handlers.info"
Handlers.add("Info", "Info", Info.info)

import * as Records from "../.common/handlers.records"
Handlers.add("GetRecords", "GetRecords", Records.getRecords)

import * as ReportUtils from "../.common/report.utilities"
import * as Calculate from "../.common/handlers.calculate"

const extractGatewayDomain = (event: Record<"url", string>) =>
  event.url.split("/")[2].split(".").splice(1).join(".")

ao.addAssignable("Calculate", { Action: "Calculate" })
Handlers.add(
  "Calculate",
  "Calculate",
  Calculate.createCalculateHandler({
    eventType: "pv",
    extractAggregationValue: extractGatewayDomain,
    calculateAdditionalMetrics: ({ event, record }) => {
      ReportUtils.increment(record, "sumLoadingTime", +event["j-lt"])
    },
  })
)
