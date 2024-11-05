import * as AoConnect from '@permaweb/aoconnect'
import AppState from './appState.svelte'

export type Account =
  | {
      Status: 'spawning'
      Name: string
      Creator: string
    }
  | {
      Status: 'initializing'
      Name: string
      ProcessId: string
      Creator: string
    }
  | {
      Status: 'ready'
      Name: string
      ProcessId: string
      Creator: string
    }

const REGISTRY_PROCESS_ID = '5_4OdcQF4iniYBjYJdHmuSKA_culCI3i7PW9FoPWQeE'

const write = async (tags: Record<string, string>) => {
  const messageId = await AoConnect.message({
    process: REGISTRY_PROCESS_ID,
    signer: AoConnect.createDataItemSigner(AppState.wallet.signer),
    tags: Object.entries(tags).map(([name, value]) => ({ name, value }))
  })

  const result = await AoConnect.result({
    process: REGISTRY_PROCESS_ID,
    message: messageId
  })

  const response = result.Messages.pop()

  const errorTag = response.Tags.find((t: { name: string }) => t.name === 'Error')
  if (errorTag) throw new Error(errorTag.value)

  return JSON.parse(response.Data)
}

const read = async (tags: Record<string, string>) => {
  const result = await AoConnect.dryrun({
    process: REGISTRY_PROCESS_ID,
    tags: Object.entries(tags).map(([name, value]) => ({ name, value }))
  })

  const response = result.Messages.pop()

  const errorTag = response.Tags.find((t: { name: string }) => t.name === 'Error')
  if (errorTag) throw new Error(errorTag.value)

  return JSON.parse(response.Data)
}

export const createAccount = async (accountName: string): Promise<Account> =>
  write({ Action: 'Add-Account', AccountName: accountName })

export const getAccountByName = async (accountName: string): Promise<Account> =>
  read({ Action: 'Get-Account', AccountName: accountName })

export const getAccountByUserAddress = async (userAddress: string): Promise<Account> =>
  read({ Action: 'Get-Account', UserAddress: userAddress })
