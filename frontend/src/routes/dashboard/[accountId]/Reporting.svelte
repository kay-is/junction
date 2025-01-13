<script lang="ts">
  import TopPagesReport from './TopPagesReport.svelte'
  import { Datepicker, Heading, P, Spinner } from 'flowbite-svelte'
  import * as AppState from '$lib/state/app.svelte'
  import HourlyChartReport from './OverallReport.svelte'

  const appState = AppState.getContext()

  const todayStart = new Date()
  todayStart.setHours(0, 0, 0, 0)
  let selectedStart = $state(todayStart)
  // select stop should be the end of the current day

  const todayEnd = new Date()
  todayEnd.setHours(23, 59, 59, 999)
  let selectedStop = $state(todayEnd)

  let reportStart = $state(todayStart)
  let reportStop = $state(todayEnd)

  const loadRecords = async () => {
    reportStart = selectedStart
    // include the whole day of the stop date
    reportStop = new Date(selectedStop.getTime() + 24 * 60 * 60 * 1000 - 1)
  }
</script>

<div class="container px-10 pt-5">
  <Heading class="mb-4">
    {appState.account.name}
  </Heading>
  <P>{appState.account.description}</P>
  <div class="mt-5 flex w-full justify-around">
    <div class="basis-1/4">
      <Datepicker
        showActionButtons
        range
        bind:rangeFrom={selectedStart}
        bind:rangeTo={selectedStop}
        on:apply={loadRecords}
      />
    </div>
    &nbsp; &nbsp;
    <P class="mt-1 w-full basis-3/4 text-lg"
      ><b>Selected Period:</b> {reportStart.toLocaleString()} - {reportStop.toLocaleString()}</P
    >
  </div>

  <div class="mt-5">
    {#each Object.values(appState.account.reports) as report}
      {#await report.loadRecords(reportStart, reportStop)}
        <div class="flex h-64 items-center justify-center">
          <P class="text-xl font-bold"><Spinner /> Loading Reports...</P>
        </div>
      {:then}
        <HourlyChartReport records={report.records} />
        <TopPagesReport records={report.records} />
      {/await}
    {:else}
      <P>You don't have any reports yet. Add them in the settings!</P>
    {/each}
  </div>
</div>
