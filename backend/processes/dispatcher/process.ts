import * as Info from "./handlers.info"
Handlers.add("Info", "Info", Info.info)

import * as Tracking from "./handlers.tracking"
Handlers.add("SetAccount", "SetAccount", Tracking.setAccount)
Handlers.add("AddReport", "AddReport", Tracking.addReport)
Handlers.add("RemoveReport", "RemoveReport", Tracking.removeReport)
Handlers.add("Track", "Track", Tracking.track)
Handlers.add("Calculate", "Calculate", Tracking.calculate)
