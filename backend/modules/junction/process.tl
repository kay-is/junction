---------- IMPORTS ----------

local json = require("json")

---------- GLOBALS ----------

local record JunctionInfo 
  Name: string
  AccountCodeTxId: string
  DispatcherCodeTxId: string
  MemoryUsage: number
end

global Name: string
Name = "Junction-Registry"

global AccountCodeTxId: string
AccountCodeTxId = "_ACCOUNT_CODE_TXID_"

global DispatcherCodeTxId: string
DispatcherCodeTxId = "_DISPATCHER_CODE_TXID_"

local enum AccountStatus
  "pending"
  "ready"
end

local record Account
  name: string
  id: string
  members: {string}
  status: AccountStatus
end

global Accounts: {Account}
Accounts = Accounts or {}

---------- UTILITIES ----------

local function ownerOnly(handler: function): function
  return function(message: ReceivedMessage)
    if message.From ~= Owner or message.From ~= ao.id then
      return message.reply({ Tags = { Error = "Unauthorized" } })
    end
    handler(message)
  end
end

local function getInfoJson() : string
  return json.encode({
    Name = Name,
    AccountCodeTxId = AccountCodeTxId,
    DispatcherCodeTxId = DispatcherCodeTxId,
    MemoryUsage = collectgarbage("count")
  })
end

----------- PUBLIC HANDLERS -----------

Handlers.add(
  "Info", "Info",
  function(message: ReceivedMessage)
    message.reply({
      Data = getInfoJson(),
      Tags = {
        Success = "Retrieved Info",
        ["Content-Type"] = "application/json"
      }
    })
  end
)

Handlers.add(
  "Register-Account", "Register-Account",
  function(message: ReceivedMessage)
    if not message.Tags.Name then
      return message.reply({ Tags = { Error = "Name tag is required" } }) 
    end

    local accountName = message.Tags.Name

    local log = function(m: string)
      print("[Register-Account: " .. accountName .. "] " .. m)
    end

    log("Starting...")

    local newAccount: Account = {
      name = message.Tags.Name,
      members = {message.From},
      status = "pending"
    }

    table.insert(Accounts, newAccount)

    message.reply({
      Data = json.encode(newAccount), 
      Tags = {
        Success = "Registering account",
        ["Content-Type"] = "application/json"
      }
    })

    log("Waiting for dispatcher process...")

    local dispatcherSpawnReply = ao.spawn(ao.env.Module.Id, {
      ["On-Boot"] = DispatcherCodeTxId,
      Tags = {
        Authority = ao.authorities[1],
        Name = message.Tags.Name .. "-Dispatcher",
      }
    }).receive()
    
    log("Dispatcher ready.")

    local spawnTags = {
      Authority = ao.authorities[1],
      Name = message.Tags.Name,
      Creator = message.From,
      Description = "A new account to track your website.",
      DispatcherId = dispatcherSpawnReply.Process
    }

    if message.Tags.Description then
      spawnTags.Description = message.Tags.Description
    end

    log("Waiting for account process...")

    local spawnReply = ao.spawn(ao.env.Module.Id, {
      ["On-Boot"] = AccountCodeTxId,
      Tags = spawnTags
    }).receive()

    log("Account ready.")

    newAccount.id = spawnReply.Process

    log("Tell dispatcher about account...")

    ao.send({
      Target = dispatcherSpawnReply.Process,
      Tags = {
        Action = "Set-Account",
        AccountId = newAccount.id
      }
    }).receive()

    log("Account registered.")

    newAccount.status = "ready"
  end
)

Handlers.add("Get-Accounts", "Get-Accounts",
  function(message: ReceivedMessage)
    local userAccounts = {}

    for _, account in ipairs(Accounts) do
      for _, member in ipairs(account.members) do
        if member == message.From then
          table.insert(userAccounts, account)
          break
        end
      end
    end

    message.reply({
      Data = json.encode(Accounts),
      Tags = {
        Success = "Retrieved Accounts",
        ["Content-Type"] = "application/json"
      }
    })
  end
)

-- called from account process
Handlers.add(
  "Update-Account-Members", "Update-Account-Members",
  function(message: ReceivedMessage)
    if not message.Data then
      return message.reply({Tags = {Error = "Missing Data"}})
    end

    for _, account in ipairs(Accounts) do
      if account.id == message.From then
        print("[Update-Account-Members: " .. account.name .. "] Updated members.")
        account.members = json.decode(message.Data) as {string}
        break
      end
    end
  end
)

---------- PROTECTED HANDLERS ----------

Handlers.add("Update-Info", "Update-Info",
  ownerOnly(function(message: ReceivedMessage)
  print("[Update-Info] Received update.")
    local info = json.decode(message.Data) as JunctionInfo
    
    if info.Name then
      Name = info.Name
    end

    if info.AccountCodeTxId then
      AccountCodeTxId = info.AccountCodeTxId
    end

    if info.DispatcherCodeTxId then
      DispatcherCodeTxId = info.DispatcherCodeTxId
    end

    message.reply({
      Data = getInfoJson(),
      Tags = {
        Success = "Updated Info",
        ["Content-Type"] = "application/json"
      }
    })
    print("[Update-Info] Updated.")
  end)
)


----------- AOS HELPERS -----------
global Helpers = {
  registerAccount = function(name: string)
    print("[Helper.registerAccount] Sending message...")
    ao.send({
      Target = ao.id,
      Tags = {
        Action = "Register-Account",
        Name = name
      }
    }).receive()
  end,

  getAccountInfo = function(name: string)
    local account: Account 
    for _, a in ipairs(Accounts) do
      if a.name == name then
        account = a
        break
      end
    end

    if not account then
      return print("[Helper.getAccountInfo] Account not found.")
    end

    print("[Helper.getAccountInfo] Sending message...")
    local reply = ao.send({
      Target = account.id,
      Tags = {Action = "Info"}
    }).receive()

    print("[Helper.getAccountInfo] Received info:")
    print(reply.Data)
  end,

  updateAccountInfo = function(name: string, update: any)
    local account: Account 
    for _, a in ipairs(Accounts) do
      if a.name == name then
        account = a
        break
      end
    end

    if not account then
      return print("[Helper.updateAccountInfo] Account not found.")
    end

    print("[Helper.updateAccountInfo] Sending message...")
    local reply = ao.send({
      Target = account.id,
      Tags = {Action = "Update-Info"},
      Data = json.encode(update)
    }).receive()

    print("[Helper.updateAccountInfo] Received info:")
    print(reply.Data)
  end,

  sendExampleEvent = function(dispatcherId:string) 
    print("[Helper.sendEvent] Sending message...")
    ao.send({
      Target = dispatcherId,
      Tags = {
        Action = "Track",  
        ts = "" .. os.time(),
        ad = ao.id,
        ev = "pv", 
        url = "https://example.com/",
      },
    })
  end
}
print("AccountCodeTxId: " .. AccountCodeTxId)
print("DispatcherCodeTxId: " .. DispatcherCodeTxId)

print("Helpers:")
print(Helpers)