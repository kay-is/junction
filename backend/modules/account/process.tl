---------- IMPORTS ----------

local json = require("json")

---------- GLOBALS ----------

global Name: string
Name = ao.env.Process.Tags.Name

global Description: string
Description = ao.env.Process.Tags.Description

global Members: {string: string} -- {address: name}
Members = {[ao.env.Process.Tags.Creator] = "Creator"}

global DispatcherId: string 
DispatcherId = ao.env.Process.Tags.DispatcherId

local enum ReportStatus
  "pending"
  "ready"
end

local record Report
  name: string
  processId: string | nil
  status: ReportStatus
end

global Reports: {string:Report} 
Reports = Reports or {}

---------- UTILITIES ----------

local function membersOnly(handler: function): function
  return function(message: ReceivedMessage)
    if not Members[message.From] and message.From ~= Owner and message.From ~= ao.id then
      return message.reply({Tags = {Error = "Unauthorized"}})
    end
    handler(message)
  end
end

---------- PUBLIC HANDLERS ----------

local record AccountInfo
  Name: string
  Description: string
  DispatcherId: string 
  Members: {string: string}
  Reports: {string: Report}
  MemoryUsage: number
end

Handlers.add(
  "Info", "Info", 
  function(message: ReceivedMessage)
    local info: AccountInfo = {
      Name = Name,
      Description = Description,
      DispatcherId = DispatcherId,
      Reports = Reports,
      Members = Members,
      MemoryUsage = collectgarbage("count")
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
  "Update-Info", "Update-Info", 
  membersOnly(
    function(message: ReceivedMessage)
      if not message.Data then
        return message.reply({Tags = {Error = "Missing Data"}})
      end

      local infoUpdate = json.decode(message.Data) as AccountInfo 

      if infoUpdate.Name then
        Name = infoUpdate.Name
      end

      if infoUpdate.Description then
        Description = infoUpdate.Description
      end

      if infoUpdate.Members then
        Members = infoUpdate.Members

        local memberAddresses = {}
        for address, _ in pairs(Members) do
          table.insert(memberAddresses, address)
        end

        ao.send({
          Target = Owner, -- Junction registry
          Data = json.encode(memberAddresses), 
          Tags = {Action = "Update-Account-Members"}
        })
      end

      local newInfo: AccountInfo = {
        Name = Name, 
        Description = Description,
        DispatcherId = DispatcherId,
        Members = Members, 
        MemoryUsage = collectgarbage("count")
      }

      message.reply({
        Data = json.encode(newInfo),
        Tags = {
          ["Content-Type"] = "application/json",
          Success = "Info retrieved",
        }
      })
    end
  )
)

---------- PROTECTED HANDLERS ----------

Handlers.add(
  "Add-Report", "Add-Report",
  membersOnly(function (message: ReceivedMessage)
    if not message.Tags.CodeTxId then 
      return message.reply({Tags = {Error = "CodeTxId is required"}})
    end

    if not message.Tags.Name then 
      return message.reply({Tags = {Error = "Name is required"}})
    end

    if not message.Tags.RecordsMaxAge then 
      return message.reply({Tags = {Error = "RecordsMaxAge is required"}})
    end

    local report: Report = {name = message.Tags.Name, status = "pending"}

    Reports[message.Tags.Name] = report

    message.reply({Tags = {Success = "Report starting: " .. message.Tags.Name}})

    local spawnReply = ao.spawn(ao.env.Module.Id, { 
      ["On-Boot"] = message.Tags.CodeTxId,
      Tags = {
        Authority = ao.authorities[1],
        Name = message.Tags.Name,
        DispatcherId = DispatcherId,
        RecordsMaxAge = message.Tags.RecordsMaxAge
      }
    }).receive()

    report.processId = spawnReply.Process 
    
    ao.send({
      Target = DispatcherId,
      Tags = {
        Action = "Add-Report",
        ProcessId = report.processId,
      }
    }).receive()

    report.status = "ready"
  end)
)

Handlers.add(
  "Remove-Report", "Remove-Report",
  membersOnly(function (message: ReceivedMessage)
    if not message.Tags.Name then
      return message.reply({Tags = {Error = "Name is required"}})
    end

    local report = Reports[message.Tags.Name]
    if report then
      Reports[message.Tags.Name] = nil

      message.reply({Tags = {Success = "Report removed: " .. message.Tags.Name}})

      ao.send({
        Target = DispatcherId,
        Tags = {
          Action = "Remove-Report",
          ProcessId = report.processId
        }
      })
      return 
    end

    message.reply({Tags = {Error = "Report not found"}})
  end)
)