local json = require("json")

Name = Name or "Junction-Registry"
AccountCode = AccountCode or ""
Accounts = Accounts or {}

function Protected(handler)
  return function(message)
    if message.From ~= Owner then
      return message.reply({ Status = "Error", Error = "Unauthorized" })
    end
    handler(message)
  end
end

Handlers.add("info",
  { Action = "Info" },
  function(message)
    message.reply({ Status = "Success", Data = { Name = Name } })
  end
)

---------- Account Code Management ----------

Handlers.add("setAccountCode",
  { Action = "Set-Account-Code" },
  Protected(function(message)
    AccountCode = message.Data
    message.reply({ Status = "Success" })
  end)
)

---------- Account Management ----------

Handlers.add("listAccounts",
  { Action = "List-Accounts" },
  function(message)
    message.reply({ Status = "Success", Data = json.encode(Accounts) })
  end
)

Handlers.add("addAccount",
  { Action = "Add-Account" },
  function(message)
    if not message.Tags.AccountName then
      return message.reply({ Status = "Error", Error = "AccountName is required" })
    end

    if Accounts[message.Tags.AccountName] then
      return message.reply({ Status = "Error", Error = "Account already exists" })
    end

    local account = {
      Name = message.Tags.AccountName,
      Status = "spawning",
      Creator = message.From
    }

    Accounts[account.Name] = account

    message.reply({ Status = "Success", Data = json.encode(account) })

    local spawnResponse = Spawn(ao.env.Module.Id, {
      Tags = {
        Name = account.Name,
        Authority = ao.authorities[1],
        Creator = message.From
      }
    }).receive()

    account.ProcessId = spawnResponse.Process
    account.Status = "initializing"

    Handlers.once("account-ready-" .. spawnResponse.Process,
      { From = spawnResponse.Process, Action = "Account-Ready" },
      function()
        account.Status = "ready"
      end
    )

    Send({
      Target = spawnResponse.Process,
      Action = "Eval",
      Data = AccountCode
    })
  end
)

Handlers.add("getAccount",
  { Action = "Get-Account" },
  function(message)
    local account

    if not message.Tags.AccountName and not message.Tags.UserAddress then
      return message.reply({ Status = "Error", Error = "AccountName or UserAddress is required" })
    end

    if message.Tags.AccountName then
      account = Accounts[message.Tags.AccountName]
    end

    if message.Tags.UserAddress then
      for _, a in pairs(Accounts) do
        if a.Creator == message.Tags.UserAddress then
          account = a
          break
        end
      end
    end

    if not account then
      return message.reply({ Status = "Error", Error = "Account not found" })
    end

    message.reply({ Status = "Success", Data = json.encode(account) })
  end
)

Send({ Target = Owner, Action = "Registry-Ready", Status = "Success" })
