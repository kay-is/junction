<script lang="ts">
  import { ArconnectSigner, TurboFactory } from '@ardrive/turbo-sdk/web'
  import AppState from '$lib/appState.svelte'
  import type { Page } from '$lib/accountClient'
  import {
    Helper,
    Badge,
    Breadcrumb,
    BreadcrumbItem,
    Button,
    ButtonGroup,
    Heading,
    Input,
    InputAddon,
    Label,
    P,
    Select,
    Textarea
  } from 'flowbite-svelte'
  import { goto } from '$app/navigation'

  const templates = [
    { value: 1, name: 'Minimalist' },
    { value: 2, name: 'Brutalist' },
    { value: 3, name: 'Permahills' },
    { value: 4, name: 'Retro-Arcade' },
    { value: 5, name: 'Soft-Gradient' }
  ]

  const path = document.location.pathname.split('/')
  const pageId = path.pop() as string
  const accountName = path.pop() as string

  if (AppState.account.status === 'empty') AppState.account.load(accountName)

  const page = $derived(AppState.account.info.Pages[pageId])

  async function previewPage() {
    const template = await fetch(`/templates/${page.TemplateId}/index.html`).then((r) => r.text())
    const html = parseTemplate(template, page)
    const file = htmlToFile(html)
    window.open(URL.createObjectURL(file), '_blank')
    await AppState.account.updatePage(page)
  }

  async function publishPage() {
    const turbo = TurboFactory.authenticated({
      signer: new ArconnectSigner(AppState.wallet.signer)
    })

    const template = await fetch(`/templates/${page.TemplateId}/index.html`).then((r) => r.text())

    const html = parseTemplate(template, page)
    const file = htmlToFile(html)

    const result = await turbo.uploadFile({
      fileStreamFactory: () => file.stream() as unknown as Buffer,
      fileSizeFactory: () => file.size,
      dataItemOpts: {
        tags: [{ name: 'Content-Type', value: 'text/html' }]
      }
    })

    if (page.ArnsName)
      await AppState.account.assignArnsName(result.id, page.ArnsName, page.Undername)

    page.PublicationTxId = result.id
    page.PublicationTime = Date.now()

    await AppState.account.updatePage(page, true)
  }

  function htmlToFile(html: string) {
    const blob = new Blob([html], { type: 'text/html' })
    return new File([blob], 'index.html', { type: 'text/html' })
  }

  function parseTemplate(template: string, page: Page) {
    return template
      .replaceAll('{{accountId}}', AppState.account.processId)
      .replaceAll('{{pageId}}', page.Id)
      .replaceAll('{{title}}', page.Title)
      .replaceAll('{{description}}', page.Description)
      .replaceAll('{{avatarImageUrl}}', 'https://ar-io.dev/' + page.AvatarImageId)
      .replaceAll('{{paymentAddress}}', page.PaymentAddress)
      .replaceAll(
        '{{links}}',
        page.Links.map(
          (link) => `<a href="${link.Url}" target="_blank" class="button">${link.Title}</a>`
        ).join('')
      )
  }
</script>

<div class="mx-auto max-w-4xl px-5 pt-5">
  <Breadcrumb aria-label="Default breadcrumb">
    <Button
      outline
      size="xs"
      onclick={async () => {
        await AppState.wallet.disconnect()
        goto('/')
      }}>Log Out</Button
    >
    <BreadcrumbItem href={`/dashboard/${accountName}`}>Account</BreadcrumbItem>
    <BreadcrumbItem>Page</BreadcrumbItem>
  </Breadcrumb>
  <Heading tag="h2" class="mb-5">
    Page
    {#if page.PublicationTxId}
      <Badge color="blue">
        Published ({new Date(page.PublicationTime).toLocaleString()})
      </Badge>
    {:else}
      <Badge color="red">Unpublished</Badge>
    {/if}
    {#if page.UpdatedTime > page.PublicationTime}
      <Badge color="yellow">Unpublished Changes</Badge>
    {/if}
  </Heading>

  {#if page.PublicationTxId}
    <P class="mb-2 text-lg">
      <b>Publication URLs:</b>
      <br />
      {#if page.Undername}
        ArNS: <a
          href={`https://${page.Undername + '_' + page.ArnsName}.ar.io`}
          target="_blank"
          class="underline"
        >
          {`${page.Undername + '_' + page.ArnsName}.ar.io`}
        </a> <span class="text-xs">(Can take ~15 minutes to update.)</span>
      {:else if page.ArnsName}
        <a href={`https://${page.ArnsName}.ar.io`} target="_blank" class="underline">
          {`${page.ArnsName}.ar.io`}
        </a> <span class="text-xs">(Can take ~15 minutes to update.)</span>
      {/if}
      <br />
      Plain:
      <a href={`https://ar-io.dev/${page.PublicationTxId}`} target="_blank" class="underline">
        ar-io.dev/{page.PublicationTxId}
      </a>
    </P>
  {/if}

  {#if !AppState.account.info && AppState.account.loading}
    <P>Loading...</P>
  {:else if !page}
    <P>Page not found!</P>
  {:else}
    <form onsubmit={publishPage}>
      <div class="mb-2">
        <Label>Title</Label>
        <Input bind:value={page.Title} size="lg" />
      </div>
      <div class="mb-2">
        <Label>Description</Label>
        <Textarea bind:value={page.Description} size="lg" />
      </div>
      <div class="mb-2">
        <Label>Avatar Image</Label>
        <Select
          bind:value={page.AvatarImageId}
          items={Object.entries(AppState.account.info.AvatarImages).map(([imageId, image]) => ({
            value: image.TxId,
            name: image.Title
          }))}
          size="lg"
        />
      </div>
      <div class="mb-2">
        <Label>Payment Address</Label>
        <Select
          bind:value={page.PaymentAddress}
          items={Object.entries(AppState.account.info.PaymentAddresses).map(([address, name]) => ({
            value: address,
            name: name
          }))}
          placeholder="Select Payment Address..."
          size="lg"
        />
        <Helper class="text-sm">Arweave wallet address to receive payments.</Helper>
      </div>
      <div class="mb-2">
        <Label>ArNS Name</Label>
        <ButtonGroup class="w-full">
          <Input
            bind:value={page.Undername}
            type="text"
            placeholder="Enter optional undername..."
            disabled={!page.ArnsName}
            size="lg"
          />
          <InputAddon>_</InputAddon>
          <Select
            bind:value={page.ArnsName}
            onchange={() => (page.Undername = '')}
            placeholder="Select ArNS Name..."
            items={[
              { name: 'None', value: '' },
              ...Object.keys(AppState.account.info.ArnsNames).map((arnsName) => ({
                value: arnsName,
                name: arnsName
              }))
            ]}
            size="lg"
            class="rounded-l-none"
          />
        </ButtonGroup>
        <Helper class="text-sm"
          >Allowed characters: a-z, 0-9, -. Will override existing pages that use the same
          domain+undername combination.</Helper
        >
      </div>
      <div class="mb-2">
        <Label>Links</Label>
        {#each page.Links as link, i}
          <div class="mb-5">
            <Input bind:value={link.Title} required size="lg" placeholder="Enter link title..." />
            <Input bind:value={link.Url} required size="lg" placeholder="Enter link URL..." />

            <Button
              size="lg"
              on:click={() => page.Links.splice(i, 1)}
              outline
              color="red"
              class="w-full"
            >
              Remove
            </Button>
          </div>
        {/each}
        <Button
          onclick={() => page.Links.push({ Title: 'New Link', Url: '' })}
          size="lg"
          class="mt-2 w-full"
          color="alternative"
        >
          Add Link
        </Button>
      </div>
      <div class="mb-2">
        <Label>Theme</Label>
        <Select
          bind:value={page.TemplateId}
          items={templates}
          placeholder="Select template..."
          size="lg"
        />
      </div>
      <ButtonGroup class="mb-10 w-full">
        <Button onclick={previewPage} size="lg" class="mt-5 w-full">Save & Preview</Button>
        <Button type="submit" size="lg" color="primary" class="mt-5 w-full">Save & Publish</Button>
      </ButtonGroup>
    </form>
  {/if}
</div>
