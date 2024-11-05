import * as AoConnect from '@permaweb/aoconnect'
import AppState from './appState.svelte'
import Page from '../routes/+page.svelte'

type AoMessage = {
  process: string
  signer: ReturnType<typeof AoConnect.createDataItemSigner>
  tags: { name: string; value: string }[]
  data?: string
}

const write = async (processId: string, tags: Record<string, string>, data?: object) => {
  const message: AoMessage = {
    process: processId,
    signer: AoConnect.createDataItemSigner(AppState.wallet.signer),
    tags: Object.entries(tags).map(([name, value]) => ({ name, value }))
  }

  if (data) message.data = JSON.stringify(data)

  const messageId = await AoConnect.message(message)

  const result = await AoConnect.result({
    process: processId,
    message: messageId
  })

  const response = result.Messages.pop()

  const errorTag = response.Tags.find((t: { name: string }) => t.name === 'Error')
  if (errorTag) throw new Error(errorTag.value)

  if (!response.Data) return

  return JSON.parse(response.Data)
}

const read = async (processId: string, tags: Record<string, string>) => {
  const result = await AoConnect.dryrun({
    process: processId,
    tags: Object.entries(tags).map(([name, value]) => ({ name, value }))
  })

  const response = result.Messages.pop()

  const errorTag = response.Tags.find((t: { name: string }) => t.name === 'Error')
  if (errorTag) throw new Error(errorTag.value)

  return JSON.parse(response.Data)
}

export type Link = {
  Title: string
  Url: string
}

export type Page = {
  Id: string
  Title: string
  Description: string
  AvatarImageId: number
  TemplateId: number
  PaymentAddress: string
  ArnsName: string
  Undername: string
  Links: Link[]
  PublicationTxId: string
  PublicationTime: number
  UpdatedTime: number
}

export type AvatarImage = {
  Id: string
  Title: string
  TxId: string
}

export type AccountInfo = {
  Name: string
  Pages: Record<string, Page>
  PaymentAddresses: Record<string, string>
  ArnsNames: Record<string, string>
  AvatarImages: Record<string, AvatarImage>
  Members: Record<string, string>
  Analytics: Record<string, Record<string, number>>
}

export const loadInfo = async (processId: string): Promise<AccountInfo> => {
  const info = await read(processId, { Action: 'Info' })

  // Fix Lua serialization bug where empty tables are serialized as arrays
  if (info.Pages instanceof Array) info.Pages = {}
  if (info.PaymentAddresses instanceof Array) info.PaymentAddresses = {}
  if (info.ArnsNames instanceof Array) info.ArnsNames = {}
  if (info.Analytics instanceof Array) info.Analytics = {}

  return info
}

export const createPage = async (processId: string): Promise<Page> =>
  write(processId, { Action: 'Add-Page' })

export const updatePage = async (processId: string, page: Page): Promise<Page> =>
  write(processId, { Action: 'Update-Page', PageId: page.Id }, page)

export const removePage = async (processId: string, pageId: string): Promise<void> =>
  write(processId, { Action: 'Remove-Page', PageId: pageId })

export const addArnsName = async (processId: string, arnsName: string, antAddress: string) =>
  write(processId, { Action: 'Add-Arns-Name', ArnsName: arnsName, AntAddress: antAddress })

export const removeArnsName = async (processId: string, arnsName: string) =>
  write(processId, { Action: 'Remove-Arns-Name', ArnsName: arnsName })

export const addPaymentAddress = async (
  processId: string,
  paymentAddress: string,
  paymentAddressName: string
) =>
  write(processId, {
    Action: 'Add-Payment-Address',
    PaymentAddress: paymentAddress,
    PaymentAddressName: paymentAddressName
  })

export const removePaymentAddress = async (processId: string, paymentAddress: string) =>
  write(processId, { Action: 'Remove-Payment-Address', PaymentAddress: paymentAddress })

export const addMember = async (processId: string, memberAddress: string, memberName: string) =>
  write(processId, { Action: 'Add-Member', MemberAddress: memberAddress, MemberName: memberName })

export const removeMember = async (processId: string, memberAddress: string) =>
  write(processId, { Action: 'Remove-Member', MemberAddress: memberAddress })

export const addAvatarImage = async (
  processId: string,
  avatarImageTitle: string,
  avatarImageTxId: string
): Promise<AvatarImage> =>
  write(processId, {
    Action: 'Add-Avatar-Image',
    AvatarImageTitle: avatarImageTitle,
    AvatarImageTxId: avatarImageTxId
  })

export const removeAvatarImage = async (processId: string, avatarImageId: string) =>
  write(processId, { Action: 'Remove-Avatar-Image', AvatarImageId: avatarImageId })
