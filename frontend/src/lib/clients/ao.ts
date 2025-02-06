import * as AoConnect from '@permaweb/aoconnect'
import * as Constants from '$lib/clients/.constants'

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
  const customTags = Object.entries(config.tags || {}).map(([name, value]) => ({ name, value }))
  if (config.dryrun) {
    result = await AoConnect.dryrun({
      process: config.processId,
      tags: [{ name: 'Application', value: 'Junction' }, ...customTags]
    })
  } else {
    const messageId = await AoConnect.message({
      process: config.processId,
      signer: AoConnect.createDataItemSigner(config.signer),
      tags: [{ name: 'Application', value: 'Junction' }, ...customTags],
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
  console.log('[AO] Spawning process...')
  const spawnTags = [
    { name: 'Application', value: 'Junction' },
    { name: 'On-Boot', value: config.codeTxId },
    { name: 'Authority', value: Constants.DEFAULT_AUTHORITY }
  ]
  const customTags = Object.entries(config.tags ?? {}).map(([name, value]) => ({ name, value }))
  const allTags = [...spawnTags, ...customTags]

  return await AoConnect.spawn({
    module: config.module ?? Constants.DEFAULT_MODULE,
    scheduler: config.scheduler ?? Constants.DEFAULT_SCHEDULER,
    signer: AoConnect.createDataItemSigner(config.signer),
    tags: allTags
  })
}

type AoUpdate = {
  codeTxId: string
  processId: string
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  signer: any
}

export const update = async (config: AoUpdate) => {
  console.log('[AO] Updating process code...')

  const code = await fetch(`https://arweave.net/${config.codeTxId}`).then((res) => res.text())

  const messageId = await AoConnect.message({
    process: config.processId,
    signer: AoConnect.createDataItemSigner(config.signer),
    tags: [
      { name: 'Application', value: 'Junction' },
      { name: 'Action', value: 'Eval' },
      { name: 'CodeTxId', value: config.codeTxId }
    ],
    data: code
  })

  return await AoConnect.result({ process: config.processId, message: messageId })
}
