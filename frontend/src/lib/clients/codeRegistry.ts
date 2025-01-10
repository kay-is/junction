import * as AoClient from './ao'
import * as Constants from './constants'
import * as HandlerTypes from './handlers'

export const getInfo = async () =>
  AoClient.request<HandlerTypes.CodeRegistryInfoResponse>({
    dryrun: true,
    processId: Constants.CODEREGISTRY_PROCESS_ID,
    tags: { Action: 'Info' }
  })
