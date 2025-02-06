import type * as HandlerTypes from '$lib/backend.types'
import * as DeploymentOutputs from '$lib/deployment.output'
import * as AoClient from '$lib/clients/ao'

export const getInfo = async () =>
  AoClient.request<HandlerTypes.CodeRegistryInfoResponse>({
    dryrun: true,
    processId: DeploymentOutputs.CODEREGISTRY_PROCESS_ID,
    tags: { Action: 'Info' }
  })
