<script lang="ts">
  import { goto } from '$app/navigation'
  import AppState from '$lib/appState.svelte'
  import { ArconnectSigner, TurboFactory } from '@ardrive/turbo-sdk/web'
  import {
    A,
    Alert,
    Badge,
    BottomNav,
    BottomNavItem,
    Breadcrumb,
    BreadcrumbItem,
    Card,
    Fileupload,
    Heading,
    Helper,
    P,
    Button,
    ButtonGroup,
    Input,
    Table,
    TableBody,
    TableBodyRow,
    TableBodyCell
  } from 'flowbite-svelte'

  const accountName = document.location.pathname.split('/').pop()
  $effect(() => {
    if (accountName) AppState.account.load(accountName)
  })

  let activeTab: 'analytics' | 'pages' | 'images' | 'arns' | 'payment' | 'members' = $state(
    (sessionStorage.getItem('currentAccountPage') as typeof activeTab) ?? 'pages'
  )
  $effect(() => {
    sessionStorage.setItem('currentAccountPage', activeTab)
  })

  const removePage = (pageId: string) => () => {
    if (!confirm('Do you really want to delete this page?')) return
    AppState.account.removePage(pageId)
  }

  let arnsName = $state('')
  let arnsError = $state('')
  const addArnsName = async (event: Event) => {
    event.preventDefault()
    arnsError = ''
    try {
      await AppState.account.addArnsName(arnsName)
    } catch (e: any) {
      arnsError = e.message
    }
    arnsName = ''
  }

  let paymentAddressName = $state('')
  let paymentAddress = $state('')
  const addPaymentAddress = async (event: Event) => {
    event.preventDefault()
    await AppState.account.addPaymentAddress(paymentAddressName, paymentAddress)
    paymentAddressName = ''
    paymentAddress = ''
  }
  const removePaymentAddress = (address: string) => async () => {
    await AppState.account.removePaymentAddress(address)
  }

  let memberName = $state('')
  let memberAddress = $state('')
  const addMember = async (event: Event) => {
    event.preventDefault()
    await AppState.account.addMember(memberName, memberAddress)
    memberName = ''
    memberAddress = ''
  }

  const removeMember = (address: string) => async () => {
    await AppState.account.removeMember(address)
  }

  let avatarImageTitle = $state('')
  let avatarImageFiles = $state<FileList | null>(null)
  const addAvatarImage = async (event: Event) => {
    event.preventDefault()

    if (!avatarImageFiles || avatarImageFiles.length < 1) return

    const turbo = TurboFactory.authenticated({
      signer: new ArconnectSigner(AppState.wallet.signer)
    })

    const imageFile = avatarImageFiles[0]

    const result = await turbo.uploadFile({
      fileStreamFactory: () => imageFile.stream() as unknown as Buffer,
      fileSizeFactory: () => imageFile.size,
      dataItemOpts: {
        tags: [{ name: 'Content-Type', value: imageFile.type }]
      }
    })

    await AppState.account.addAvatarImage(avatarImageTitle, result.id)

    avatarImageTitle = ''
    avatarImageFiles = null
  }

  const removeAvatarImage = (imageId: string) => async () => {
    await AppState.account.removeAvatarImage(imageId)
  }

  const analytics = $derived(AppState.account.info.Analytics)
</script>

<div class="mx-auto max-w-4xl px-5 pt-5">
  <Breadcrumb aria-label="Default breadcrumb example">
    <Button
      outline
      size="xs"
      onclick={async () => {
        await AppState.wallet.disconnect()
        goto('/')
      }}>Log Out</Button
    >
    <BreadcrumbItem>Account</BreadcrumbItem>
    {#if AppState.account.status === 'empty'}
      <Badge color="grey">empty</Badge>
    {:else if AppState.account.status === 'spawning'}
      <Badge color="red">spawning</Badge>
    {:else if AppState.account.status === 'initializing'}
      <Badge color="yellow">initializing</Badge>
    {/if}
  </Breadcrumb>

  {#if AppState.account.status !== 'ready'}
    <P class="mt-5">Please wait while your account gets initialized.</P>
  {:else if activeTab === 'analytics'}
    <Heading tag="h2" class="mb-5">Analytics</Heading>
    <P>Track your page views and clicks.</P>

    {#each Object.keys(AppState.account.info.Pages) as pageId}
      <Heading tag="h4" class="mb-2"
        ><A
          href="https://ar-io.net/{AppState.account.info.Pages[pageId].PublicationTxId}"
          target="_blank">{AppState.account.info.Pages[pageId].Title}</A
        ></Heading
      >
      {#if !analytics[pageId]}
        <P>Nobody visited this page yet.</P>
      {:else}
        <Table striped hoverable>
          <TableBody>
            {#each Object.entries(analytics[pageId]) as [element, operations]}
              {#each Object.entries(operations) as [operation, value]}
                <TableBodyRow>
                  <TableBodyCell>{element}</TableBodyCell>
                  <TableBodyCell
                    >{value}
                    {operation === 'tip'
                      ? 'qAR'
                      : operation === 'view'
                        ? 'Views'
                        : operation === 'click'
                          ? 'Clicks'
                          : ''}</TableBodyCell
                  >
                </TableBodyRow>
              {/each}
            {/each}
          </TableBody>
        </Table>
      {/if}
    {/each}
  {:else if activeTab === 'pages'}
    <Heading tag="h2" class="mb-5">Pages</Heading>

    <P class="mb-2">Create pages to share your links with the world.</P>
    <Button onclick={AppState.account.createPage} class="mb-5 w-full" color="primary" size="lg">
      Create Page
    </Button>
    {#each Object.entries(AppState.account.info.Pages) as [pageId, page]}
      <Input
        size="lg"
        value={page.Title +
          (page.PublicationTime
            ? ` (published at ${new Date(page.PublicationTime).toLocaleString()})`
            : ' (unpublished)')}
        defaultClass="w-full"
        disabled
      />
      <ButtonGroup class="mb-5 w-full">
        <Button
          size="lg"
          href={`${document.location.pathname}/${pageId}`}
          outline
          color="primary"
          class="w-full"
        >
          Edit
        </Button>
        <Button size="lg" outline color="red" onclick={removePage(pageId)} class="w-full">
          Delete
        </Button>
      </ButtonGroup>
    {/each}
  {:else if activeTab === 'arns'}
    <Heading tag="h2" class="mb-5">ArNS</Heading>
    <P class="mb-2">Add your ArNS names to make your pages easier to share.</P>
    <form onsubmit={addArnsName}>
      {#if arnsError}
        <Alert color="red" class="mb-2">{arnsError}</Alert>
      {/if}
      <Input
        size="lg"
        bind:value={arnsName}
        placeholder="Enter ArNS Name..."
        required
        disabled={AppState.account.loading}
      />
      <Helper class="mb-2 text-xs"
        >Don't have an ArNS name? Buy one <A href="https://arns.app/">here</A>!</Helper
      >
      <Button
        type="submit"
        size="lg"
        color="primary"
        disabled={AppState.account.loading}
        class="mb-5 w-full"
      >
        Add ArNS Name
      </Button>
    </form>
    {#each Object.entries(AppState.account.info.ArnsNames) as [name]}
      <Input
        size="lg"
        value={name +
          ` (used by ${Object.values(AppState.account.info.Pages).reduce((sum, page) => {
            return page.ArnsName === name ? sum + 1 : sum
          }, 0)} pages)`}
        defaultClass="w-full"
        disabled
      />
      <ButtonGroup class="mb-5 w-full">
        <Button
          size="lg"
          href={`https://arns.app/#/manage/names/${name}`}
          target="_blank"
          outline
          color="light"
          class="w-full"
        >
          Manage
        </Button>
        <Button
          outline
          color="red"
          onclick={() => AppState.account.removeArnsName(name)}
          class="w-full"
        >
          Remove
        </Button>
      </ButtonGroup>
    {/each}
  {:else if activeTab === 'images'}
    <Heading tag="h2" class="mb-5">Images</Heading>
    <P class="mb-2">Upload avatars to use them on your pages.</P>
    <form onsubmit={addAvatarImage}>
      <Input
        bind:value={avatarImageTitle}
        size="lg"
        placeholder="Title"
        required
        disabled={AppState.account.loading}
      />
      <Fileupload
        bind:files={avatarImageFiles}
        accept="image/*"
        required
        disabled={AppState.account.loading}
      />
      <Helper class="mb-2 text-xs"
        >Uploads under 100KB are free. Otherwise, learn how to get Turbo Credits <A
          href="https://www.youtube.com/watch?v=H3GuC033w5o">this video</A
        >!</Helper
      >
      <Button
        type="submit"
        size="lg"
        color="primary"
        class="mb-5 w-full"
        disabled={AppState.account.loading}>Upload Image</Button
      >
    </form>
    <div class="mb-20">
      {#each Object.entries(AppState.account.info.AvatarImages) as [imageId, image]}
        <Card img="https://ar-io.dev/{image.TxId}">
          <h5 class="mb-2 text-xl">Title: {image.Title}</h5>
          <Button onclick={removeAvatarImage(imageId)} size="lg" outline color="red" class="w-full"
            >Remove</Button
          >
        </Card>
      {/each}
    </div>
  {:else if activeTab === 'payment'}
    <Heading tag="h2" class="mb-5">Payment</Heading>
    <P class="mb-2">
      Add Arweave wallet addresses to use them to your pages and receive tips in qAR.
    </P>
    <P class="mb-2">
      You can learn more about qAR
      <A href="https://docs.astrousd.com/quantum/what-is-quantum/q-arweave-qar" target="_blank">
        here
      </A>.
    </P>
    <form onsubmit={addPaymentAddress}>
      <ButtonGroup class="mb-2 w-full" size="lg">
        <Input bind:value={paymentAddressName} size="lg" placeholder="Name" required />
        <Input bind:value={paymentAddress} size="lg" placeholder="Address" required />
      </ButtonGroup>
      <Button type="submit" size="lg" color="primary" class="mb-5 w-full">Add Address</Button>
    </form>
    {#each Object.entries(AppState.account.info.PaymentAddresses) as [address, name]}
      <ButtonGroup class="w-full">
        <Input size="lg" placeholder="Name" value={name} disabled defaultClass="w-full" />
        <Input size="lg" placeholder="Address" value={address} disabled defaultClass="w-full" />
      </ButtonGroup>
      <Button
        size="lg"
        onclick={removePaymentAddress(address)}
        outline
        color="red"
        class="mb-5 w-full">Remove</Button
      >
    {/each}
  {:else if activeTab === 'members'}
    <Heading tag="h2" class="mb-5">Members</Heading>
    <P class="mb-2">Add other users, so you can manage your pages together.</P>
    <form onsubmit={addMember}>
      <ButtonGroup class="mb-2 w-full">
        <Input size="lg" placeholder="Name" required />
        <Input size="lg" placeholder="Address" required />
      </ButtonGroup>
      <Button type="submit" size="lg" color="primary" class="mb-5 w-full">Add Member</Button>
    </form>
    {#each Object.entries(AppState.account.info.Members) as [address, name]}
      <ButtonGroup class="w-full">
        <Input size="lg" placeholder="Name" value={name} disabled defaultClass="w-full" />
        <Input size="lg" placeholder="Address" value={address} disabled defaultClass="w-full" />
      </ButtonGroup>
      <Button onclick={removeMember(address)} size="lg" outline color="red" class="mb-5 w-full">
        Remove
      </Button>
    {/each}
  {/if}
</div>

<BottomNav classInner="grid-cols-6">
  <BottomNavItem onclick={() => (activeTab = 'analytics')} btnName="Analytics" />
  <BottomNavItem
    onclick={() => (activeTab = 'pages')}
    btnName={`Pages (${Object.values(AppState.account.info.Pages).length})`}
  />
  <BottomNavItem
    onclick={() => (activeTab = 'images')}
    btnName={`Images (${Object.values(AppState.account.info.AvatarImages).length})`}
  />
  <BottomNavItem
    onclick={() => (activeTab = 'arns')}
    btnName={`ArNS (${Object.values(AppState.account.info.ArnsNames).length})`}
  />
  <BottomNavItem
    onclick={() => (activeTab = 'payment')}
    btnName={`Payment (${Object.values(AppState.account.info.PaymentAddresses).length})`}
  />
  <BottomNavItem
    onclick={() => (activeTab = 'members')}
    btnName={`Members (${Object.values(AppState.account.info.Members).length})`}
  />
</BottomNav>
