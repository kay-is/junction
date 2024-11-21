---------- IMPORTS ----------

local json = require("json")

---------- GLOBALS ----------

global Name: string
Name = Name or ao.env.Process.Tags.Name

global AccountId: string
AccountId = AccountId or ""

global Reports: {string}
Reports = Reports or {}

global AssignedEventCount: integer 
AssignedEventCount = AssignedEventCount or 0

global record ReportError 
  timestamp: integer 
  message: string
  processId: string
end

global ReportErrors: {ReportError}
ReportErrors = ReportErrors or {}

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
      ReportErrors = ReportErrors,
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
--[[
  The reports only accept messages from the dispatcher, so the dispatcher
  receives client messages and distributes them by sending them to itself and 
  then assinging the new message to the reports.
]]
Handlers.add(
  "Track", "Track",
  function (message: ReceivedMessage)
    local tags = message.Tags

    tags.Action = "Calculate"
    -- as the dispatcher forwards the message to the reports, 
    -- the report needs a way to know who sent the message
    tags.ad = message.From

    if #Reports > 0 then
      ao.send({Target = ao.id, Tags = tags})
    end
  end
)

Handlers.add(
  "Calculate", "Calculate", 
  function(message: ReceivedMessage)
  if(message.From ~= ao.id) then
    return
  end

  -- Using assign to avoid message duplication
  ao.assign({Processes = Reports, Message = message.Id})
  AssignedEventCount = AssignedEventCount + #Reports
end)

---------- PROTECTED HANDLERS ----------

Handlers.add(
  "Store-Report-Error", {Error = "_"}, 
  function(message: ReceivedMessage)
    for _, processId in ipairs(Reports) do
      if processId == message.From then
        table.insert(ReportErrors, {
          timestamp = os.time(),
          message = message.Tags.Error,
          processId = message.From
        })

        if #ReportErrors > 100 then
          table.remove(ReportErrors, 1)
        end
        break
      end
    end
  end
)

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
    if not message.Tags.ProcessId then 
      return message.reply({Tags = {Error = "ProcessId tag required"}})
    end

    table.insert(Reports, message.Tags.ProcessId)

    message.reply({Tags = {Success = "Report added"}})
  end)
)

Handlers.add(
  "Remove-Report", "Remove-Report",
  accountOnly(function (message: ReceivedMessage)
    if not message.Tags.ProcessId then 
      return message.reply({Tags = {Error = "ProcessId tag required"}})
    end

    for i, processId in ipairs(Reports) do
      if processId == message.Tags.ProcessId then
        table.remove(Reports, i)
        break
      end
    end

    message.reply({Tags = {Success = "Report removed"}})
  end)
)
