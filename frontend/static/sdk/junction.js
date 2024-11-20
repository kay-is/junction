import './arweave.js'
import { dryrun, message } from './aoconnect.js'
import { createData, ArweaveSigner } from './arbundles.js'

export class Junction {
  #signer
  #dispatcherId
  #trackUrlHashes

  constructor(signer, dispatcherId, trackUrlHashes) {
    this.#signer = signer
    this.#dispatcherId = dispatcherId
    this.#trackUrlHashes = trackUrlHashes
  }

  static async initialize(config) {
    let signer = config.signer

    if (!signer) {
      let wallet
      const storedWallet = localStorage.getItem('junctionWallet')

      if (storedWallet) wallet = JSON.parse(storedWallet)
      else {
        wallet = await Arweave.init(config.arweaveConfig ?? {}).wallets.generate()
        localStorage.setItem('junctionWallet', JSON.stringify(wallet))
      }

      const arweaveSigner = new ArweaveSigner(wallet)
      signer = async ({ data, tags, target, anchor }) => {
        const dataItem = createData(data, arweaveSigner, {
          tags,
          target,
          anchor
        })
        await dataItem.sign(arweaveSigner)
        return { id: await dataItem.id, raw: await dataItem.getRaw() }
      }
    }

    let dispatcherId
    try {
      const result = await dryrun({
        process: config.accountId,
        tags: [{ name: 'Action', value: 'Info' }]
      })

      dispatcherId = JSON.parse(result.Messages.pop().Data).DispatcherId
    } catch (e) {
      console.error('[Junction] Failed to load dispatcher ID from AO.')
    }

    return new Junction(signer, dispatcherId, config.trackUrlHashes ?? false)
  }

  #getClientInfo = async () => {
    const info = []
    info.push({ name: 'ua', value: navigator.userAgent })
    info.push({ name: 'la', value: navigator.language })
    if (navigator.cookieEnabled) info.push({ name: 'co', value: '1' })
    info.push({ name: 'wi', value: '' + screen.width })
    info.push({ name: 'he', value: '' + screen.height })
    const timezoneOffset = new Date().getTimezoneOffset()
    if (timezoneOffset)
      info.push({
        name: 'tz',
        value:
          timezoneOffset > 0
            ? `UTC${(timezoneOffset * -1) / 60}`
            : `UTC+${(timezoneOffset * -1) / 60}`
      })

    if (window.arweaveWallet) {
      info.push({ name: 'ar', value: window.arweaveWallet.walletName })
      info.push({ name: 'ar-ver', value: window.arweaveWallet.walletVersion })
      try {
        await window.arweaveWallet.getActiveAddress()
        info.push({ name: 'ar-con', value: '1' })
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
      } catch (_e) {
        // done
      }
    }

    if (window.ethereum) {
      info.push({
        name: 'eth',
        value: window.ethereum.isBraveWallet
          ? 'BraveWallet'
          : window.ethereum.isMetaMask
            ? 'MetaMask'
            : 'unknown'
      })
      if (window.ethereum.selectedAddress) {
        info.push({ name: 'eth-con', value: 'true' })
        info.push({ name: 'eth-chain', value: '' + window.ethereum.chainId })
      }
    }
    if (window.solana) {
      info.push({
        name: 'sol',
        value: window.solana.isBraveWallet
          ? 'BraveWallet'
          : window.solana.isPhantom
            ? 'Phantom'
            : 'unknown'
      })

      if (window.solana.publicKey) info.push({ name: 'sol-con', value: '1' })
    }

    return info
  }

  track = async (event, payload = {}) => {
    const clientInfo = await this.#getClientInfo()

    const tags = [
      { name: 'Action', value: 'Track' },
      { name: 'ts', value: '' + Date.now() },
      { name: 'ev', value: event },
      ...clientInfo,
      ...Object.entries(payload).map(([name, value]) => ({
        name: 'j-' + name,
        value: '' + value
      }))
    ]

    await message({ process: this.#dispatcherId, signer: this.#signer, tags })
  }

  page = async (pageData) => {
    if (!pageData) {
      const tag = document.querySelector('link[rel="canonical"]')
      let url = tag && tag.getAttribute('href')

      if (!url) {
        url = this.#trackUrlHashes ? window.location.href : window.location.href.replace(/#.*$/, '')
      }

      pageData = { url }
    }
    await this.track('pv', pageData)
  }
}
