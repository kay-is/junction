<script lang="ts">
  import AppState from '$lib/appState.svelte'
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

  let showAccountsModal = $state(false)

  const getStarted = async () => {
    await AppState.wallet.connect()
    showAccountsModal = true
  }

  let newAccountName = $state('')
  const createAccount = async (e: Event) => {
    e.preventDefault()
    await AppState.accounts.register(newAccountName)
    const accountNameSnapshot = $state.snapshot(newAccountName)
    newAccountName = ''

    const interval = setInterval(async () => {
      await AppState.accounts.load()
      const newAccount = AppState.accounts.list.find(
        (account) => account.name === accountNameSnapshot && account.status === 'ready'
      )
      if (newAccount) clearInterval(interval)
    }, 10000)
  }

  $effect(() => {
    if (AppState.wallet.connected) AppState.accounts.load()
  })
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
  {#if AppState.accounts.list.length === 0}
    <P class="mb-4 text-lg">You are not a team member of any accounts yet.</P>
    <P class="text-lg">Create your own to get started!</P>
  {:else}
    <P class="text-lg">You are a team member of the following accounts:</P>
    <Listgroup>
      {#each AppState.accounts.list as account}
        <ListgroupItem>
          {#if account.status === 'pending'}
            <span class="text-lg">{account.name} <Spinner size={5} /></span>
            <Badge color="yellow">initializing</Badge>
          {:else}
            <A href="dashboard/{account.id}" class="text-lg">{account.name}</A>
          {/if}
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
        class="text-lg"
        required
      />
      <Button
        type="submit"
        onclick={createAccount}
        disabled={!newAccountName}
        color="primary"
        class="w-full text-lg"
      >
        Create New Account
      </Button>
    </ButtonGroup>
    <Helper>Initializing a new account can take a minute.</Helper>
  </form>
</Modal>
