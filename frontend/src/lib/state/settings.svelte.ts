export class Settings {
  gatewayUrl = $state('https://arweave.net/')
  cuUrl = $state('https://cu.ao-testnet.xyz/')
  muUrl = $state('https://mu.ao-testnet.xyz/')

  constructor() {
    const settingsString = localStorage.getItem('settings')

    if (settingsString) {
      const settings = JSON.parse(settingsString)
      this.gatewayUrl = settings.gatewayUrl
      this.cuUrl = settings.cuUrl
      this.muUrl = settings.muUrl
    }

    $effect.root(() => {
      const settings = {
        gatewayUrl: this.gatewayUrl,
        cuUrl: this.cuUrl,
        muUrl: this.muUrl
      }
      console.log('Settings updated:', settings)
      localStorage.setItem('settings', JSON.stringify(settings))
    })
  }
}
