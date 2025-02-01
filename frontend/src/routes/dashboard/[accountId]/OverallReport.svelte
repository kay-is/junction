<script lang="ts">
  import type { Records } from '$lib/state/report.svelte'
  import Chart from 'chart.js/auto'
  import { Heading, P } from 'flowbite-svelte'
  import { onMount } from 'svelte'

  let { records }: { records: Records } = $props()

  let recordsArray = 
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
    .map((record) => ({
      ...record,
      bounceRate: (record.singleViewVisitors / record.visitors) * 100
    }))
    .sort((a, b) => a.timestamp - b.timestamp)

  let chartCanvas: HTMLCanvasElement | undefined = $state()

  onMount(() => {
    if (!chartCanvas) return

    new Chart(chartCanvas, {
      type: 'line',
      data: {
        labels: recordsArray.map((row) => new Date(row.timestamp).toLocaleString()),
        datasets: [
          {
            yAxisID: 'y1',
            label: 'Page Views',
            data: recordsArray.map((row) => row.pageViews)
          },
          {
            yAxisID: 'y1',
            label: 'Visitors',
            data: recordsArray.map((row) => row.visitors)
          },
          {
            yAxisID: 'y1',
            label: 'Web3 Visitors',
            data: recordsArray.map((row) => row.web3Visitors)
          },
          {
            yAxisID: 'y2',
            label: 'Bounce Rate',
            data: recordsArray.map((row) => row.bounceRate)
          }
        ]
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        scales: {
          y1: {
            position: 'left',
            beginAtZero: true,
            grid: {
              drawOnChartArea: false
            },
            ticks: {
              precision: 0
            },
            title: {
              display: true,
              text: 'Views & Visitors'
            }
          },
          y2: {
            position: 'right',
            beginAtZero: true,
            max: 100,
            ticks: {
              precision: 0
            },
            title: {
              display: true,
              text: 'Bounce Rate'
            }
          }
        }
      }
    })
  })

  // please aggregate all page views, visitors and web3 visitors for all pages and all hours into one object

  const overall = recordsArray.reduce(
    (acc, { pageViews, visitors, web3Visitors, singleViewVisitors }) => {
      acc.pageViews += pageViews
      acc.visitors += visitors
      acc.web3Visitors += web3Visitors
      acc.singleViewVisitors += singleViewVisitors
      return acc
    },
    { pageViews: 0, visitors: 0, web3Visitors: 0, singleViewVisitors: 0 }
  )
</script>

<Heading tag="h3">Overall</Heading>

<!-- display the overall metrics side by side with a flexbox div-->

<div class="flex w-full justify-around">
  <P class="text-lg"><b>Page Views</b>: {overall.pageViews}</P>
  <P class="text-lg"><b>Visitors</b>: {overall.visitors}</P>
  <P class="text-lg"><b>Web3 Visitors</b>: {overall.web3Visitors}</P>
  <P class="text-lg"><b>Bounce Rate</b>: {(overall.singleViewVisitors / overall.visitors) * 100}%</P
  >
</div>

<div class="px-10" style="height: 300px">
  <canvas bind:this={chartCanvas}></canvas>
</div>
