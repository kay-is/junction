<script lang="ts">
  import * as AppState from '$lib/state/app.svelte'
  import {
    P,
    Button,
    Modal,
    Listgroup,
    ListgroupItem,
    A,
    ButtonGroup,
    Input,
    Helper,
    Spinner,
    Heading
  } from 'flowbite-svelte'

  const account = localStorage.getItem('account')
  if (account) {
    const accountId = JSON.parse(account).Id
    window.location.href = `/${accountId}/dashboard`
  }

  const appState = AppState.getContext()

  let showAccountsModal = $state(false)

  const getStarted = async () => {
    await appState.wallet.connect()
    if (appState.wallet.connected) {
      showAccountsModal = true
      await appState.registry.load()
    }
  }

  let newAccountName = $state('')
  const createAccount = async (e: Event) => {
    e.preventDefault()
    await appState.registry.register(newAccountName, '')
    newAccountName = ''
  }
</script>

<svelte:head>
  <title>Junction Web Analytics</title>
</svelte:head>

<div class="flex h-screen items-center justify-center">
  <div class="text-center">
    <Heading class="mb-5 text-center">Junction</Heading>
    <P>Privacy perserving web analytics.</P>
    <A href="/docs/view" class="mt-5">Learn more</A>
    <br />
    <Button size="xl" onclick={getStarted} class="mt-5 w-full">Get Started</Button>
  </div>
</div>

<div class="pt-20">
  <!-- Add Feature Sections -->
  <section class="bg-white py-16 dark:bg-gray-900">
    <div class="container mx-auto px-4">
      <div class="mb-8 text-center lg:mb-16">
        <div class="mx-auto max-w-4xl">
          <Heading tag="h2" class="mb-4">Why Junction is Different?</Heading>
          <P class="text-center text-gray-500 dark:text-gray-400">
            Traditional analytics compromise privacy - we reinvent them with web3 infrastructure
          </P>
        </div>
      </div>

      <div class="grid grid-cols-1 gap-8 md:grid-cols-3">
        <!-- Feature 1 -->
        <div class="p-6 text-center">
          <img src="/anon-icon.svg" alt="Anonymous" class="mx-auto mb-4 h-12 w-12" />
          <h3 class="mb-2 text-xl font-bold">Truly Anonymous</h3>
          <p class="text-gray-600 dark:text-gray-300">
            Zero personal data collected. Only non-identifiable event data is stored and processed.
          </p>
        </div>

        <!-- Feature 2 -->
        <div class="p-6 text-center">
          <img src="/arweave-icon.svg" alt="Arweave" class="mx-auto mb-4 h-12 w-12" />
          <h3 class="mb-2 text-xl font-bold">Permanent Storage</h3>
          <p class="text-gray-600 dark:text-gray-300">
            All analytics data is stored permanently on Arweave's blockchain, creating an immutable
            record of your site's metrics that can't be tampered with.
          </p>
        </div>

        <!-- Feature 3 -->
        <div class="p-6 text-center">
          <img src="/ao-icon.svg" alt="AO" class="mx-auto mb-4 h-12 w-12" />
          <h3 class="mb-2 text-xl font-bold">Decentralized Infrastructure</h3>
          <p class="text-gray-600 dark:text-gray-300">
            Computation happens through a decentralized network, ensuring independence and
            reliability.
          </p>
        </div>
      </div>
    </div>
  </section>

  <!-- Add How It Works Section -->
  <section class="bg-gray-50 py-16 dark:bg-gray-800">
    <div class="container mx-auto px-4">
      <div class="mb-8 text-center lg:mb-16">
        <div class="mx-auto max-w-2xl">
          <Heading tag="h2" class="mb-4">How It Works</Heading>
        </div>
      </div>

      <div class="grid grid-cols-1 gap-12 md:grid-cols-3">
        <!-- Step 1 -->
        <div class="text-center md:text-left">
          <div class="text-primary-600 dark:text-primary-500 mb-2 text-2xl font-bold">1</div>
          <h3 class="mb-2 text-xl font-bold">Track Events</h3>
          <p class="text-gray-600 dark:text-gray-300">
            Add our privacy-preserving script to your site and it will generate a random crypto
            wallet that sends events to the AO network.
          </p>
        </div>

        <!-- Step 2 -->
        <div class="text-center md:text-left">
          <div class="text-primary-600 dark:text-primary-500 mb-2 text-2xl font-bold">2</div>
          <h3 class="mb-2 text-xl font-bold">Real-Time Metrics</h3>
          <p class="text-gray-600 dark:text-gray-300">
            Your dispatcher process will pick up user events and relay them to report processes that
            calculate metrics.
          </p>
        </div>

        <!-- Step 3 -->
        <div class="text-center md:text-left">
          <div class="text-primary-600 dark:text-primary-500 mb-2 text-2xl font-bold">3</div>
          <h3 class="mb-2 text-xl font-bold">View Reports</h3>
          <p class="text-gray-600 dark:text-gray-300">
            You can view the report metrics via a decentralized web app that fetches data from the
            AO network.
          </p>
        </div>
      </div>
    </div>
  </section>
</div>

<Modal title="Accounts" bind:open={showAccountsModal}>
  {#if appState.registry.accounts.length === 0}
    <P class="mb-4 text-lg">You are not a team member of any account yet.</P>
    <P class="text-lg">Create one to get started!</P>
  {:else}
    <P class="text-lg">You are a team member of the following accounts:</P>
    <Listgroup>
      {#each appState.registry.accounts as account}
        <ListgroupItem>
          <A href="{account.processId}/dashboard" class="text-lg">{account.name}</A>
        </ListgroupItem>
      {/each}
    </Listgroup>
  {/if}

  <form onsubmit={createAccount} class="pt-5">
    <ButtonGroup class="w-full">
      <Input
        type="text"
        placeholder="Enter account name..."
        bind:value={newAccountName}
        disabled={!!appState.registry.loading}
        class="text-lg"
        required
      />
      <Button
        type="submit"
        onclick={createAccount}
        disabled={!newAccountName || !!appState.registry.loading}
        color="primary"
        class="w-full text-lg"
      >
        Create New Account
        {#if appState.registry.loading}
          &nbsp;<Spinner />
        {/if}
      </Button>
    </ButtonGroup>
    <Helper>Initializing a new account can take a minute.</Helper>
  </form>
</Modal>
