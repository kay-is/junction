import * as Info from "./handlers.info"
Handlers.add("Info", "Info", Info.info)

import * as Accounts from "./handlers.accounts"
Handlers.add("CreateAccount", "CreateAccount", Accounts.createAccount)
Handlers.add("UpdateAccount", "UpdateAccount", Accounts.updateAccount)
Handlers.add("GetAccount", "GetAccount", Accounts.getAccount)
Handlers.add("GetAccountList", "GetAccountList", Accounts.getAccountList)
