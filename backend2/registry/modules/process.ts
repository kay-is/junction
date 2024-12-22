import * as info from "./handlers.info"
Handlers.add("Info", "Info", info.info)

import * as accounts from "./handlers.accounts"
Handlers.add("CreateAccount", "CreateAccount", accounts.createAccount)
Handlers.add("UpdateAccount", "UpdateAccount", accounts.updateAccount)
Handlers.add("GetAccount", "GetAccount", accounts.getAccount)
Handlers.add("GetAccountList", "GetAccountList", accounts.getAccountList)
