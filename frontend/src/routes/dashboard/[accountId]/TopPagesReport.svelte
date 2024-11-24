<script lang="ts">
  import type { JunctionRecord } from '$lib/appState.svelte'
  import {
    Heading,
    Table,
    TableBody,
    TableBodyCell,
    TableBodyRow,
    TableHead,
    TableHeadCell
  } from 'flowbite-svelte'

  let props: { records: Record<string, JunctionRecord> } = $props()

  let topPages: {
    name: string
    pageViews: number
    visitors: number
    web3Visitors: number
    avgLoadingTime: number
    bounceRate: number
  }[] = $derived.by(() => {
    let pages: Record<
      string,
      {
        pageViews: number
        visitors: number
        web3Visitors: number
        sumLoadingTime: number
        singleViewVisitors: number
      }
    > = {}
    for (let record of Object.values(props.records)) {
      console.log(record)
      for (let [
        page,
        { pageViews, visitors, web3Visitors, sumLoadingTime, singleViewVisitors }
      ] of Object.entries(record)) {
        if (!pages[page]) {
          pages[page] = {
            pageViews: 0,
            visitors: 0,
            web3Visitors: 0,
            sumLoadingTime: 0,
            singleViewVisitors: 0
          }
        }
        pages[page].pageViews += pageViews
        pages[page].visitors += visitors
        pages[page].web3Visitors += web3Visitors
        pages[page].sumLoadingTime += sumLoadingTime
        pages[page].singleViewVisitors += singleViewVisitors
      }
    }
    return Object.entries(pages)
      .map(([name, { pageViews, visitors, web3Visitors, sumLoadingTime, singleViewVisitors }]) => ({
        name,
        pageViews,
        visitors,
        web3Visitors,
        avgLoadingTime: sumLoadingTime / pageViews,
        bounceRate: (singleViewVisitors / visitors) * 100
      }))
      .sort((a, b) => b.pageViews - a.pageViews)
  })
</script>

<Heading tag="h3" class="mt-10">Top Pages</Heading>

<Table>
  <TableHead>
    <TableHeadCell>Page</TableHeadCell>
    <TableHeadCell>Page Views</TableHeadCell>
    <TableHeadCell>Visitors</TableHeadCell>
    <TableHeadCell>Web3 Visitors</TableHeadCell>
    <TableHeadCell>Avg Loading Time</TableHeadCell>
    <TableHeadCell>Bounce Rate</TableHeadCell>
  </TableHead>
  <TableBody>
    {#each topPages as page}
      <TableBodyRow>
        <TableBodyCell>{page.name}</TableBodyCell>
        <TableBodyCell>{page.pageViews}</TableBodyCell>
        <TableBodyCell>{page.visitors}</TableBodyCell>
        <TableBodyCell>{page.web3Visitors}</TableBodyCell>
        <TableBodyCell>{Math.round(page.avgLoadingTime)} ms</TableBodyCell>
        <TableBodyCell>{page.bounceRate}%</TableBodyCell>
      </TableBodyRow>
    {/each}
  </TableBody>
</Table>
