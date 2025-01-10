import { Othent, type AppInfo } from '@othent/kms'

const appInfo: AppInfo = {
  name: 'Junction',
  version: '0.2.7',
  env: 'development'
}

export class Wallet {
  static readonly isWeb3User = !!window.arweaveWallet

  connected = $state(false)
  address = $state('')
  #wallet: Othent | typeof window.arweaveWallet

  loading = $state(false)

  constructor() {
    this.#wallet = Wallet.isWeb3User ? window.arweaveWallet : new Othent({ appInfo })

    this.#wallet
      .getActiveAddress()
      .then((address) => {
        this.address = address
        this.connected = true
      })
      .catch((_e) => {
        console.log('Wallet not connected!')
      })
  }

  connect = async () => {
    this.loading = true
    if (this.#wallet instanceof Othent) {
      // Othent requests all permissions by default
      await this.#wallet.connect()
      // Othent doesn't populate the private key if this method wasn't called
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
  }

  disconnect = async () => {
    this.loading = true
    await this.#wallet.disconnect()
    this.connected = false
    this.address = ''
    this.loading = false
  }

  get signer() {
    return this.#wallet as typeof window.arweaveWallet
  }
}
