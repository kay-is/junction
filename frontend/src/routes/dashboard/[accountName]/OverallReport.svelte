<script lang="ts">
  import type { JunctionRecord } from '$lib/appState.svelte'
  import Chart from 'chart.js/auto'
  import {
    Heading,
    Table,
    TableBody,
    TableBodyCell,
    TableBodyRow,
    TableHead,
    TableHeadCell
  } from 'flowbite-svelte'
  import { onMount } from 'svelte'

  let { records }: { records: Record<string, JunctionRecord> } = $props()

  let recordsArray = Object.entries(records)
    .map(([timestamp, record]) => {
      const recordSums = Object.entries(record).reduce(
        (acc, [_, { pageViews, visitors, web3Visitors, sumLoadingTime, singleViewVisitors }]) => {
          acc.pageViews += pageViews
          acc.visitors += visitors
          acc.web3Visitors += web3Visitors
          acc.sumLoadingTime += sumLoadingTime
          acc.singleViewVisitors += singleViewVisitors
          return acc
        },
        {
          pageViews: 0,
          visitors: 0,
          web3Visitors: 0,
          sumLoadingTime: 0,
          singleViewVisitors: 0
        }
      )

      return { timestamp: parseInt(timestamp), ...recordSums }
    })
    .sort((a, b) => a.timestamp - b.timestamp)

  let chartCanvas: HTMLCanvasElement | undefined = $state()

  onMount(() => {
    if (!chartCanvas) return

    new Chart(chartCanvas, {
      type: 'line',
      data: {
        labels: recordsArray.map((row) => new Date(row.timestamp).toUTCString()),
        datasets: [
          {
            label: 'Page Views',
            data: recordsArray.map((row) => row.pageViews)
          },
          {
            label: 'Visitors',
            data: recordsArray.map((row) => row.visitors)
          },
          {
            label: 'Web3 Visitors',
            data: recordsArray.map((row) => row.web3Visitors)
          }
        ]
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        scales: {
          y: {
            beginAtZero: true,
            ticks: {
              precision: 0
            }
          }
        }
      }
    })
  })
</script>

<Heading tag="h3">Overall</Heading>

<div style="height: 300px">
  <canvas bind:this={chartCanvas}></canvas>
</div>
