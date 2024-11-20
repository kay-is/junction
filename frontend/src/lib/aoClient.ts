import * as AoConnect from '@permaweb/aoconnect'

type AoRequest = {
  dryrun?: boolean
  processId: string
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  signer: any
  tags?: Record<string, string>
  data?: object
}

export const request = async (config: AoRequest) => {
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

  const response = result.Messages.pop()
  const errorTag = response.Tags.find((t: { name: string }) => t.name === 'Error')
  if (errorTag) throw new Error(errorTag.value)

  return JSON.parse(response.Data)
}
