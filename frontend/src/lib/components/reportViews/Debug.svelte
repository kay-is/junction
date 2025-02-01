<script lang="ts">
  import { Card } from 'flowbite-svelte'
  import * as AppState from '$lib/state/app.svelte'

  const appState = AppState.getContext()
</script>

<Card class="min-h-40 w-full max-w-none">
  <h5 class="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">Debug</h5>
  <p>Current</p>
  <p>
    {appState.date.currentStart.toLocaleDateString()} 00:00 - {appState.date.currentEnd.toLocaleDateString()}
    23:59
  </p>
  <p>Previous</p>
  <p>
    {appState.date.referenceStart.toLocaleDateString()} 00:00 - {appState.date.referenceEnd.toLocaleDateString()}
    23:59
  </p>
</Card>
