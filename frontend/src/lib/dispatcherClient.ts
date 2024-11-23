import * as AoClient from './aoClient'

export const getInfo = async (id: string) =>
  AoClient.request({
    dryrun: true,
    processId: id,
    tags: { Action: 'Info' }
  })
