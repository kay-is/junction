<script lang="ts">
  import { Button, ButtonGroup, Heading, Input, InputAddon, P, Spinner } from 'flowbite-svelte'
  import AppState from '$lib/appState.svelte'
  import * as AoClient from '$lib/aoClient'
  const accountId = document.location.pathname.split('/').pop()
  if (accountId) AppState.account.load(accountId)

  const ReportCodeTxId = 'cYAhtE8HtuGl0VNoW4DBN8dsdKcDon7fhA1ZtM-2iIc'
  const addReport = (name: string) => async () => {
    await AppState.account.addReport(name, ReportCodeTxId)

    const interval = setInterval(async () => {
      if (accountId) await AppState.account.load(accountId)
      const newReport = AppState.account.reportInfos[name]
      if (newReport && newReport.status === 'ready') clearInterval(interval)
    }, 10000)
  }

  let eventLoading = $state(false)
  const sendTestEvent = async () => {
    eventLoading = true
    const timezoneOffset = new Date().getTimezoneOffset()
    await AoClient.request({
      processId: AppState.account.dispatcherId,
      signer: AppState.wallet.signer,
      tags: {
        Action: 'Track',
        ts: Date.now().toString(),
        ev: 'pv',
        url: 'https://example.com/',
        ua: navigator.userAgent,
        ad: AppState.wallet.address,
        la: navigator.language,
        tz:
          timezoneOffset > 0
            ? `UTC${(timezoneOffset * -1) / 60}`
            : `UTC+${(timezoneOffset * -1) / 60}`,
        'j-lt': '100'
      }
    })
    eventLoading = false
  }
</script>

<div class="container max-w-5xl pt-5">
  <Heading class="mb-5">Settings</Heading>

  <P>
    You can check the status of your account's AO processes here, send example events, and start
    reports.
  </P>

  <Heading tag="h2" class="mb-5">Account</Heading>
  <ButtonGroup class="w-full">
    <InputAddon>Name</InputAddon>
    <Input value={AppState.account.name} />
  </ButtonGroup>
  <ButtonGroup class="w-full">
    <InputAddon>Description</InputAddon>
    <Input value={AppState.account.description} />
  </ButtonGroup>
  <ButtonGroup class="w-full">
    <InputAddon>Process&nbsp;ID</InputAddon>
    <Input value={AppState.account.id} class="font-mono" />
  </ButtonGroup>

  <Heading tag="h2" class="my-5">Members</Heading>
  {#each Object.entries(AppState.account.members) as [address, name]}
    <ButtonGroup>
      <InputAddon>Name</InputAddon>
      <Input value={name} />
    </ButtonGroup>
    <ButtonGroup>
      <InputAddon>Address</InputAddon>
      <Input value={address} class="font-mono" />
    </ButtonGroup>
    <hr />
  {/each}

  <Heading tag="h2" class="my-5">Reports</Heading>
  {#if !AppState.account.reportInfos['top-pages']}
    <Button
      onclick={addReport('top-pages')}
      disabled={AppState.account.loading}
      size="lg"
      class="w-full">Add Reports</Button
    >
  {/if}
  {#each Object.values(AppState.account.reportInfos) as reportInfo}
    <ButtonGroup>
      <InputAddon>Name</InputAddon>
      <Input value={reportInfo.name} />
    </ButtonGroup>
    <ButtonGroup>
      <InputAddon>Process&nbsp;ID</InputAddon>
      <Input value={reportInfo.processId} class="font-mono" />
    </ButtonGroup>
    <ButtonGroup>
      <InputAddon>Status</InputAddon>
      <Input value={reportInfo.status} />
    </ButtonGroup>
    {#if reportInfo.status === 'pending'}
      <Spinner /> Waiting for initialization...
    {/if}
    {#if reportInfo.status === 'ready'}
      {#await AppState.account.reports[reportInfo.name].load()}
        <P>Loading...</P>
      {:then}
        <ButtonGroup>
          <InputAddon>Active&nbsp;Sessions</InputAddon>
          <Input value={AppState.account.reports[reportInfo.name].activeSessions} />
        </ButtonGroup>
        <ButtonGroup>
          <InputAddon>Processed&nbsp;Events</InputAddon>
          <Input value={AppState.account.reports[reportInfo.name].processedEvents} />
        </ButtonGroup>
        <ButtonGroup>
          <InputAddon>Max&nbsp;Record&nbsp;Age</InputAddon>
          <Input
            value={AppState.account.reports[reportInfo.name].recordsMaxAge / 1000 / 60 / 60 / 24 +
              ' days'}
          />
        </ButtonGroup>
        <ButtonGroup>
          <InputAddon>Memory&nbsp;Usage</InputAddon>
          <Input
            value={Math.round(AppState.account.reports[reportInfo.name].memoryUsed / 1024) + ' MB'}
          />
        </ButtonGroup>
        <hr class="my-5" />
      {/await}
    {/if}
  {/each}
  <Heading tag="h2" class="mb-5">Dispatcher</Heading>
  <Button onclick={sendTestEvent} size="lg" class="w-full" disabled={eventLoading}>
    Send Test Event
  </Button>
  <ButtonGroup class="w-full">
    <InputAddon>Process&nbsp;ID</InputAddon>
    <Input value={AppState.account.dispatcherId} class="font-mono" />
  </ButtonGroup>

  {#await AppState.dispatcher.load(AppState.account.dispatcherId)}
    <P>Loading...</P>
  {:then}
    <ButtonGroup class="w-full">
      <InputAddon>Name</InputAddon>
      <Input value={AppState.dispatcher.name} />
    </ButtonGroup>
    <ButtonGroup class="w-full">
      <InputAddon>Account&nbsp;ID</InputAddon>
      <Input value={AppState.dispatcher.accountId} class="font-mono" />
    </ButtonGroup>
    <ButtonGroup class="w-full">
      <InputAddon>Assigned&nbsp;Events</InputAddon>
      <Input value={AppState.dispatcher.assignedEventCount} class="font-mono" />
    </ButtonGroup>
    <ButtonGroup class="w-full">
      <InputAddon>Memory&nbsp;Usage</InputAddon>
      <Input value={Math.round(AppState.dispatcher.memoryUsed / 1024) + ' MB'} class="font-mono" />
    </ButtonGroup>
    {#each AppState.dispatcher.reports as reportProcessId}
      <ButtonGroup class="w-full">
        <InputAddon>Report&nbsp;ID</InputAddon>
        <Input value={reportProcessId} class="font-mono" />
      </ButtonGroup>
    {/each}
    <Heading tag="h3" class="mb-5">Report Errors</Heading>
    {#each AppState.dispatcher.reportErrors as error}
      <ButtonGroup class="w-full">
        <InputAddon>Time</InputAddon>
        <Input value={new Date(error.timestamp)} />
      </ButtonGroup>
      <ButtonGroup class="w-full">
        <InputAddon>Report&nbsp;ID</InputAddon>
        <Input value={error.processId} class="font-mono" />
      </ButtonGroup>
      <ButtonGroup class="w-full">
        <InputAddon>Message</InputAddon>
        <Input value={error.message} />
      </ButtonGroup>
    {/each}
  {/await}
</div>
