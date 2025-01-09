import * as AoClient from './aoClient'
import * as Constants from './constants'
import * as HandlerTypes from './handlerTypes'

export const getInfo = async () =>
  AoClient.request<HandlerTypes.CodeRegistryInfoResponse>({
    dryrun: true,
    processId: Constants.CODEREGISTRY_PROCESS_ID,
    tags: { Action: 'Info' }
  })
