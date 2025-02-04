import * as Accounts from "./handlers.accounts"
import * as Utils from "../.common/utilities"

Name = "junction-account-registry"

export interface RegistryInfoResponse extends Utils.BasicInfo {
  AccountCount: number
}

export const info = Utils.createHandler({
  handler: (): RegistryInfoResponse => ({
    ...Utils.getBasicInfo(),
    AccountCount: Accounts.getAccountCount(),
  }),
})
