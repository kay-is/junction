import * as Info from "./handlers.info"
Handlers.add("Info", "Info", Info.info)
Handlers.add("UpdateInfo", "UpdateInfo", Info.updateInfo)

import * as Reports from "./handlers.reports"
Handlers.add("AddReport", "AddReport", Reports.addReport)
Handlers.add("RemoveReport", "RemoveReport", Reports.removeReport)
