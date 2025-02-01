<script lang="ts">
  import { Card, Heading } from 'flowbite-svelte'
  import * as AppState from '$lib/state/app.svelte'

  const appState = AppState.getContext()
  const report = $derived(appState.account.reports['top-pages'])

  type HeatMapData = number[][] // [day][hour]

  const processRecords = (records: typeof report.currentRecordsArray): HeatMapData => {
    const heatmapData: number[][] = Array(24)
      .fill(0)
      .map(() => Array(7).fill(0))

    records.forEach((row) => {
      const date = new Date(row.timestamp)
      const day = date.getDay() // 0 (Sunday) - 6 (Saturday)
      const hour = date.getHours()

      Object.values(row.records).forEach((record) => {
        heatmapData[hour][day] += record.views
      })
    })

    return heatmapData
  }

  let maxViews = $state(1)
  let heatmapData = $state<HeatMapData>([])

  $effect(() => {
    if (!report) return

    heatmapData = processRecords(report.currentRecordsArray)
    maxViews = Math.max(...heatmapData.flat())
  })
</script>

<Card class="row-span-2 h-full min-h-64 w-full max-w-none overflow-clip p-2">
  <Heading tag="h4" class="mb-2 px-2">Daily Activity</Heading>
  {#if !report}
    <div class="p-2 text-sm">Add "top-pages" report in settings</div>
  {:else}
    <table class="w-full table-fixed border-collapse">
      <colgroup>
        <col class="w-8" />
        <!-- Hour column -->
        {#each Array(7) as _, i}
          <col class="w-6" /> <!-- Each day column -->
        {/each}
      </colgroup>
      <thead>
        <tr>
          <th class="sticky top-0 z-10 h-6 border border-gray-100 bg-white text-xs font-medium"
          ></th>
          {#each ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'] as day}
            <th class="sticky top-0 z-10 w-6 border border-gray-100 bg-white text-xs font-medium">
              {day}
            </th>
          {/each}
        </tr>
      </thead>
      <tbody>
        {#each heatmapData as hourData, hour}
          <tr class="group">
            <td
              class="sticky left-0 z-10 whitespace-nowrap bg-white pr-2 text-right text-xs text-gray-500"
            >
              {hour}:00
            </td>
            {#each hourData as views, day}
              <td
                class="relative h-6 w-6 border border-gray-300 p-0.5 hover:z-20 hover:scale-110 hover:shadow-md"
                style:background={`hsl(210, 100%, ${100 - (views / maxViews) * 50}%)`}
                title={`${['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'][day]} ${hour}:00 - ${views.toLocaleString()} views`}
              >
                <div class="h-full w-full"></div>
              </td>
            {/each}
          </tr>
        {/each}
      </tbody>
    </table>
  {/if}
</Card>
