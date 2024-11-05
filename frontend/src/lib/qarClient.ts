import AppState from './appState.svelte'
import { message, createDataItemSigner, result, dryrun } from '@permaweb/aoconnect'

const QAR_PROCESS_ID = 'NG-0lVX882MG5nhARrSzyprEK6ejonHpdUmaaMPsHE8'

export const getQarBalance = async () => {
  const answer = await dryrun({
    process: QAR_PROCESS_ID,
    tags: [
      { name: 'Action', value: 'Balance' },
      { name: 'Target', value: AppState.wallet.address }
    ]
  })

  return answer.Messages[0].Tags.find((t: { name: string }) => t.name === 'Balance')?.value
}

export const sendQar = async (recipient: string, quantity: string) => {
  const messageId = await message({
    process: QAR_PROCESS_ID,
    signer: createDataItemSigner(AppState.wallet.signer),
    tags: [
      { name: 'Action', value: 'Transfer' },
      { name: 'Recipient', value: recipient },
      { name: 'Quantity', value: quantity }
    ]
  })

  const answer = await result({
    process: QAR_PROCESS_ID,
    message: messageId
  })

  console.log(answer)
}
