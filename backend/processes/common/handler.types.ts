export type { CodeRegistryInfoResponse, CodeRegistryUpdateInfoResponse } from "../code-registry/process"

export type { RegistryInfoResponse } from "../registry/handlers.info"
export type {
  AccountListResponse,
  CreateAccountResponse,
} from "../registry/handlers.accounts"

export type { DispatcherInfoResponse } from "../dispatcher/handlers.info"

export type {
  AccountInfoResponse,
  AccountUpdateInfoResponse,
} from "../account/handlers.info"

export type {
  AccountAddReportResponse,
  AccountRemoveReportResponse,
} from "../account/handlers.reports"

export type { ReportInfoResponse } from "../reports/common/handlers.info"
import type { JunctionRecord } from "../reports/common/handlers.calculate"
import type { RecordsType } from "../reports/common/handlers.records"

export type { JunctionRecord, RecordsType }
export type GetRecordsResponse = RecordsType<JunctionRecord>
