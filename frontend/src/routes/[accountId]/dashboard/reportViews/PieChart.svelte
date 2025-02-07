<script lang="ts">
  import { Card, Heading, P, Spinner } from 'flowbite-svelte'
  import Chart from 'chart.js/auto'
  import type { Report } from '$lib/state/report.svelte'
  import type { DateRange } from '$lib/state/daterange.svelte'

  type PieChartProps = {
    title: string
    date: DateRange
    report: Report
  }

  const props: PieChartProps = $props()

  type RecordData = {
    label: string
    views: number
  }

  const aggregateRecords = (records: typeof props.report.currentRecordsArray) => {
    const labels = new Map<string, RecordData>()

    records.forEach((timeSlice) => {
      Object.entries(timeSlice.records).forEach(([label, record]) => {
        const existing = labels.get(label) || { label, views: 0 }
        labels.set(label, {
          label: label,
          views: existing.views + (record.views || 0)
        })
      })
    })

    return Array.from(labels.values()).sort((a, b) => b.views - a.views)
  }

  const initChart = (chartCanvas: HTMLCanvasElement) => {
    $effect(() => {
      const currentRecords = aggregateRecords(props.report.currentRecordsArray)
      const totalViews = currentRecords.reduce((sum, r) => sum + r.views, 0)

      const chart = new Chart(chartCanvas, {
        type: 'pie',
        data: {
          labels: currentRecords.map((r) => r.label),
          datasets: [
            {
              data: currentRecords.map((r) => r.views),
              backgroundColor: [
                '#3B82F6', // Blue
                '#10B981', // Green
                '#F59E0B', // Orange
                '#EF4444', // Red
                '#8B5CF6', // Purple
                '#EC4899' // Pink
              ],
              borderWidth: 1
            }
          ]
        },
        options: {
          responsive: true,
          maintainAspectRatio: false,
          plugins: {
            tooltip: {
              callbacks: {
                label: (context) => {
                  const value = context.parsed || 0
                  const percentage = ((value / totalViews) * 100).toFixed(1)
                  return `${context.label}: ${value} views (${percentage}%)`
                }
              }
            },
            legend: {
              position: 'top',
              labels: {
                boxWidth: 12,
                padding: 20,
                font: { size: 14 }
              }
            }
          }
        }
      })

      return () => chart.destroy()
    })
  }
</script>

<Card class="min-h-50 col-span-1 w-full max-w-none overflow-clip">
  <div class="flex flex-row justify-between">
    <Heading tag="h4" class="w-fit">
      {props.title}
      {#if props.report.loading}<Spinner size="5" />{/if}
    </Heading>
    <P class="text-right text-xs">
      Current Period
      <br />
      {props.date.currentStart.toLocaleDateString()}&nbsp;-&nbsp;{props.date.currentEnd.toLocaleDateString()}
    </P>
  </div>
  {#if props.report.currentRecordsArray.length === 0}
    <div class="flex h-40 items-center justify-center">
      <P>No data available.</P>
    </div>
  {:else}
    <div style="height: 300px; width: 300px">
      <canvas use:initChart></canvas>
    </div>
  {/if}
</Card>
