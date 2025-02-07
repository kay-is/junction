<script lang="ts">
  import { Card, Heading, P, Spinner } from 'flowbite-svelte'
  import type { Report } from '$lib/state/report.svelte'
  import type { DateRange } from '$lib/state/daterange.svelte'

  type HeatMapProps = {
    date: DateRange
    report: Report
  }

  const props: HeatMapProps = $props()

  type HeatMapData = number[][] // [day][hour]

  const processRecords = (records: typeof props.report.currentRecordsArray): HeatMapData => {
    const heatmapData: number[][] = Array(7)
      .fill(0)
      .map(() => Array(24).fill(0))

    records.forEach((row) => {
      const date = new Date(row.timestamp)
      const day = date.getDay()
      const hour = date.getHours()

      Object.values(row.records).forEach((record) => {
        heatmapData[day][hour] += record.views
      })
    })

    return heatmapData
  }

  const heatmapData = $derived(processRecords(props.report.currentRecordsArray))
  const maxViews = $derived(Math.max(...heatmapData.flat()))
</script>

<Card class=" col-span-4 max-w-none overflow-clip">
  <div class="flex flex-row justify-between">
    <Heading tag="h4" class="w-fit">
      Daily Activity {#if props.report.loading}<Spinner size="5" />{/if}
    </Heading>
    <P class="text-right text-xs">
      Current Period
      <br />
      {props.date.currentStart.toLocaleDateString()}&nbsp;-&nbsp;{props.date.currentEnd.toLocaleDateString()}
    </P>
  </div>
  {#if props.report.currentRecordsArray.length === 0}
    <div class="flex h-40 items-center justify-center">
      <P>No data for this period.</P>
    </div>
  {:else}
    <table class="w-full table-fixed border-collapse">
      <colgroup>
        <col class="w-8" />
        {#each Array(24) as _}
          <col class="min-w-5" />
        {/each}
      </colgroup>
      <thead>
        <tr>
          <th class="sticky top-0 z-10 h-5 border border-gray-100 bg-white text-xs font-medium"
          ></th>
          {#each Array(24) as _, hour}
            <th class="sticky top-0 z-10 w-5 border border-gray-100 bg-white text-xs font-medium">
              {hour}:00
            </th>
          {/each}
        </tr>
      </thead>
      <tbody>
        {#each heatmapData as dayData, day}
          <tr class="group">
            <td
              class="sticky left-0 z-10 whitespace-nowrap bg-white pr-2 text-right text-sm text-gray-500"
            >
              {['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'][day]}
            </td>
            {#each dayData as views, hour}
              <td
                class="relative h-6 w-5 border border-gray-300 p-0.5 hover:z-20 hover:scale-110 hover:shadow-md"
                style:background={`hsl(30, 100%, ${100 - (views / maxViews) * 50}%)`}
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
