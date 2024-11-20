---------- IMPORTS ----------

local json = require("json")

---------- GLOBALS ----------

global Name: string
Name = Name or ao.env.Process.Tags.Name

global AccountId: string
AccountId = AccountId or ""

local record Report
  name: string
  processId: string
  eventType: string
end

global Reports: {Report} 
Reports = Reports or {}

global AssignedEventCount: integer 
AssignedEventCount = AssignedEventCount or 0

---------- UTILITIES ----------

local function accountOnly(handler: function): function
  return function(message: ReceivedMessage)
    if message.From ~= AccountId and message.From ~= Owner and message.From ~= ao.id then
      return message.reply({Tags = {Error = "Unauthorized"}})
    end
    handler(message)
  end
end

---------- PUBLIC HANDLERS ----------

Handlers.add(
  "Info", "Info",
  function(message: ReceivedMessage)
    local info = {
      Name = Name,
      AccountId = AccountId,
      Reports = Reports,
      AssignedEventCount = AssignedEventCount,
      MemoryUsed = collectgarbage("count")
    }

    message.reply({
      Data = json.encode(info),
      Tags = {
        ["Content-Type"] = "application/json",
        Success = "Info retrieved",
      }
    })
  end
)

Handlers.add(
  "Track", "Track",
  function (message: ReceivedMessage)
    local tags = message.Tags
    tags.Action = "Calculate"

    -- TODO: sanitize tag values

    ao.send({Target = ao.id, Tags = tags})
  end
)
-- ensures assigned messages comes from this process and have the right action
Handlers.add(
  "Calculate", "Calculate", 
  function(message: ReceivedMessage)
  if(message.From ~= ao.id) then
    return
  end

  local affectedReportProcessIds = {}
  for _, report in ipairs(Reports) do
    if report.eventType == message.Tags.ev then
      table.insert(affectedReportProcessIds, report.processId)
    end
  end

  if #affectedReportProcessIds > 0 then
    -- Using assign to avoid message duplication
    ao.assign({ 
      Processes = affectedReportProcessIds, 
      Message = message.Id
    })
    AssignedEventCount = AssignedEventCount + #affectedReportProcessIds
  end
end)

---------- PROTECTED HANDLERS ----------

Handlers.add("Set-Account", "Set-Account", 
  accountOnly(function(message: ReceivedMessage)
    if not message.Tags.AccountId then
      return message.reply({Tags = {Error = "AccountId tag required"}})
    end

    AccountId = message.Tags.AccountId
    message.reply({Tags = {Success = "Account set"}})
  end)
)

Handlers.add(
  "Add-Report", "Add-Report",
  accountOnly(function (message: ReceivedMessage)
    if not message.Tags.Name then 
      return message.reply({Tags = {Error = "Name tag required"}})
    end

    if not message.Tags.ProcessId then 
      return message.reply({Tags = {Error = "ProcessId tag required"}})
    end

    if not message.Tags.EventType then 
      return message.reply({Tags = {Error = "EventType tag required"}})
    end

    local report: Report = {
      name = message.Tags.Name,
      processId = message.Tags.ProcessId,
      eventType = message.Tags.EventType
    }

    table.insert(Reports, report)

    message.reply({Tags = {Success = "Report added"}})
  end)
)

Handlers.add(
  "Remove-Report", "Remove-Report",
  accountOnly(function (message: ReceivedMessage)
    if not message.Tags.Name then 
      return message.reply({Tags = {Error = "Name is required"}})
    end

    for i, report in ipairs(Reports) do
      if report.name == message.Tags.Name then
        table.remove(Reports, i)
        break
      end
    end

    message.reply({Tags = {Success = "Report removed"}})
  end)
)
