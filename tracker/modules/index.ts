import ArweaveCryptoDriver from "arweave/web/lib/crypto/webcrypto-driver"
import * as ArBundles from "./arbundles"
import { message } from "@permaweb/aoconnect"

export type JunctionConfig = {
  dispatcherId: string
  debug?: boolean
  trackUrlHashes?: boolean
  arweaveConfig?: any
  signer?: any
}

type SignerOptions = {
  data: string
  tags: { name: string; value: string }[]
  target?: string
  anchor?: string
}

export default class Junction {
  #signer: any
  #dispatcherId: string
  #trackUrlHashes: boolean

  constructor(signer: any, dispatcherId: string, trackUrlHashes = false) {
    this.#signer = signer
    this.#dispatcherId = dispatcherId
    this.#trackUrlHashes = trackUrlHashes
  }

  static log = (...args: any[]) => console.log("[Junction]", ...args)

  static async initialize(config: JunctionConfig) {
    if (!config.debug) Junction.log = () => {}

    let { signer } = config

    Junction.log("Initializing:", config)

    if (!signer) {
      let wallet
      const storedWallet = localStorage.getItem("junctionWallet")

      if (storedWallet) {
        Junction.log("Found stored wallet.")
        wallet = JSON.parse(storedWallet)
      } else {
        const crypto = new ArweaveCryptoDriver()
        wallet = await crypto.generateJWK()
        localStorage.setItem("junctionWallet", JSON.stringify(wallet))
        Junction.log("Generated new wallet.")
      }

      const arweaveSigner = new ArBundles.ArweaveSigner(wallet)
      signer = async ({ data, tags, target, anchor }: SignerOptions) => {
        const dataItem = ArBundles.createData(data, arweaveSigner, {
          tags,
          target,
          anchor,
        })
        await dataItem.sign(arweaveSigner)
        return { id: await dataItem.id, raw: await dataItem.getRaw() }
      }
    }

    return new Junction(
      signer,
      config.dispatcherId,
      config.trackUrlHashes ?? false
    )
  }

  #getClientInfo = async () => {
    const info = []

    const canonicalLinkTag = document.querySelector('link[rel="canonical"]')
    let url = canonicalLinkTag && canonicalLinkTag.getAttribute("href")

    if (!url) {
      url = this.#trackUrlHashes
        ? window.location.href
        : window.location.href.replace(/#.*$/, "")
    }

    info.push({ name: "url", value: url })

    info.push({ name: "ua", value: navigator.userAgent })
    info.push({ name: "la", value: navigator.language })
    if (navigator.cookieEnabled) info.push({ name: "co", value: "1" })
    const timezoneOffset = new Date().getTimezoneOffset()
    if (timezoneOffset)
      info.push({
        name: "tz",
        value:
          timezoneOffset > 0
            ? `UTC${(timezoneOffset * -1) / 60}`
            : `UTC+${(timezoneOffset * -1) / 60}`,
      })

    if (window.arweaveWallet) {
      info.push({ name: "ar", value: window.arweaveWallet.walletName })
      info.push({ name: "ar-ver", value: window.arweaveWallet.walletVersion })
      try {
        await window.arweaveWallet.getActiveAddress()
        info.push({ name: "ar-con", value: "1" })
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
      } catch (_e) {
        // wallet not connected
      }
    }

    if (window.ethereum) {
      info.push({
        name: "eth",
        value: window.ethereum.isBraveWallet
          ? "BraveWallet"
          : window.ethereum.isMetaMask
          ? "MetaMask"
          : "unknown",
      })
      if (window.ethereum.selectedAddress) {
        info.push({ name: "eth-con", value: "true" })
        info.push({ name: "eth-chain", value: "" + window.ethereum.chainId })
      }
    }

    if (window.solana) {
      info.push({
        name: "sol",
        value: window.solana.isBraveWallet
          ? "BraveWallet"
          : window.solana.isPhantom
          ? "Phantom"
          : "unknown",
      })

      if (window.solana.publicKey) info.push({ name: "sol-con", value: "1" })
    }

    return info
  }

  track = async (eventName: string, payload = {}) => {
    const clientInfo = await this.#getClientInfo()

    const tags: { name: string; value: string }[] = [
      { name: "Action", value: "Track" },
      { name: "ts", value: "" + Date.now() },
      { name: "ev", value: eventName },
      ...clientInfo,
      ...Object.entries<string>(payload).map(([name, value]) => ({
        name: "j-" + name,
        value: "" + value,
      })),
    ]

    Junction.log(tags)
    // @ts-ignore
    await message({ process: this.#dispatcherId, signer: this.#signer, tags })
  }

  page = (pageData?: Record<string, string | number | boolean>) =>
    this.track("pv", pageData)
}
