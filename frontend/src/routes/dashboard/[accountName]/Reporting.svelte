<script lang="ts">
  import TopPagesReport from './TopPagesReport.svelte'

  import { Datepicker, Heading } from 'flowbite-svelte'
  import AppState from '$lib/appState.svelte'
  import HourlyChartReport from './OverallReport.svelte'
  const accountId = document.location.pathname.split('/').pop()
  if (accountId) AppState.account.load(accountId)

  const yesterday = new Date()
  yesterday.setDate(yesterday.getDate() - 1)
  yesterday.setHours(0, 0, 0, 0)
  let selectedStart = $state(yesterday)
  let selectedStop = $state(new Date())

  let reportStart = $state(yesterday)
  let reportStop = $state(new Date())

  const loadRecords = async () => {
    reportStart = selectedStart
    // include the whole day of the stop date
    reportStop = new Date(selectedStop.getTime() + 24 * 60 * 60 * 1000 - 1)
  }
</script>

<div class="container px-10 pt-5">
  <Heading class="mb-4">
    {AppState.account.name}
  </Heading>
  <div class="max-w-md">
    <Datepicker
      showActionButtons
      range
      bind:rangeFrom={selectedStart}
      bind:rangeTo={selectedStop}
      on:apply={loadRecords}
    />
  </div>

  <div class="mt-10">
    {#each Object.values(AppState.account.reports) as report}
      {#await report.loadRecords(reportStart, reportStop)}
        <p>Loading...</p>
      {:then}
        <HourlyChartReport records={report.records} />
        <TopPagesReport records={report.records} />
      {/await}
    {/each}
  </div>
</div>
