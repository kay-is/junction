<script lang="ts">
  import {
    Card,
    P,
    Table,
    TableHead,
    TableHeadCell,
    TableBody,
    TableBodyRow,
    TableBodyCell
  } from 'flowbite-svelte'
  import * as AppState from '$lib/state/app.svelte'

  const appState = AppState.getContext()
  const report = $derived(appState.account.reports['top-pages'])

  type PageRecord = {
    page: string
    views: number
    visitors: number
    bounceRate: number
    loadTime: number
  }

  type ComparisonRecord = PageRecord & {
    referenceViews: number
    referenceVisitors: number
    referenceBounceRate: number
    referenceLoadTime: number
  }

  let topPages = $state<ComparisonRecord[]>([])

  const aggregatePages = (
    currentRecords: typeof report.currentRecordsArray,
    referenceRecords: typeof report.referenceRecordsArray
  ) => {
    const processRecords = (records: typeof report.currentRecordsArray) => {
      const pageMap = new Map<string, PageRecord>()
      const validRecords = records.filter((r) => r.records && Object.keys(r.records).length > 0)

      validRecords.forEach((row) => {
        Object.entries(row.records).forEach(([page, record]) => {
          if (!pageMap.has(page)) {
            pageMap.set(page, {
              page,
              views: 0,
              visitors: 0,
              bounceRate: 0,
              loadTime: 0
            })
          }
          const existing = pageMap.get(page)!
          existing.views += record.views || 0
          existing.visitors += record.visitors || 0
          existing.bounceRate += record.singleViewVisitors || 0
          existing.loadTime += record.sumLoadingTime || 0
        })
      })

      return Array.from(pageMap.values()).map((page) => ({
        ...page,
        bounceRate: page.visitors > 0 ? (page.bounceRate / page.visitors) * 100 : 0,
        loadTime: page.views > 0 ? page.loadTime / page.views : 0
      }))
    }

    const current = processRecords(currentRecords)
    const reference = processRecords(referenceRecords)

    return current
      .map((curr) => {
        const ref = reference.find((r) => r.page === curr.page) || {
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
      .sort((a, b) => b.views - a.views)
      .slice(0, 10)
  }

  $effect(() => {
    if (!report) return
    topPages = aggregatePages(report.currentRecordsArray, report.referenceRecordsArray)
  })
</script>

<Card class="col-span-3 min-h-40 w-full max-w-none overflow-clip">
  <h5 class="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">Top Pages</h5>
  {#if !report}
    <P class="mb-3">
      To activate this report view, add the "top-pages" report to your account in the settings.
    </P>
  {:else}
    <Table class="w-full">
      <TableHead>
        <TableHeadCell>URL</TableHeadCell>
        <TableHeadCell class="text-right">Views</TableHeadCell>
        <TableHeadCell class="text-right">Visitors</TableHeadCell>
        <TableHeadCell class="text-right">Bounce Rate</TableHeadCell>
        <TableHeadCell class="text-right">Load Time</TableHeadCell>
      </TableHead>
      <TableBody>
        {#each topPages as page}
          <TableBodyRow>
            <TableBodyCell>{page.page}</TableBodyCell>
            <TableBodyCell class="text-right">
              {page.views.toLocaleString()}
              {#if page.views !== page.referenceViews}
                <span class="trend-icon">
                  {#if page.views > page.referenceViews}
                    <span class="trend-up">↑</span>
                  {:else}
                    <span class="trend-down">↓</span>
                  {/if}
                </span>
              {/if}
            </TableBodyCell>
            <TableBodyCell class="text-right">
              {page.visitors.toLocaleString()}
              {#if page.visitors !== page.referenceVisitors}
                <span class="trend-icon">
                  {#if page.visitors > page.referenceVisitors}
                    <span class="trend-up">↑</span>
                  {:else}
                    <span class="trend-down">↓</span>
                  {/if}
                </span>
              {/if}
            </TableBodyCell>
            <TableBodyCell class="text-right">
              {Math.round(page.bounceRate)}%
              {#if page.bounceRate !== page.referenceBounceRate}
                <span class="trend-icon">
                  {#if page.bounceRate < page.referenceBounceRate}
                    <span class="trend-up">↓</span>
                  {:else}
                    <span class="trend-down">↑</span>
                  {/if}
                </span>
              {/if}
            </TableBodyCell>
            <TableBodyCell class="text-right">
              {Math.round(page.loadTime)}ms
              {#if page.loadTime !== page.referenceLoadTime}
                <span class="trend-icon">
                  {#if page.loadTime < page.referenceLoadTime}
                    <span class="trend-up">↓</span>
                  {:else}
                    <span class="trend-down">↑</span>
                  {/if}
                </span>
              {/if}
            </TableBodyCell>
          </TableBodyRow>
        {/each}
      </TableBody>
    </Table>
  {/if}
</Card>

<style>
  .trend-up {
    color: #10b981;
  }
  .trend-down {
    color: #ef4444;
  }
  .trend-icon {
    font-size: 1.5em;
    font-weight: bold;
    margin-left: 0.3rem;
    vertical-align: middle;
  }
</style>
