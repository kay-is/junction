import * as AoConnect from '@permaweb/aoconnect'
import * as Constants from './constants'

type AoRequest =
  | {
      dryrun?: false
      processId: string
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      signer: any
      tags?: Record<string, string>
      data?: object
    }
  | {
      dryrun: true
      processId: string
      tags?: Record<string, string>
      data?: object
    }

export const request = async <ResponseData>(config: AoRequest): Promise<ResponseData> => {
  let result: Awaited<ReturnType<typeof AoConnect.dryrun>>
  if (config.dryrun) {
    result = await AoConnect.dryrun({
      process: config.processId,
      tags: Object.entries(config.tags || {}).map(([name, value]) => ({ name, value }))
    })
  } else {
    const messageId = await AoConnect.message({
      process: config.processId,
      signer: AoConnect.createDataItemSigner(config.signer),
      tags: config.tags
        ? Object.entries(config.tags).map(([name, value]) => ({ name, value }))
        : [],
      data: config.data ? JSON.stringify(config.data) : ''
    })

    result = await AoConnect.result({
      process: config.processId,
      message: messageId
    })
  }

  if (result.Error) throw new Error(result.Error)

  const response = result.Messages.pop()

  const errorTag = response.Tags.find((t: { name: string }) => t.name === 'Error')
  if (errorTag) throw new Error(errorTag.value)

  return response.Data ? JSON.parse(response.Data) : {}
}

type AoSpawn = {
  codeTxId: string
  module?: string
  scheduler?: string
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  signer?: any
  tags?: Record<string, string>
}

export const spawn = async (config: AoSpawn) => {
  const customTags = Object.entries(config.tags ?? {}).map(([name, value]) => ({ name, value }))
  const tags = [{ name: 'On-Boot', value: config.codeTxId }, ...customTags]
  return await AoConnect.spawn({
    module: config.module ?? Constants.DEFAULT_MODULE,
    scheduler: config.scheduler ?? Constants.DEFAULT_MODULE,
    signer: AoConnect.createDataItemSigner(config.signer),
    tags
  })
}
