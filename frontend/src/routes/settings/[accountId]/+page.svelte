<script lang="ts">
  import { Heading, Spinner } from 'flowbite-svelte'
  import Sidebar from '$lib/components/Sidebar.svelte'
  import * as AppState from '$lib/state/app.svelte'

  const appState = AppState.getContext()
</script>

<div class="flex">
  <Sidebar />
  <div class="container px-10 pt-5">
    <Heading class="mb-5">Settings</Heading>

    <Heading tag="h2" class="mb-3 mt-5">Wallet</Heading>
    <p>Type: {appState.wallet.isWeb3User ? 'Extension' : 'Othent'}</p>
    <p>Connected: {appState.wallet.connected}</p>
    <p>Address: {appState.wallet.address}</p>

    <Heading tag="h2" class="mb-3 mt-5"
      >Account {#if appState.account.loading}<Spinner />{/if}</Heading
    >
    <p>ID: {appState.account.id}</p>
    <p>Name: {appState.account.name}</p>
    <p>Description: {appState.account.description}</p>
    <p>
      Reports ({appState.account.reportsArray.length}): {appState.account.reportsArray
        .map((r) => r.name)
        .join(', ')}
    </p>
    <p>
      Report Views ({appState.account.reportViewsArray.length}): {appState.account.reportViewsArray
        .map((r) => r.name)
        .join(', ')}
    </p>
    <p>
      Members ({appState.account.membersArray.length}): {appState.account.membersArray
        .map((m) => m[1] + ' (' + m[0] + ')')
        .join(', ')}
    </p>
    <p>Registry ID: {appState.account.registryId}</p>
    <p>Dispatcher ID: {appState.account.dispatcher?.id}</p>
    <p>Memory Usage: ~{Math.ceil(appState.account.memoryUsage / 1024)}MB</p>

    <Heading tag="h2" class="mb-3 mt-5"
      >Dispatcher {#if appState.account.dispatcher.loading}<Spinner />{/if}</Heading
    >
    <p>ID: {appState.account.dispatcher.id}</p>
    <p>Name: {appState.account.dispatcher.name}</p>
    <p>Assigned Events: {appState.account.dispatcher.assignedEventCount}</p>
    <p>
      Report IDs ({appState.account.dispatcher.reportIds.length}): {appState.account.dispatcher.reportIds.join(
        ', '
      )}
    </p>
    <p>
      Members ({appState.account.dispatcher.membersArray.length}): {appState.account.dispatcher.membersArray
        .map((m) => `${m[1]} (${m[0]})`)
        .join(', ')}
    </p>
    <p>Memory Usage: ~{Math.ceil(appState.account.dispatcher.memoryUsage / 1024)}MB</p>
  </div>
</div>
