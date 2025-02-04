import * as Utils from "../../.common/utilities"

export type RecordsType<T> = Record<string, Record<string, T>>
declare const Records: RecordsType<unknown>

export type GetRecordsResponse = RecordsType<unknown>

export const getRecords = Utils.createHandler({
  requiredTags: ["Start", "Stop"],
  handler: (message): RecordsType<unknown> => {
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
      }, {} as RecordsType<unknown>)
  },
})
