<script lang="ts">
  import { Heading, Spinner } from 'flowbite-svelte'
  import Sidebar from '../../Sidebar.svelte'

  import Datepicker from './Datepicker.svelte'
  import Timeline from './reportViews/PagesTimeline.svelte'
  import Table from './reportViews/PagesTable.svelte'
  import HeatMap from './reportViews/PagesHeatMap.svelte'

  import * as AppState from '$lib/state/app.svelte'
  const appState = AppState.getContext()
  const report = $derived(appState.account.reports['report-pages'])
  appState.account.load()

  let once = false
  $effect(() => {
    if (report && !once) {
      report.loadRecords('current', appState.date.currentStart, appState.date.currentEnd)
      report.loadRecords('reference', appState.date.referenceStart, appState.date.referenceEnd)
      once = true
    }
  })
</script>

<div class="flex">
  <Sidebar />

  <div class="container px-10 pt-5">
    <Heading class="mb-2">
      Dashboard
      {#if appState.account.loading || (report && report.loading)}<Spinner />{/if}
    </Heading>

    {#if report}
      <Datepicker date={appState.date} activeReports={[report]} />
      <div class="grid-rows-* grid grid-cols-4 gap-4">
        <Timeline {report} date={appState.date} />
        <HeatMap {report} date={appState.date} />
        <Table {report} date={appState.date} />
      </div>
    {/if}
  </div>
</div>
