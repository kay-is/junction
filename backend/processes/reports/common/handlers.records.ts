import * as Utils from "../../common/utilities"

type RecordsType = Record<string, Record<string, unknown>>
declare const Records: RecordsType

export const getRecords = Utils.createHandler({
  requiredTags: ["Start", "Stop"],
  handler: (message): RecordsType => {
    const start = parseInt(message.Tags.Start)
    const stop = parseInt(message.Tags.Stop)

    return Object.entries(Records)
      .filter(([timestampKey]) => {
        const timestamp = parseInt(timestampKey)
        return timestamp >= start && timestamp <= stop
      })
      .reduce((acc, [timestamp, recordsOfOneHour]) => {
        acc[timestamp] = recordsOfOneHour
        return acc
      }, {} as RecordsType)
  },
})
