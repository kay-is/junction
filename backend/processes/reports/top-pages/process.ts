import * as Info from "./handlers.info"
Handlers.add("Info", "Info", Info.info)

import * as Calculate from "./handlers.calculate"
ao.addAssignable("Calculate", { Action: "Calculate" })
Handlers.add("Calculate", "Calculate", Calculate.calculate)

import * as Records from "./handlers.records"
Handlers.add("GetRecords", "GetRecords", Records.getRecords)
