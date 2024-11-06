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
  <P class="mb-6 text-center text-xl sm:px-16 lg:text-xl xl:px-48 dark:text-gray-400">
    Share your links and get paid!
  </P>

  <P class="mb-2 mt-10 text-lg">Are you a content creator who wants to monitize their work?</P>
  <P class="mb-2 text-lg">Do you need a quick way to share links and fear censorship?</P>
  <P class="mb-2 text-lg">Try out Junction: The permanent link-site builder on the Permaweb!</P>
  <P class="mb-2 text-lg">...crypto wallet optional.</P>

  <ButtonGroup class="mt-20 w-full">
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

  <div class="mt-20 flex">
    <div class="flex-col pr-5 pt-5">
      <Heading tag="h3" class="mb-4">Login Without Installing a Wallet</Heading>
      <P class="mb-2 text-lg">
        If you don't have an Arweave wallet, use Web2 authentication providers or your email to get
        started.
      </P>
    </div>
    <div>
      <img src="/images/walletless.png" alt="walletless" class="max-w-lg rounded-lg border" />
    </div>
  </div>

  <div class="mt-20 flex">
    <div>
      <img src="/images/analytics.png" alt="Analyitics" class="max-w-lg rounded-lg border" />
    </div>
    <div class="flex-col pl-5 pt-5">
      <Heading tag="h3" class="mb-4">AO Powered Web Analytics</Heading>
      <P class="mb-2 text-lg">
        Each view, click, and tip is an message to your account process on AO, that will aggregate
        user interactions.
      </P>
      <P class="mb-2 text-lg">Get the data that shows which links your users love.</P>
      <P class="mb-2 text-lg">...and what they think they're worth!</P>
    </div>
  </div>

  <div class="mt-20 flex justify-between">
    <div class="flex-col pr-5 pt-5">
      <Heading tag="h3" class="mb-4">Astro Powered Tipping</Heading>
      <P class="mb-2 text-lg">Let your users show their appreciation.</P>
      <P class="mb-2 text-lg">Receive tips in Quantum Arweave, the AR token on AO.</P>
    </div>
    <div>
      <img src="/images/tipping.png" alt="Tipping" class="max-w-lg rounded-lg border" />
    </div>
  </div>

  <Heading tag="h2" class="mb-4 mt-20 ">Five Themes Available</Heading>
  <div class="flex">
    <div>
      <img src="/images/minimalism.png" alt="minimalism" class="max-w-lg rounded-lg border" />
    </div>
    <div class="flex-col pl-5 pt-5">
      <Heading tag="h3" class="mb-4">Minimalism</Heading>
      <P class="mb-2 text-lg">Minimal styling, for a more mature look.</P>
    </div>
  </div>
  <div class="mt-10 flex justify-between">
    <div class="flex-col pr-5 pt-5">
      <Heading tag="h3" class="mb-4">Retro-Arcade</Heading>
      <P class="mb-2 text-lg">For all the gamers out there.</P>
    </div>
    <div>
      <img src="/images/retroarcade.png" alt="retroarcade" class="max-w-lg rounded-lg border" />
    </div>
  </div>
  <div class="mt-10 flex">
    <div>
      <img src="/images/permahills.png" alt="permahills" class="max-w-lg rounded-lg border" />
    </div>
    <div class="flex-col pl-5 pt-5">
      <Heading tag="h3" class="mb-4">Permahills</Heading>
      <P class="mb-2 text-lg">A little bit dreamy.</P>
    </div>
  </div>
  <div class="mt-10 flex justify-between">
    <div class="flex-col pl-5 pt-5">
      <Heading tag="h3" class="mb-4">Softgradient</Heading>
      <P class="mb-2 text-lg">With a touch of rose in the sky.</P>
    </div>
    <div>
      <img src="/images/softgradient.png" alt="softgradient" class="max-w-lg rounded-lg border" />
    </div>
  </div>
  <div class="mb-10 mt-10 flex">
    <div>
      <img src="/images/brutalism.png" alt="brutalism" class="max-w-lg rounded-lg border" />
    </div>
    <div class="flex-col pl-5 pt-5">
      <Heading tag="h3" class="mb-4">Brutalism</Heading>
      <P class="mb-2 text-lg">Art.</P>
    </div>
  </div>

  <Heading tag="h3" class="mb-4">Still Not Convinced?</Heading>
  <P class="mb-20 text-lg">Okay 🤷‍♂️</P>

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
