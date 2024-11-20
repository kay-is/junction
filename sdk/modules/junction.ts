import Arweave from "arweave"
import { dryrun, message } from "@permaweb/aoconnect"
import { createData, ArweaveSigner, JWKInterface } from "@ar.io/arbundles"

type JunctionConfig = {
  accountId: string
  trackUrlHashes?: boolean
  signer?: any
  arweaveConfig?: any
}

export class Junction {
  #signer: any
  #dispatcherId: string
  #trackUrlHashes: boolean

  constructor(signer: any, dispatcherId: string, trackUrlHashes: boolean) {
    this.#signer = signer
    this.#dispatcherId = dispatcherId
    this.#trackUrlHashes = trackUrlHashes
  }

  static async initialize(config: JunctionConfig) {
    let signer = config.signer

    if (!signer) {
      let wallet: JWKInterface
      const storedWallet = localStorage.getItem("junctionWallet")

      if (storedWallet) wallet = JSON.parse(storedWallet)
      else {
        wallet = await Arweave.init(
          config.arweaveConfig ?? {}
        ).wallets.generate()
        localStorage.setItem("junctionWallet", JSON.stringify(wallet))
      }

      const arweaveSigner = new ArweaveSigner(wallet)
      signer = async ({ data, tags, target, anchor }: any) => {
        const dataItem = createData(data, arweaveSigner, {
          tags,
          target,
          anchor,
        })
        await dataItem.sign(arweaveSigner)
        return { id: await dataItem.id, raw: await dataItem.getRaw() }
      }
    }

    const result = await dryrun({
      process: config.accountId,
      tags: [{ name: "Action", value: "Info" }],
    })

    const dispatcherId = JSON.parse(result.Messages.pop().Data).DispatcherId

    return new Junction(signer, dispatcherId, config.trackUrlHashes ?? false)
  }

  track = async (
    event: string,
    payload: Record<string, boolean | number | string> = {}
  ) => {
    const tags = [
      { name: "Action", value: "Track" },
      { name: "Timestamp", value: "" + Date.now() },
      { name: "Event", value: event },
      ...Object.entries(payload).map(([name, value]) => ({
        name: "J-" + name,
        value: "" + value,
      })),
    ]

    await message({ process: this.#dispatcherId, signer: this.#signer, tags })
  }

  page = async (pageData?: { url: string }) => {
    if (!pageData) {
      const tag = document.querySelector('link[rel="canonical"]')
      let url = tag && tag.getAttribute("href")

      if (!url) {
        url = this.#trackUrlHashes
          ? window.location.href
          : window.location.href.replace(/#.*$/, "")
      }

      pageData = { url }
    }
    await this.track("pageview", pageData)
  }
}
