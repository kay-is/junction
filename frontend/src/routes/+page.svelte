<script lang="ts">
  import AppState from '$lib/appState.svelte'
  import {
    Heading,
    P,
    Button,
    Modal,
    Listgroup,
    ListgroupItem,
    A,
    Badge,
    ButtonGroup,
    Input,
    Helper
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
    newAccountName = ''
  }

  $effect(() => {
    if (AppState.wallet.connected) AppState.accounts.load()
  })
</script>

<div class="flex h-screen items-center justify-center">
  <div>
    <Heading tag="h1" class="mb-4 text-center">Junction Web Analytics</Heading>
    <P class="mb-4 text-center text-xl">Learn what users want.</P>
    <Button onclick={getStarted} size="lg" color="primary" class="w-full">Get Started</Button>
  </div>
</div>

<Modal title="Accounts" bind:open={showAccountsModal} autoclose outsideclose>
  {#if AppState.accounts.list.length === 0}
    <P class="mb-4 text-lg">You are not a team member of any accounts yet.</P>
    <P class="text-lg">Create your own to get started!</P>
  {:else}
    <P class="text-lg">You are a team member of the following accounts:</P>
    <Listgroup>
      {#each AppState.accounts.list as account}
        <ListgroupItem>
          {#if account.status === 'pending'}
            <span class="text-lg">{account.name}</span>
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
      <Button type="submit" onclick={createAccount} class="w-full text-lg" color="primary">
        Create New Account
      </Button>
    </ButtonGroup>
    <Helper>Initializing a new account can take a few minutes.</Helper>
  </form>
</Modal>
