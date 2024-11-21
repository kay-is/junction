---------- IMPORTS ----------

global json = require("json")

---------- GLOBALS  ----------

global Name = ao.env.Process.Tags.Name
global DispatcherId = ao.env.Process.Tags.DispatcherId
global RecordsMaxAge = tonumber(ao.env.Process.Tags.RecordsMaxAge) as integer
 
global ProcessedEvents = 0

local record Session
  id: string 
  start: integer
  pages: {string:boolean}
  firstPage: {string:integer} -- url -> timestamp
end

global Sessions: {string: Session}
Sessions = Sessions or {}
global ActiveSessions = 0

local record Record
  pageViews: integer
  visitors: integer
  web3visitors: integer
  singleViewVisitor: integer
  bounceRate: number
  sumLoadingTime: integer
  avgLoadingTime: integer
end

global Records: {string: {string: Record}} 
Records = Records or {}

local record Event
  ad: string -- Arweave wallet address
  ts: integer -- timestamp
  ev: string -- event name
  url: string
  ["j-lt"]: integer
  eth: string -- Ethereum wallet name
  sol: string -- Solana wallet name
  ar: string -- Arweave wallet name
end

---------- UTILITIES ----------

local function roundTimestampToHour(timestamp: integer): integer
  return math.floor(timestamp / 1000 / 60 / 60) * 60 * 60 * 1000
end

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
    eth = message.Tags.eth,
    sol = message.Tags.sol,
    ar = message.Tags.ar,
    ["j-lt"] = tonumber(message.Tags["j-lt"]) as integer
  }
end

local function getSession(event: Event): Session
  local session = Sessions[event.ad]

  if not session then
    session = {
      id = event.ad,
      start = event.ts,
      pages = {},
      firstPage = {}
    }
    Sessions[event.ad] = session
    ActiveSessions = ActiveSessions + 1
  end

  local thirtyMinutesInMs = 30 * 60 * 1000
  for id, s in pairs(Sessions) do
    if event.ts - s.start > thirtyMinutesInMs then
      Sessions[id] = nil
      ActiveSessions = ActiveSessions - 1
    end
  end

  return session
end

local function getRecord(event: Event): Record
  -- tracking is aggregated by the hour
  local hourlyTimestamp = roundTimestampToHour(event.ts)
  -- tables need string keys to be serialized
  local hourlyTimestampKey = "" .. hourlyTimestamp

  local recordsOfOneHour = Records[hourlyTimestampKey]

  if not recordsOfOneHour then
    recordsOfOneHour = {}
    Records[hourlyTimestampKey] = recordsOfOneHour
  end 

  local rec: Record = recordsOfOneHour[event.url]
   
  if not rec then
    rec = {
      pageViews = 0,
      visitors = 0,
      singleViewVisitor = 0,
      web3visitors = 0,
      bounceRate = 0,
      sumLoadingTime = 0,
      avgLoadingTime = 0
    }
    recordsOfOneHour[event.url] = rec
  end

  return rec
end

local function clearOldRecords()
  local oldestTimestamp = os.time() - RecordsMaxAge

  for ts, _ in pairs(Records) do
    if tonumber(ts) < oldestTimestamp then
      Records[ts] = nil
    end
  end
end

---------- PUBLIC HANDLERS ----------

Handlers.add(
  "Info", "Info",
  function(message: ReceivedMessage)
    message.reply({
      Data = json.encode({
        Name = Name,
        ProcessedEvents = ProcessedEvents,
        ActiveSessions = ActiveSessions,
        DispatcherId = DispatcherId,
        RecordsMaxAge = RecordsMaxAge,
        MemoryUsed = collectgarbage("count")
      }),
      Tags = {["Content-Type"] = "application/json"}
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
    local session = getSession(event)
    local rec = getRecord(event)

    if event.ev ~= "pv" then
      return
    end

    rec.pageViews = rec.pageViews + 1
    
    rec.sumLoadingTime = rec.sumLoadingTime + event["j-lt"]
    rec.avgLoadingTime = math.floor(rec.sumLoadingTime / rec.pageViews)

    -- one view of the page per session is a visitor
    if not session.pages[event.url] then
      rec.visitors = rec.visitors + 1

      if event.eth or event.sol or event.ar then
        rec.web3visitors = rec.web3visitors + 1
      end

      session.pages[event.url] = true
    end

    -- a session with only one page view is a single view visitor
    if not session.firstPage[event.url] then
      session.firstPage[event.url] = event.ts
      rec.singleViewVisitor = rec.singleViewVisitor + 1
    else
      -- if the session has more than one page view, it is not a single view visitor
      local firstViewTimestamp = roundTimestampToHour(session.firstPage[event.url])
      local firstView: Record = nil 
      for ts, records in pairs(Records) do
        if tonumber(ts) == firstViewTimestamp then
          firstView = records[event.url]
          if firstView.singleViewVisitor > 0 then
            firstView.singleViewVisitor = firstView.singleViewVisitor - 1
          end
          break
        end
      end
    end

    if rec.visitors > 0 then
      rec.bounceRate = (rec.singleViewVisitor / rec.visitors) * 100
    end

    clearOldRecords()

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
      Tags = {["Content-Type"] = "application/json"}
    })
  end
)