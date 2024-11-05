import { createDataItemSigner, dryrun, message, result } from '@permaweb/aoconnect'
import AppState from './appState.svelte'

const IO_PROCESS_ID = 'agYcCFJtrMG6cqMuZfskIkFTGvUPddICmtQSBIoPdiA'

export const getAntAddress = async (arnsName: string) => {
  const getRecordResult = await dryrun({
    process: IO_PROCESS_ID,
    tags: [
      { name: 'Action', value: 'Record' },
      { name: 'Name', value: arnsName }
    ]
  })

  if (!getRecordResult.Messages[0].Data) throw new Error('ArNS domain not found')

  return JSON.parse(getRecordResult.Messages[0].Data).processId
}

export const addAntController = async (antAddress: string, accountAddress: string) => {
  const messageId = await message({
    process: antAddress,
    signer: createDataItemSigner(AppState.wallet.signer),
    tags: [
      { name: 'Action', value: 'Add-Controller' },
      { name: 'Controller', value: accountAddress }
    ]
  })

  const addControllerResponse = await result({
    message: messageId,
    process: antAddress
  })

  addControllerResponse.Messages.forEach((message) => {
    const error = message.Tags.find((tag: { name: string }) => tag.name === 'Error')
    if (error && !message.Data.includes('Controller already exists')) {
      throw new Error('Could not add controller.')
    }
  })
}

export const removeAntController = async (antAddress: string, accountAddress: string) => {
  const messageId = await message({
    process: antAddress,
    signer: createDataItemSigner(AppState.wallet.signer),
    tags: [
      { name: 'Action', value: 'Remove-Controller' },
      { name: 'Controller', value: accountAddress }
    ]
  })

  const removeControllerResponse = await result({
    message: messageId,
    process: antAddress
  })

  removeControllerResponse.Messages.forEach((message) => {
    const error = message.Tags.find((tag: { name: string }) => tag.name === 'Error')
    if (error) throw new Error('Could not remove controller.')
  })
}

export const assignArnsName = async (antAddress: string, txId: string, undername = '@') => {
  const messageId = await message({
    process: antAddress,
    signer: createDataItemSigner(AppState.wallet.signer),
    tags: [
      { name: 'Action', value: 'Set-Record' },
      { name: 'Sub-Domain', value: undername },
      { name: 'Transaction-Id', value: txId },
      { name: 'TTL-Seconds', value: '900' }
    ]
  })

  const assignNameResponse = await result({
    message: messageId,
    process: antAddress
  })
  assignNameResponse.Messages.forEach((message) => {
    const error = message.Tags.find((tag: { name: string }) => tag.name === 'Error')
    if (error) throw new Error('Could not assign name.')
  })
}
