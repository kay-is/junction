<script lang="ts">
  import * as AppState from '$lib/state/app.svelte'
  import { Section, HeroHeader } from 'flowbite-svelte-blocks'
  import {
    P,
    Button,
    Modal,
    Listgroup,
    ListgroupItem,
    A,
    Badge,
    ButtonGroup,
    Input,
    Helper,
    Spinner
  } from 'flowbite-svelte'

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

<div class="pt-40">
  <Section name="heroDefault">
    <HeroHeader>
      <svelte:fragment slot="h1">
        Junction Onchain Web Analytics <Badge>alpha</Badge>
      </svelte:fragment>
      <svelte:fragment slot="paragraph">
        The anonymous web analytics platform, powered by Arweave and AO,<br /> that gives you the insights
        you need without compromising on privacy.
      </svelte:fragment>
    </HeroHeader>

    <div
      class="mb-8 flex flex-col space-y-4 sm:flex-row sm:justify-center sm:space-x-4 sm:space-y-0 lg:mb-16"
    >
      <Button size="xl" onclick={getStarted} class="w-6/12">Get Started</Button>
    </div>
  </Section>
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
          <A href="dashboard/{account.processId}" class="text-lg">{account.name}</A>
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
