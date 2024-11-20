--[[
  # Top Pages Worker 

  This worker module is responsible for tracking the top pages visited by users.
  It listens for Track events and aggregates the page views by the hour. 

  ## Required spawn tags:

  - Name: The name of the worker
  - EventType: The event type to listen for
  - EventKey: The event key to listen for
]]

---------- IMPORTS ----------

global json = require("json")

---------- GLOBALS  ----------

local enum EventKeys
  "url"
end

global Name = ao.env.Process.Tags.Name
global EventType = ao.env.Process.Tags.EventType
global EventKey = ao.env.Process.Tags.EventKey as EventKeys
global DispatcherId = ao.env.Process.Tags.DispatcherId
 
global ProcessedEvents = 0

local record Record
  pageViews: integer
  visitors: integer
end

global Records: {string: {string: Record}} 
Records = Records or {}

local record Event
  ad: string -- Arweave wallet address
  ts: integer -- timestamp
  ev: string -- event name
  url: string
end

---------- UTILITIES ----------

local function dispatcherOnly(handler: function): function
  return function(message: ReceivedMessage)
    if message.From ~= DispatcherId and message.From ~= Owner and message.From ~= ao.id then
      return
    end
    local ok, err = pcall(handler, message)
    if not ok then
      message.reply({Tags = {Error = err as string}})
    end
  end
end

-- convert tag values from string to the correct type
local function convertToEvent(message: ReceivedMessage): Event
  return {
    ad = message.Tags.ad,
    ts = tonumber(message.Tags.ts) as integer,
    ev = message.Tags.ev,
    url = message.Tags.url,
  }
end

---------- PUBLIC HANDLERS ----------

Handlers.add(
  "Info", "Info",
  function(message: ReceivedMessage)
    message.reply({
      Data = json.encode({
        Name = Name,
        EventType = EventType,
        EventKey = EventKey,
        ProcessedEvents = ProcessedEvents,
        MemoryUsed = collectgarbage("count")
      })
    })
  end
)

---------- PROTECTED HANDLERS ----------
-- Only handle messages from the dispatcher

ao.addAssignable("Calculate", {Action = "Calculate"})
Handlers.add(
  "Calculate", "Calculate",
  dispatcherOnly(function(message: ReceivedMessage)
    local event = convertToEvent(message)

    -- tracking is aggregated by the hour
    local hourlyTimestamp = math.floor(event.ts / 1000 / 60 / 60) * 60 * 60 * 1000
    -- tables need string keys to be serialized
    local hourlyTimestampKey = "" .. hourlyTimestamp

    local recordsOfOneHour = Records[hourlyTimestampKey]

    if not recordsOfOneHour then
      recordsOfOneHour = {}
      Records[hourlyTimestampKey] = recordsOfOneHour
    end 

    local rec = recordsOfOneHour[event[EventKey]]
   
    if not rec then
      rec = {pageViews = 0}
    end

    rec.pageViews = rec.pageViews + 1

    recordsOfOneHour[event[EventKey]] = rec
    ProcessedEvents = ProcessedEvents + 1
  end)
)

-- Get records for a specific period
Handlers.add(
  "Get-Records", "Get-Records",
  function(message: ReceivedMessage)
    if not message.Tags.Start or not message.Tags.Stop then
      return message.reply({Tags = {Error = "Missing Start or Stop timestamp"}})
    end

    local start = tonumber(message.Tags.Start) as integer
    local stop = tonumber(message.Tags.Stop) as integer

    local result = {}
    for ts, records in pairs(Records) do
      local timestamp = tonumber(ts) as integer
      if timestamp >= start and timestamp <= stop then
        result[ts] = records
      end
    end

    message.reply({
      Data = json.encode(result),
      Tags = {Success = "Records retrieved"}
    })
  end
)