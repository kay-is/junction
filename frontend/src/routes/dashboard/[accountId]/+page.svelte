<script lang="ts">
  import Sidebar from '$lib/components/Sidebar.svelte'
  import { Heading } from 'flowbite-svelte'
  import * as AppState from '$lib/state/app.svelte'
  import Datepicker from '$lib/components/Datepicker.svelte'
  import Debug from '$lib/components/reportViews/Debug.svelte'
  import OverallPerDay from '$lib/components/reportViews/OverallPerDay.svelte'
  import TopPages from '$lib/components/reportViews/TopPages.svelte'
  import HeatMap from '$lib/components/reportViews/HeatMap.svelte'

  const appState = AppState.getContext()

  appState.account.load()
</script>

<div class="flex">
  <Sidebar />

  <div class="container px-10 pt-5">
    <Heading class="mb-2">
      {appState.account.name}
    </Heading>
    <Datepicker />

    <div class="grid-rows-* grid grid-cols-4 gap-4">
      <OverallPerDay />
      <HeatMap />
      <TopPages />
      <Debug />
    </div>
  </div>
</div>
