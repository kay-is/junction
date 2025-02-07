<script lang="ts">
  import {
    Card,
    P,
    Table,
    TableHead,
    TableHeadCell,
    TableBody,
    TableBodyRow,
    TableBodyCell,
    Heading,
    Spinner
  } from 'flowbite-svelte'
  import type { Report } from '$lib/state/report.svelte'
  import type { DateRange } from '$lib/state/daterange.svelte'

  type TableProps = {
    report: Report
    date: DateRange
  }

  const props: TableProps = $props()

  type SortableColumn = 'gateway' | 'views' | 'visitors' | 'bounceRate' | 'loadTime'
  let sortBy: SortableColumn = $state('views')
  let sortDirection: 'asc' | 'desc' = $state('desc')

  function handleSort(column: SortableColumn) {
    if (sortBy === column) {
      sortDirection = sortDirection === 'asc' ? 'desc' : 'asc'
    } else {
      sortBy = column
      sortDirection = column === 'gateway' ? 'asc' : 'desc'
    }
  }

  type GatewayRecord = {
    gateway: string
    views: number
    visitors: number
    bounceRate: number
    loadTime: number
    hourlyBounceRates: number[]
    hourlyLoadTimes: number[]
  }

  const aggregateGateways = (
    currentRecords: typeof props.report.currentRecordsArray,
    referenceRecords: typeof props.report.referenceRecordsArray
  ) => {
    const processRecords = (records: typeof props.report.currentRecordsArray) => {
      const gatewayMap = new Map<string, GatewayRecord>()
      const validRecords = records.filter((r) => r.records && Object.keys(r.records).length > 0)

      validRecords.forEach((row) => {
        Object.entries(row.records).forEach(([gateway, record]) => {
          if (!gatewayMap.has(gateway)) {
            gatewayMap.set(gateway, {
              gateway,
              views: 0,
              visitors: 0,
              bounceRate: 0,
              loadTime: 0,
              hourlyBounceRates: [],
              hourlyLoadTimes: []
            })
          }
          const existing = gatewayMap.get(gateway)!

          // Track totals
          existing.views += record.views || 0
          existing.visitors += record.visitors || 0

          // Calculate hourly metrics
          const hourlyBounceRate =
            record.visitors > 0 ? ((record.singleViewVisitors || 0) / record.visitors) * 100 : 0

          const hourlyLoadTime = record.views > 0 ? (record.sumLoadingTime || 0) / record.views : 0

          existing.hourlyBounceRates.push(hourlyBounceRate)
          existing.hourlyLoadTimes.push(hourlyLoadTime)
        })
      })

      return Array.from(gatewayMap.values()).map((gateway) => ({
        ...gateway,
        bounceRate:
          gateway.hourlyBounceRates.length > 0
            ? gateway.hourlyBounceRates.reduce((a, b) => a + b, 0) /
              gateway.hourlyBounceRates.length
            : 0,
        loadTime:
          gateway.hourlyLoadTimes.length > 0
            ? gateway.hourlyLoadTimes.reduce((a, b) => a + b, 0) / gateway.hourlyLoadTimes.length
            : 0
      }))
    }

    const current = processRecords(currentRecords)
    const reference = processRecords(referenceRecords)

    return current
      .map((curr) => {
        const ref = reference.find((r) => r.gateway === curr.gateway) || {
          views: 0,
          visitors: 0,
          bounceRate: 0,
          loadTime: 0
        }
        return {
          ...curr,
          referenceViews: ref.views,
          referenceVisitors: ref.visitors,
          referenceBounceRate: ref.bounceRate,
          referenceLoadTime: ref.loadTime
        }
      })
      .sort((a, b) => {
        if (sortBy === 'gateway') {
          const comparison = a.gateway.localeCompare(b.gateway)
          return sortDirection === 'asc' ? comparison : -comparison
        }

        const aValue = a[sortBy]
        const bValue = b[sortBy]
        return sortDirection === 'asc' ? aValue - bValue : bValue - aValue
      })
      .slice(0, 10)
  }

  const topGateways = $derived(
    aggregateGateways(props.report.currentRecordsArray, props.report.referenceRecordsArray)
  )
</script>

<Card class="col-span-3 max-h-[600px] min-h-40 w-full max-w-none overflow-clip">
  <div class="flex flex-row justify-between">
    <Heading tag="h4" class="w-fit"
      >Top Gateways {#if props.report.loading}<Spinner size="5" />{/if}</Heading
    >
    <div class="flex flex-row gap-5">
      <P class="text-right text-xs">
        Reference Period
        <br />
        {props.date.referenceStart.toLocaleDateString()}&nbsp;-&nbsp;{props.date.referenceEnd.toLocaleDateString()}
      </P>
      <P class="text-right text-xs">
        Current Period
        <br />
        {props.date.currentStart.toLocaleDateString()}&nbsp;-&nbsp;{props.date.currentEnd.toLocaleDateString()}
      </P>
    </div>
  </div>
  {#if props.report.currentRecordsArray.length === 0}
    <div class="flex h-40 items-center justify-center">
      <P>No data for this period.</P>
    </div>
  {:else}
    <Table class="w-full">
      <TableHead>
        <TableHeadCell onclick={() => handleSort('gateway')} class="cursor-pointer">
          Domain&nbsp;{#if sortBy === 'gateway'}<span class="ml-1"
              >{sortDirection === 'asc' ? '↑' : '↓'}</span
            >
          {:else}<span class="ml-1">-</span>
          {/if}
        </TableHeadCell>
        <TableHeadCell class="cursor-pointer text-right" onclick={() => handleSort('views')}>
          Views&nbsp;{#if sortBy === 'views'}<span class="ml-1"
              >{sortDirection === 'asc' ? '↑' : '↓'}</span
            >
          {:else}<span class="ml-1">-</span>
          {/if}
        </TableHeadCell>
        <TableHeadCell class="cursor-pointer text-right" onclick={() => handleSort('visitors')}>
          Visitors&nbsp;{#if sortBy === 'visitors'}<span class="ml-1"
              >{sortDirection === 'asc' ? '↑' : '↓'}</span
            >
          {:else}<span class="ml-1">-</span>
          {/if}
        </TableHeadCell>
        <TableHeadCell class="cursor-pointer text-right" onclick={() => handleSort('bounceRate')}>
          Bounce&nbsp;Rate&nbsp;{#if sortBy === 'bounceRate'}<span class="ml-1"
              >{sortDirection === 'asc' ? '↑' : '↓'}</span
            >
          {:else}<span class="ml-1">-</span>
          {/if}
        </TableHeadCell>
        <TableHeadCell class="cursor-pointer text-right" onclick={() => handleSort('loadTime')}>
          Load&nbsp;Time&nbsp;{#if sortBy === 'loadTime'}<span class="ml-1"
              >{sortDirection === 'asc' ? '↑' : '↓'}</span
            >
          {:else}<span class="ml-1">-</span>
          {/if}
        </TableHeadCell>
      </TableHead>
      <TableBody>
        {#each topGateways as gateway}
          <TableBodyRow>
            <TableBodyCell>{gateway.gateway}</TableBodyCell>
            <TableBodyCell class="text-right">
              {gateway.views.toLocaleString()}
              <span class="trend-icon">
                {#if gateway.views > gateway.referenceViews}
                  <span class="text-green-500">↑</span>
                {:else if gateway.views < gateway.referenceViews}
                  <span class="text-red-600">↓</span>
                {:else}
                  <span class="text-gray-500">-</span>
                {/if}
              </span>
            </TableBodyCell>
            <TableBodyCell class="text-right">
              {gateway.visitors.toLocaleString()}
              <span class="trend-icon">
                {#if gateway.visitors > gateway.referenceVisitors}
                  <span class="text-green-500">↑</span>
                {:else if gateway.visitors < gateway.referenceVisitors}
                  <span class="text-red-600">↓</span>
                {:else}
                  <span class="text-gray-500">-</span>
                {/if}
              </span>
            </TableBodyCell>
            <TableBodyCell class="text-right">
              {Math.round(gateway.bounceRate)}%
              <span class="trend-icon">
                {#if gateway.bounceRate < gateway.referenceBounceRate}
                  <span class="text-green-500">↓</span>
                {:else if gateway.bounceRate < gateway.referenceBounceRate}
                  <span class="text-red-600">↑</span>
                {:else}
                  <span class="text-gray-500">-</span>
                {/if}
              </span>
            </TableBodyCell>
            <TableBodyCell class="text-right">
              {Math.round(gateway.loadTime)}ms
              <span class="trend-icon">
                {#if gateway.loadTime < gateway.referenceLoadTime}
                  <span class="text-red-600">↓</span>
                {:else if gateway.loadTime < gateway.referenceLoadTime}
                  <span class="text-red-600">↑</span>
                {:else}
                  <span class="text-gray-500">-</span>
                {/if}
              </span>
            </TableBodyCell>
          </TableBodyRow>
        {/each}
      </TableBody>
    </Table>
  {/if}
</Card>

<style>
  .trend-icon {
    font-size: 1.5em;
    font-weight: bold;
    margin-left: 0.3rem;
    vertical-align: middle;
  }
</style>
