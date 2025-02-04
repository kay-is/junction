import * as json from "json"

export const extractUrlPath = (event: Record<"url", string>) =>
  "/" + event.url.split("/").splice(3).join("/")

export const increment = (
  record: Record<string, number>,
  key: string,
  by = 1
) => (record[key] = (record[key] || 0) + by)

export const decrement = (
  record: Record<string, number>,
  key: string,
  by = 1
) => (record[key] = Math.max((record[key] || 0) - by, 0))

export const roundToHour = (timestamp: number): number =>
  Math.floor(timestamp / 3600000) * 3600000

export const debug = (message: any) =>
  ao.send({ Target: "DEBUG", Data: json.encode(message) })
