Name = "top-pages"

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
      const urlWithoutDomain = "/" + event.url.split("/").splice(3).join("/")
      return urlWithoutDomain
    },
    calculateAdditionalMetrics: (record, event) => {
      if (event["j-lt"] === undefined) return
      if (record.sumLoadingTime === undefined) record.sumLoadingTime = 0

      record.sumLoadingTime += +event["j-lt"]
    },
  })
)
