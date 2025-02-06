import * as CodeRegistryClient from '$lib/clients/codeRegistry'

export class CodeRegistry {
  codeTxIds: Record<string, string> = $state({})
  codeTxIdArray = $derived(
    Object.entries(this.codeTxIds).map(([key, value]) => ({ name: key, txId: value }))
  )
  loading = $state(false)

  load = async () => {
    this.loading = true
    const codeRegistrInfo = await CodeRegistryClient.getInfo()

    this.codeTxIds = codeRegistrInfo.CodeTxIds

    this.loading = false
  }
}
