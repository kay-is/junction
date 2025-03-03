Name = "report-pages"

import * as Info from "../.common/handlers.info"
Handlers.add("Info", "Info", Info.info)

import * as Records from "../.common/handlers.records"
Handlers.add("GetRecords", "GetRecords", Records.getRecords)

import * as ReportUtils from "../.common/report.utilities"
import * as Calculate from "../.common/handlers.calculate"

export const extractUrlPath = (event: Record<"url", string>) =>
  "/" + event.url.split("/").splice(3).join("/")

ao.addAssignable("Calculate", { Action: "Calculate" })
Handlers.add(
  "Calculate",
  "Calculate",
  Calculate.createCalculateHandler({
    eventType: "pv",
    extractAggregationValue: extractUrlPath,
    calculateAdditionalMetrics: ({ record, event, session, records }) => {
      ReportUtils.increment(record, "sumLoadingTime", +event["j-lt"])

      if (record.entries === undefined) record.entries = 0
      if (record.exits === undefined) record.exits = 0

      const urlPath = extractUrlPath(event)

      // only count first page view as entry
      if (
        urlPath === session.firstItem.name &&
        session.firstItem.timestamp === event.ts
      )
        ReportUtils.increment(record, "entries")

      if (
        urlPath === session.lastItem.name &&
        session.lastItem.timestamp === event.ts
      ) {
        ReportUtils.increment(record, "exits")

        // if we had more than one page view, we must check if the exit page changed
        const nextToLastItem = session.nextToLastItem
        if (nextToLastItem !== undefined) {
          const timestampKey =
            "" + ReportUtils.roundToHour(nextToLastItem.timestamp)

          const recordWithPreviousExit =
            records[timestampKey]?.[nextToLastItem.name]

          // record could be deleted if it's too old
          if (recordWithPreviousExit !== undefined)
            ReportUtils.decrement(recordWithPreviousExit, "exits")
        }
      }
    },
  })
)
