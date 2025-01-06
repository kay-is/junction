/// <reference types="arconnect" />

declare var ethereum: {
  isBraveWallet: boolean
  isMetaMask: boolean
  selectedAddress: string
  chainId: number
}

declare var solana: {
  isBraveWallet: boolean
  isPhantom: boolean
  publicKey: string
}
