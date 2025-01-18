import * as Utils from "../common/utilities"

Name = "code-registry"

declare var Environment: Record<string, string>

export interface CodeRegistryInfoResponse extends Utils.BasicInfo {
  CodeTxIds: Record<string, string>
}

const info = Utils.createHandler({
  handler: (): CodeRegistryInfoResponse => ({
    ...Utils.getBasicInfo(),
    CodeTxIds: Environment,
  }),
})

Handlers.add("Info", "Info", info)
