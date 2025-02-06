<script lang="ts">
  import { Card, Heading, Modal, P } from 'flowbite-svelte'
  import Chart from 'chart.js/auto'
  import 'chartjs-adapter-date-fns'
  import type { Report } from '$lib/state/report.svelte'
  import type { DateRange } from '$lib/state/daterange.svelte'

  type TimelineProps = {
    date: DateRange
    report: Report
  }

  const props: TimelineProps = $props()

  type AggregateRecord = {
    timestamp: number
    views: number
    visitors: number
    singleViewVisitors: number
    bounceRate: number
    sumLoadingTime: number
    loadingTime: number
  }

  const aggregateRecords = (records: typeof props.report.currentRecordsArray) => {
    // First mapping remains the same - aggregate per timestamp
    const mappedRecords = records.map((row) => {
      const aggregatedRecord = {
        timestamp: row.timestamp,
        views: 0,
        visitors: 0,
        singleViewVisitors: 0,
        bounceRate: 0,
        sumLoadingTime: 0,
        loadingTime: 0
      }

      for (const [_, record] of Object.entries(row.records)) {
        aggregatedRecord.views += record.views
        aggregatedRecord.visitors += record.visitors
        aggregatedRecord.singleViewVisitors += record.singleViewVisitors
        aggregatedRecord.sumLoadingTime += record.sumLoadingTime || 0
      }

      aggregatedRecord.bounceRate =
        aggregatedRecord.views > 0
          ? (aggregatedRecord.singleViewVisitors / aggregatedRecord.views) * 100
          : 0

      if (Number.isNaN(aggregatedRecord.sumLoadingTime)) aggregatedRecord.sumLoadingTime = 0

      aggregatedRecord.loadingTime =
        aggregatedRecord.views > 0 ? aggregatedRecord.sumLoadingTime / aggregatedRecord.views : 0

      return aggregatedRecord
    })

    // Check if we need daily aggregation
    const timestamps = mappedRecords.map((r) => r.timestamp)
    const minTime = Math.min(...timestamps)
    const maxTime = Math.max(...timestamps)
    const isSingleDay = maxTime - minTime <= 86400000 // 24h in milliseconds

    // Only aggregate to daily if time range exceeds 24 hours
    const reducedRecords = isSingleDay
      ? mappedRecords
      : mappedRecords.reduce((acc, row) => {
          const date = new Date(row.timestamp)
          const day = new Date(date.getFullYear(), date.getMonth(), date.getDate()).getTime()

          const existingRecord = acc.find((r) => r.timestamp === day)
          if (!existingRecord) {
            acc.push({ ...row, timestamp: day })
          } else {
            existingRecord.views += row.views
            existingRecord.visitors += row.visitors
            existingRecord.singleViewVisitors += row.singleViewVisitors
            existingRecord.sumLoadingTime += row.sumLoadingTime || 0
          }
          return acc
        }, [] as AggregateRecord[])

    // Final mapping remains the same
    return reducedRecords.map((dailyRecord) => ({
      ...dailyRecord,
      bounceRate:
        dailyRecord.views > 0 ? (dailyRecord.singleViewVisitors / dailyRecord.views) * 100 : 0,
      loadingTime: dailyRecord.views > 0 ? dailyRecord.sumLoadingTime / dailyRecord.views : 0
    }))
  }

  const initChart = (chartCanvas: HTMLCanvasElement) => {
    $effect(() => {
      const currentRecords = aggregateRecords(props.report.currentRecordsArray)
      const referenceRecords = aggregateRecords(props.report.referenceRecordsArray)

      // Calculate date boundaries
      const currentStart = Math.min(...currentRecords.map((r) => r.timestamp))
      const currentEnd = Math.max(...currentRecords.map((r) => r.timestamp))
      const referenceStart = Math.min(...referenceRecords.map((r) => r.timestamp))

      const isSingleDay = currentEnd - currentStart <= 86400000

      const chart = new Chart(chartCanvas, {
        type: 'line',
        data: {
          datasets: [
            {
              xAxisID: 'xCurrent',
              yAxisID: 'y1',
              label: 'Views',
              data: currentRecords.map((row) => ({ x: row.timestamp, y: row.views })),
              borderColor: '#3B82F6'
            },
            {
              xAxisID: 'xReference',
              yAxisID: 'y1',
              label: 'Views Ref.',
              data: referenceRecords.map((row) => ({ x: row.timestamp, y: row.views })),
              borderColor: 'transparent',
              backgroundColor: 'rgba(59, 130, 246, 0.3)',
              fill: true
            },
            {
              xAxisID: 'xCurrent',
              yAxisID: 'y1',
              label: 'Visitors',
              data: currentRecords.map((row) => ({ x: row.timestamp, y: row.visitors })),
              borderColor: '#10B981'
            },
            {
              xAxisID: 'xReference',
              yAxisID: 'y1',
              label: 'Visitors Ref.',
              data: referenceRecords.map((row) => ({ x: row.timestamp, y: row.visitors })),
              backgroundColor: 'rgba(16, 185, 129, 0.3)',
              borderColor: 'transparent',
              fill: true
            },
            {
              xAxisID: 'xCurrent',
              yAxisID: 'y2',
              label: 'Bounce Rate',
              data: currentRecords.map((row) => ({ x: row.timestamp, y: row.bounceRate / 100 })),
              borderColor: '#F59E0B'
            },
            {
              xAxisID: 'xReference',
              yAxisID: 'y2',
              label: 'Bounce Rate Ref.',
              data: referenceRecords.map((row) => ({ x: row.timestamp, y: row.bounceRate / 100 })),
              backgroundColor: 'rgba(245, 158, 11, 0.3)',
              borderColor: 'transparent',
              fill: true
            }
          ]
        },
        options: {
          responsive: true,
          maintainAspectRatio: false,
          interaction: {
            mode: 'index',
            intersect: false
          },
          plugins: {
            tooltip: {
              mode: 'index',
              intersect: false,
              position: 'nearest',
              callbacks: {
                title: (items) => {
                  const date = new Date(items[0].parsed.x)
                  return date.toLocaleDateString('en-US', {
                    weekday: 'short',
                    month: 'short',
                    day: 'numeric',
                    year: 'numeric',
                    ...(isSingleDay && { hour: '2-digit', minute: '2-digit' })
                  })
                }
              }
            },
            legend: {
              position: 'bottom',
              labels: {
                boxWidth: 12,
                padding: 20
              }
            }
          },
          scales: {
            xCurrent: {
              type: 'time',
              position: 'bottom',
              time: {
                unit: isSingleDay ? 'hour' : 'day',
                tooltipFormat: isSingleDay ? 'HH:mm - EEEE, MMM d' : 'EEEE, MMM d, yyyy',
                displayFormats: {
                  hour: 'HH:mm',
                  day: 'EEE, MMM d'
                }
              },
              grid: {
                display: true,
                color: (ctx) => (ctx.tick.value === currentStart ? '#ddddd' : '#33333')
              },
              adapters: {
                date: {
                  zone: 'UTC'
                }
              }
            },
            xReference: {
              type: 'time',
              position: 'top',
              time: {
                unit: isSingleDay ? 'hour' : 'day',
                tooltipFormat: isSingleDay ? 'HH:mm - EEEE, MMM d' : 'EEEE, MMM d, yyyy',
                displayFormats: {
                  hour: 'HH:mm',
                  day: 'EEE, MMM d'
                }
              },
              grid: {
                display: true,
                color: (ctx) => (ctx.tick.value === referenceStart ? '#3B82F6' : '#64748B')
              },
              adapters: {
                date: {
                  zone: 'UTC'
                }
              }
            },
            y1: {
              position: 'left',
              beginAtZero: true,
              grid: { drawOnChartArea: false },
              ticks: { precision: 0 },
              title: { display: true, text: 'Views & Visitors', font: { size: 20 } }
            },
            y2: {
              position: 'right',
              beginAtZero: true,
              max: 1,
              grid: { display: true },
              ticks: {
                callback: (value) => `${(+value * 100).toFixed(0)}%`
              },
              title: { display: true, text: 'Bounce Rate', font: { size: 20 } }
            }
          }
        }
      })
      return () => {
        chart.destroy()
      }
    })
  }
</script>

<Card class="min-h-50 col-span-4 w-full max-w-none overflow-clip">
  <div class="flex flex-row justify-between">
    <Heading tag="h4" class="w-fit">Overall</Heading>
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
    <div style="height: 300px">
      <canvas use:initChart></canvas>
    </div>
  {/if}
</Card>
