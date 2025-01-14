import * as Utils from "../../common/utilities"
import type { RecordsType } from "./handlers.calculate"

// Global defined in handlers.calculate.ts
declare const Records: RecordsType

export type GetRecordsResponse = RecordsType

export const getRecords = Utils.createHandler({
  requiredTags: ["Start", "Stop"],
  handler: (message): GetRecordsResponse => {
    const start = parseInt(message.Tags.Start)
    const stop = parseInt(message.Tags.Stop)

    return Object.entries(Records)
      .filter(([timestampKey]) => {
        const timestamp = parseInt(timestampKey)
        return timestamp >= start && timestamp <= stop
      })
      .reduce<RecordsType>((acc, [timestamp, recordsOfOneHour]) => {
        acc[timestamp] = recordsOfOneHour
        return acc
      }, {})
  },
})
