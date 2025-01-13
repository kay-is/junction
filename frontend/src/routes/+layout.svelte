<script lang="ts">
  import '../app.css'
  import * as AppState from '$lib/state/app.svelte'

  const appState = AppState.init()

  AppState.setContext(appState)

  let { children } = $props()
</script>

{@render children()}
