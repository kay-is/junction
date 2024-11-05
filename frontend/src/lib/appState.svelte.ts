import { Othent, type AppInfo } from '@othent/kms'
import {
  createPage,
  loadInfo,
  updatePage,
  removePage,
  type AccountInfo,
  type Page,
  addArnsName,
  removeArnsName,
  addPaymentAddress,
  removePaymentAddress,
  addMember,
  removeMember,
  addAvatarImage,
  removeAvatarImage
} from './accountClient'
import { getAccountByName } from './registryClient'
import { addAntController, assignArnsName, getAntAddress, removeAntController } from './arnsClient'
import { getQarBalance, sendQar } from './qarClient'

const appInfo: AppInfo = {
  name: 'Junction',
  version: '0.0.1',
  env: 'development'
}

class Wallet {
  readonly audience = !window.arweaveWallet ? 'web2' : 'web3'
  connected = $state(localStorage.getItem('walletConnected') === 'true')

  address = $state(localStorage.getItem('walletAddress') ?? '')
  #wallet: Othent | typeof window.arweaveWallet

  loading = $state(false)

  constructor() {
    this.#wallet = this.audience === 'web3' ? window.arweaveWallet : new Othent({ appInfo })
  }

  connect = async () => {
    this.loading = true
    if (this.#wallet instanceof Othent) {
      await this.#wallet.connect()
      // required to populate the public key of the wallet
      await this.#wallet.getActivePublicKey()
    } else {
      await this.#wallet.connect([
        'ACCESS_ADDRESS',
        'SIGN_TRANSACTION',
        'ACCESS_PUBLIC_KEY',
        'SIGNATURE'
      ])
    }
    this.address = await this.#wallet.getActiveAddress()
    this.connected = true
    this.loading = false

    localStorage.setItem('walletConnected', 'true')
    localStorage.setItem('walletAddress', this.address)
  }

  disconnect = async () => {
    this.loading = true
    await this.#wallet.disconnect()
    this.connected = false
    this.address = ''
    this.loading = false

    localStorage.removeItem('walletConnected')
    localStorage.removeItem('walletAddress')
  }

  get signer() {
    return this.#wallet as typeof window.arweaveWallet
  }
}

class Account {
  name: string = $state('')
  creator: string = $state('')
  processId: string = $state('')
  status: 'empty' | 'spawning' | 'initializing' | 'ready' = $state('empty')
  info: AccountInfo = $state({
    Name: '',
    Pages: {},
    PaymentAddresses: {},
    ArnsNames: {},
    AvatarImages: {},
    Members: {}
  })
  loading = $state(false)

  constructor() {
    const accountName = localStorage.getItem('accountName')
    if (accountName) this.name = accountName

    const accountCreator = localStorage.getItem('accountCreator')
    if (accountCreator) this.creator = accountCreator

    const accountProcessId = localStorage.getItem('accountProcessId')
    if (accountProcessId) this.processId = accountProcessId

    const accountStatus = localStorage.getItem('accountStatus')
    if (accountStatus) this.status = accountStatus as 'empty'

    const accountInfo = localStorage.getItem('accountInfo')
    if (accountInfo) this.info = JSON.parse(accountInfo)
  }

  load = async (accountName: string, retry = 3) => {
    if (retry === 0) throw new Error('Account not ready')

    this.loading = true
    const account = await getAccountByName(accountName)
    this.name = account.Name
    this.creator = account.Creator
    this.status = account.Status
    if (account.Status === 'ready') {
      this.processId = account.ProcessId
      this.info = await loadInfo(account.ProcessId)
    } else {
      setTimeout(() => this.load(accountName, retry - 1), 3000)
    }
    this.loading = false

    localStorage.setItem('accountName', this.name)
    localStorage.setItem('accountCreator', this.creator)
    localStorage.setItem('accountProcessId', this.processId)
    localStorage.setItem('accountStatus', this.status)
    localStorage.setItem('accountInfo', JSON.stringify(this.info))
    console.log(this.info)
  }

  createPage = async () => {
    this.loading = true
    if (this.status !== 'ready') throw new Error('Account not ready')
    const page = await createPage(this.processId)
    this.info.Pages[page.Id] = page
    localStorage.setItem('accountInfo', JSON.stringify(this.info))
    this.loading = false
  }

  updatePage = async (page: Page, afterPublish = false) => {
    console.log(this.processId)
    this.loading = true
    if (this.status !== 'ready') throw new Error('Account not ready')
    if (!afterPublish) page.UpdatedTime = Date.now()
    localStorage.setItem('accountInfo', JSON.stringify(this.info))
    const updatedPage = await updatePage(this.processId, page)
    this.info.Pages[updatedPage.Id] = updatedPage
    localStorage.setItem('accountInfo', JSON.stringify(this.info))
    this.loading = false
  }

  removePage = async (pageId: string) => {
    this.loading = true
    if (this.status !== 'ready') throw new Error('Account not ready')
    delete this.info.Pages[pageId]
    localStorage.setItem('accountInfo', JSON.stringify(this.info))
    await removePage(this.processId, pageId)
    this.loading = false
  }

  addArnsName = async (arnsName: string) => {
    this.loading = true
    const antAddress = await getAntAddress(arnsName)
    await addAntController(antAddress, this.processId)
    this.info.ArnsNames[arnsName] = antAddress
    localStorage.setItem('accountInfo', JSON.stringify(this.info))
    this.loading = false
    await addArnsName(this.processId, arnsName, antAddress)
  }

  removeArnsName = async (arnsName: string) => {
    this.loading = true
    const antAddress = this.info.ArnsNames[arnsName]
    delete this.info.ArnsNames[arnsName]
    localStorage.setItem('accountInfo', JSON.stringify(this.info))
    await removeArnsName(this.processId, arnsName)
    this.loading = false

    // trying to clean things up, if it fails, it's not a big deal
    removeAntController(antAddress, this.processId)
  }

  assignArnsName = async (txId: string, arnsName: string, undername?: string) => {
    this.loading = true
    await assignArnsName(this.info.ArnsNames[arnsName], txId, undername)
    this.loading = false
  }

  addPaymentAddress = async (address: string, name: string) => {
    this.loading = true
    this.info.PaymentAddresses[address] = name
    localStorage.setItem('accountInfo', JSON.stringify(this.info))
    await addPaymentAddress(this.processId, address, name)
    this.loading = false
  }

  removePaymentAddress = async (address: string) => {
    this.loading = true
    delete this.info.PaymentAddresses[address]
    localStorage.setItem('accountInfo', JSON.stringify(this.info))
    await removePaymentAddress(this.processId, address)
    this.loading = false
  }

  addMember = async (address: string, name: string) => {
    this.loading = true
    this.info.Members[address] = name
    localStorage.setItem('accountInfo', JSON.stringify(this.info))
    await addMember(this.processId, address, name)
    this.loading = false
  }

  removeMember = async (address: string) => {
    this.loading = true
    delete this.info.Members[address]
    localStorage.setItem('accountInfo', JSON.stringify(this.info))
    await removeMember(this.processId, address)
    this.loading = false
  }

  addAvatarImage = async (title: string, txId: string) => {
    this.loading = true
    const newImage = await addAvatarImage(this.processId, title, txId)

    this.info.AvatarImages[newImage.Id] = newImage
    localStorage.setItem('accountInfo', JSON.stringify(this.info))
    this.loading = false
  }

  removeAvatarImage = async (imageId: string) => {
    this.loading = true
    delete this.info.AvatarImages[imageId]
    localStorage.setItem('accountInfo', JSON.stringify(this.info))
    await removeAvatarImage(this.processId, imageId)
    this.loading = false
  }
}

class Qar {
  balance = $state('0')
  loading = $state(false)

  divisor = 1000000000000

  loadBalance = async () => {
    this.loading = true
    this.balance = await getQarBalance()
    this.loading = false
  }

  send = async (recipient: string, quantity: string) => {
    this.loading = true
    await sendQar(recipient, quantity)
    this.loading = false
  }
}

export default {
  wallet: new Wallet(),
  account: new Account(),
  qar: new Qar()
}
