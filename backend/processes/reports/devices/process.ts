Name = "devices"

import * as Info from "../common/handlers.info"
Handlers.add("Info", "Info", Info.info)

import * as Records from "../common/handlers.records"
Handlers.add("GetRecords", "GetRecords", Records.getRecords)

import * as Calculate from "../common/handlers.calculate"
ao.addAssignable("Calculate", { Action: "Calculate" })
Handlers.add(
  "Calculate",
  "Calculate",
  Calculate.createCalculateHandler({
    eventType: "pv",
    extractAggregationValue: (event) => {
      if (!event.ua) return "other"

      const userAgent = event.ua.toLowerCase()

      if (userAgent.includes("iphone")) return "iphone"
      if (userAgent.includes("ipad")) return "ipad"
      if (userAgent.includes("android")) return "android"
      if (userAgent.includes("windows nt")) return "windows"
      if (userAgent.includes("macintosh")) return "macos"
      if (userAgent.includes("linux")) return "linux"

      return "other"
    },
    calculateAdditionalMetrics: (record, event) => {
      if (event["j-lt"] !== undefined) return
      if (record.sumLoadingTime === undefined) record.sumLoadingTime = 0
      record.sumLoadingTime += event["j-lt"]
    },
  })
)
