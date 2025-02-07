<script lang="ts">
  import { Heading, Spinner } from 'flowbite-svelte'
  import Sidebar from '../../Sidebar.svelte'

  import Datepicker from './Datepicker.svelte'
  import Timeline from './reportViews/PagesTimeline.svelte'
  import Table from './reportViews/PagesTable.svelte'
  import HeatMap from './reportViews/PagesHeatMap.svelte'

  import * as AppState from '$lib/state/app.svelte'
  import PieChart from './reportViews/PieChart.svelte'
  import GatewaysTable from './reportViews/GatewaysTable.svelte'
  const appState = AppState.getContext()

  appState.account.load()

  let once = false
  $effect(() => {
    if (!once) {
      appState.account.reportsArray.forEach((report) => {
        report.loadRecords('current', appState.date.currentStart, appState.date.currentEnd)
        report.loadRecords('reference', appState.date.referenceStart, appState.date.referenceEnd)
      })
      once = true
    }
  })
</script>

<svelte:head>
  <title>Dashboard - Junction</title>
</svelte:head>

<div class="flex">
  <Sidebar />

  <div class="container px-10 pt-5">
    <Heading class="mb-2">
      Dashboard
      {#if appState.account.loading}<Spinner />{/if}
    </Heading>

    <Datepicker date={appState.date} activeReports={Object.values(appState.account.reports)} />

    <div class="grid-rows-* grid grid-cols-4 gap-4">
      {#if appState.account.reports['report-pages']}
        <Timeline report={appState.account.reports['report-pages']} date={appState.date} />
        <HeatMap report={appState.account.reports['report-pages']} date={appState.date} />
        <Table report={appState.account.reports['report-pages']} date={appState.date} />
      {/if}
      {#if appState.account.reports['report-devices']}
        <PieChart
          title="Devices"
          report={appState.account.reports['report-devices']}
          date={appState.date}
        />
      {/if}
      {#if appState.account.reports['report-browsers']}
        <PieChart
          title="Browsers"
          report={appState.account.reports['report-browsers']}
          date={appState.date}
        />
      {/if}
      {#if appState.account.reports['report-wallets']}
        <PieChart
          title="Wallets"
          report={appState.account.reports['report-wallets']}
          date={appState.date}
        />
      {/if}

      {#if appState.account.reports['report-networks']}
        <PieChart
          title="Networks"
          report={appState.account.reports['report-networks']}
          date={appState.date}
        />
      {/if}

      {#if appState.account.reports['report-gateways']}
        <PieChart
          title="Gateways"
          report={appState.account.reports['report-gateways']}
          date={appState.date}
        />
        <GatewaysTable report={appState.account.reports['report-gateways']} date={appState.date} />
      {/if}
    </div>
  </div>
</div>
