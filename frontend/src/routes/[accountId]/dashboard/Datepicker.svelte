<script lang="ts">
  import { Datepicker, Label, Select } from 'flowbite-svelte'
  import type { DateRange } from '$lib/state/daterange.svelte'
  import type { Report } from '$lib/state/report.svelte'

  type DatepickerProps = {
    date: DateRange
    activeReports: Report[]
  }

  const props: DatepickerProps = $props()

  const applyDates = () => {
    const currentDates = props.date.calculateCurrentDates(props.date.currentPeriod)
    props.date.currentStart = currentDates.start
    props.date.currentEnd = currentDates.end

    const referenceDates = props.date.calculateReferenceDates()
    props.date.referenceStart = referenceDates.start
    props.date.referenceEnd = referenceDates.end

    props.activeReports.forEach((report) => {
      report.loadRecords('current', props.date.currentStart, props.date.currentEnd)
      report.loadRecords('reference', props.date.referenceStart, props.date.referenceEnd)
    })
  }
</script>

<div class="flex flex-row gap-4 py-4">
  <div class="flex items-end gap-2">
    <div class="w-40">
      <Label class="mb-2">Current</Label>
      <Select bind:value={props.date.currentPeriod} on:change={applyDates}>
        <option value="today">Today</option>
        <option value="yesterday">Yesterday</option>
        <option value="last7">Last 7 days</option>
        <option value="last30">Last 30 days</option>
        <option value="monthToDate">Month to date</option>
        <option value="lastMonth">Last month</option>
        <option value="yearToDate">Year to date</option>
        <option value="last12">Last 12 months</option>
        <option value="custom">Custom range</option>
      </Select>
    </div>

    {#if props.date.currentPeriod === 'custom'}
      <Datepicker
        showActionButtons
        range
        bind:rangeFrom={props.date.currentStart}
        bind:rangeTo={props.date.currentEnd}
        on:apply={applyDates}
        inputClass="rounded-none border-gray-200 w-64"
      />
    {/if}
  </div>
  <div class="pt-8">compared to</div>
  <div class="flex items-end gap-2">
    <div class="w-40">
      <Label class="mb-2">Reference</Label>
      <Select bind:value={props.date.referencePeriod} on:change={applyDates}>
        <option value="previousPeriod">Previous period</option>
        <option value="previousYear">Previous year</option>
        <option value="custom">Custom range</option>
      </Select>
    </div>

    {#if props.date.referencePeriod === 'custom'}
      <Datepicker
        showActionButtons
        range
        bind:rangeFrom={props.date.referenceStart}
        bind:rangeTo={props.date.referenceEnd}
        on:apply={applyDates}
        inputClass="rounded-none border-gray-200 w-64"
      />
    {/if}
  </div>
</div>
