<script lang="ts">
  import { goto } from '$app/navigation'
  import AppState from '$lib/appState.svelte'
  import { Heading, P, Button } from 'flowbite-svelte'

  const login = async () => {
    const appState = await AppState.wallet.connect()

    goto('/dashboard')
  }

  $effect(() => {
    if (AppState.wallet.connected) AppState.accounts.load()
  })
</script>

<div class="flex h-screen items-center justify-center">
  <div>
    <Heading tag="h1" class="mb-4 text-center">Junction Web Analytics</Heading>
    <P class="mb-4 text-center text-xl">Learn what users want.</P>
    <Button onclick={login} size="lg" color="primary" class="w-full">Get Started</Button>
  </div>
</div>
