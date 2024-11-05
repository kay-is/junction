<script lang="ts">
  import { goto } from '$app/navigation'
  import AppState from '$lib/appState.svelte'
  import { createAccount, getAccountByName, getAccountByUserAddress } from '$lib/registryClient'
  import {
    Alert,
    Heading,
    P,
    Button,
    ButtonGroup,
    Modal,
    Label,
    Input,
    Helper
  } from 'flowbite-svelte'

  let showSignUpModal = $state(false)
  let error = $state('')

  let loginLoading = $state(false)
  async function login() {
    loginLoading = true

    await AppState.wallet.connect()
    try {
      const account = await getAccountByUserAddress(AppState.wallet.address)
      goto('/dashboard/' + account.Name)
    } catch (e: any) {
      if (e.message === 'Failed to fetch') error = 'Network error. Please try again.'
      else error = 'Unknown account. Please sign up.'
      showSignUpModal = true
    }

    loginLoading = false
  }

  let accountName = $state('')
  let signupLoading = $state(false)
  async function signup(event: Event) {
    event.preventDefault()
    signupLoading = true
    await AppState.wallet.connect()
    try {
      await getAccountByUserAddress(AppState.wallet.address)
      error = 'You already have an account. Please try another address.'
    } catch (e: any) {
      if (e.message === 'Failed to fetch') {
        error = 'Network error. Please try again.'
        showSignUpModal = true
        return
      }
      try {
        await getAccountByName(accountName)
        error = 'Account name is already taken. Please try another one.'
      } catch (e: any) {
        if (e.message === 'Failed to fetch') {
          error = 'Network error. Please try again.'
          showSignUpModal = true
          return
        }
        const account = await createAccount(accountName)
        goto('/dashboard/' + account.Name)
      }
    }
    signupLoading = false
  }
</script>

<div class="mx-auto mt-20 max-w-4xl px-5">
  <Heading tag="h1" class="mb-4 text-center">JUNCTION</Heading>
  <P class="mb-6 text-center text-lg sm:px-16 lg:text-xl xl:px-48 dark:text-gray-400">
    Share your links and get paid!
  </P>

  <ButtonGroup class="w-full">
    <Button disabled={loginLoading} onclick={login} size="lg" color="primary" class="mb-5 w-full">
      Log in
    </Button>
    <Button
      disabled={loginLoading}
      onclick={() => (showSignUpModal = true)}
      size="lg"
      class="mb-5 w-full"
    >
      Sign Up
    </Button>
  </ButtonGroup>
  <Modal title="Create Account" bind:open={showSignUpModal} size="xs" outsideclose class="w-full">
    {#if error !== ''}
      <Alert color="red" class="mb-5">{error}</Alert>
    {/if}
    <form onsubmit={signup}>
      <Label for="accountName">Account Name</Label>
      <Input
        id="accountName"
        type="text"
        pattern="[a-z0-9\-]*"
        bind:value={accountName}
        size="lg"
        placeholder="Enter account name..."
        required
        disabled={signupLoading}
      />
      <Helper size="xs" class="mb-5">(a-z, 0-9, -)</Helper>
      <Button type="submit" size="lg" class="w-full" disabled={signupLoading}>
        Create Account
      </Button>
    </form>
  </Modal>
</div>
