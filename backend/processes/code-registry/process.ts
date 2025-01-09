import * as Utils from "../common/utilities"

Name = "Junction-Code-Registry"

declare var Environment: Record<string, string>

export type CodeRegistryInfoResponse = {
  Name: string
  Environment: Record<string, string>
}

const info = Utils.createHandler({
  handler: (): CodeRegistryInfoResponse => ({ Name, Environment }),
})

Handlers.add("Info", "Info", info)
