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
    Heading
  } from 'flowbite-svelte'
  import type { Report } from '$lib/state/report.svelte'
  import type { DateRange } from '$lib/state/daterange.svelte'

  type TableProps = {
    report: Report
    date: DateRange
  }

  const props: TableProps = $props()

  type SortableColumn =
    | 'page'
    | 'views'
    | 'visitors'
    | 'entries'
    | 'exits'
    | 'bounceRate'
    | 'loadTime'
  let sortBy: SortableColumn = $state('views')
  let sortDirection: 'asc' | 'desc' = $state('desc')

  function handleSort(column: SortableColumn) {
    if (sortBy === column) {
      sortDirection = sortDirection === 'asc' ? 'desc' : 'asc'
    } else {
      sortBy = column
      sortDirection = column === 'page' ? 'asc' : 'desc'
    }
  }

  type PageRecord = {
    page: string
    views: number
    visitors: number
    entries: number
    exits: number
    bounceRate: number
    loadTime: number
    hourlyBounceRates: number[]
    hourlyLoadTimes: number[]
  }

  const aggregatePages = (
    currentRecords: typeof props.report.currentRecordsArray,
    referenceRecords: typeof props.report.referenceRecordsArray
  ) => {
    const processRecords = (records: typeof props.report.currentRecordsArray) => {
      const pageMap = new Map<string, PageRecord>()
      const validRecords = records.filter((r) => r.records && Object.keys(r.records).length > 0)

      validRecords.forEach((row) => {
        Object.entries(row.records).forEach(([page, record]) => {
          if (!pageMap.has(page)) {
            pageMap.set(page, {
              page,
              views: 0,
              visitors: 0,
              entries: 0,
              exits: 0,
              bounceRate: 0,
              loadTime: 0,
              hourlyBounceRates: [],
              hourlyLoadTimes: []
            })
          }
          const existing = pageMap.get(page)!

          // Track totals
          existing.views += record.views || 0
          existing.visitors += record.visitors || 0
          existing.entries += record.entries || 0
          existing.exits += record.exits || 0

          // Calculate hourly metrics
          const hourlyBounceRate =
            record.visitors > 0 ? ((record.singleViewVisitors || 0) / record.visitors) * 100 : 0

          const hourlyLoadTime = record.views > 0 ? (record.sumLoadingTime || 0) / record.views : 0

          existing.hourlyBounceRates.push(hourlyBounceRate)
          existing.hourlyLoadTimes.push(hourlyLoadTime)
        })
      })

      return Array.from(pageMap.values()).map((page) => ({
        ...page,
        bounceRate:
          page.hourlyBounceRates.length > 0
            ? page.hourlyBounceRates.reduce((a, b) => a + b, 0) / page.hourlyBounceRates.length
            : 0,
        loadTime:
          page.hourlyLoadTimes.length > 0
            ? page.hourlyLoadTimes.reduce((a, b) => a + b, 0) / page.hourlyLoadTimes.length
            : 0
      }))
    }

    const current = processRecords(currentRecords)
    const reference = processRecords(referenceRecords)

    return current
      .map((curr) => {
        const ref = reference.find((r) => r.page === curr.page) || {
          views: 0,
          visitors: 0,
          entries: 0,
          exits: 0,
          bounceRate: 0,
          loadTime: 0
        }
        return {
          ...curr,
          referenceViews: ref.views,
          referenceVisitors: ref.visitors,
          referenceEntries: ref.entries || 0,
          referenceExits: ref.exits || 0,
          referenceBounceRate: ref.bounceRate,
          referenceLoadTime: ref.loadTime
        }
      })
      .sort((a, b) => {
        if (sortBy === 'page') {
          const comparison = a.page.localeCompare(b.page)
          return sortDirection === 'asc' ? comparison : -comparison
        }

        const aValue = a[sortBy]
        const bValue = b[sortBy]
        return sortDirection === 'asc' ? aValue - bValue : bValue - aValue
      })
      .slice(0, 10)
  }

  const topPages = $derived(
    aggregatePages(props.report.currentRecordsArray, props.report.referenceRecordsArray)
  )
</script>

<Card class="col-span-4 max-h-[600px] min-h-40 w-full max-w-none overflow-clip">
  <div class="flex flex-row justify-between">
    <Heading tag="h4" class="w-fit">Top Pages</Heading>
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
        <TableHeadCell onclick={() => handleSort('page')} class="cursor-pointer">
          URL&nbsp;{#if sortBy === 'page'}<span class="ml-1"
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
        <TableHeadCell class="cursor-pointer text-right" onclick={() => handleSort('entries')}>
          Entries&nbsp;{#if sortBy === 'entries'}<span class="ml-1"
              >{sortDirection === 'asc' ? '↑' : '↓'}</span
            >
          {:else}<span class="ml-1">-</span>
          {/if}
        </TableHeadCell>
        <TableHeadCell class="cursor-pointer text-right" onclick={() => handleSort('exits')}>
          Exits&nbsp;{#if sortBy === 'exits'}<span class="ml-1"
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
        {#each topPages as page}
          <TableBodyRow>
            <TableBodyCell>{page.page}</TableBodyCell>
            <TableBodyCell class="text-right">
              {page.views.toLocaleString()}
              <span class="trend-icon">
                {#if page.views > page.referenceViews}
                  <span class="text-green-500">↑</span>
                {:else if page.views < page.referenceViews}
                  <span class="text-red-600">↓</span>
                {:else}
                  <span class="text-gray-500">-</span>
                {/if}
              </span>
            </TableBodyCell>
            <TableBodyCell class="text-right">
              {page.visitors.toLocaleString()}
              <span class="trend-icon">
                {#if page.visitors > page.referenceVisitors}
                  <span class="text-green-500">↑</span>
                {:else if page.visitors < page.referenceVisitors}
                  <span class="text-red-600">↓</span>
                {:else}
                  <span class="text-gray-500">-</span>
                {/if}
              </span>
            </TableBodyCell>
            <TableBodyCell class="text-right">
              {page.entries.toLocaleString()}
              <span class="trend-icon">
                {#if page.entries > page.referenceEntries}
                  <span class="text-green-500">↑</span>
                {:else if page.entries < page.referenceEntries}
                  <span class="text-red-600">↓</span>
                {:else}
                  <span class="text-gray-500">-</span>
                {/if}
              </span>
            </TableBodyCell>
            <TableBodyCell class="text-right">
              {page.exits.toLocaleString()}
              <span class="trend-icon">
                {#if page.exits > page.referenceExits}
                  <span class="text-green-500">↑</span>
                {:else if page.exits < page.referenceExits}
                  <span class="text-red-600">↓</span>
                {:else}
                  <span class="text-gray-500">-</span>
                {/if}
              </span>
            </TableBodyCell>
            <TableBodyCell class="text-right">
              {Math.round(page.bounceRate)}%
              <span class="trend-icon">
                {#if page.bounceRate < page.referenceBounceRate}
                  <span class="text-green-500">↓</span>
                {:else if page.bounceRate < page.referenceBounceRate}
                  <span class="text-red-600">↑</span>
                {:else}
                  <span class="text-gray-500">-</span>
                {/if}
              </span>
            </TableBodyCell>
            <TableBodyCell class="text-right">
              {Math.round(page.loadTime)}ms
              <span class="trend-icon">
                {#if page.loadTime < page.referenceLoadTime}
                  <span class="text-red-600">↓</span>
                {:else if page.loadTime < page.referenceLoadTime}
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
