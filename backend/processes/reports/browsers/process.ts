Name = "browsers-report"

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
      if (!event.ua) return "other"

      const userAgent = event.ua.toLowerCase()

      if (userAgent.includes("opr/") || userAgent.includes("opera"))
        return "opera"
      if (userAgent.includes("edg/") || userAgent.includes("edge"))
        return "edge"
      if (userAgent.includes("firefox") || userAgent.includes("fxios"))
        return "firefox"
      if (userAgent.includes("chrome")) return "chrome"
      if (userAgent.includes("safari")) return "safari"
      if (userAgent.includes("trident") || userAgent.includes("msie"))
        return "ie"

      return "other"
    },
    calculateAdditionalMetrics: ({ event, record }) => {
      ReportUtils.increment(record, "sumLoadingTime", +event["j-lt"])
    },
  })
)
