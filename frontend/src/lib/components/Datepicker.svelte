<script lang="ts">
  import { Datepicker, Label, Select } from 'flowbite-svelte'
  import { onMount } from 'svelte'
  import * as AppState from '$lib/state/app.svelte'

  const appState = AppState.getContext()

  // Initialize from localStorage
  const storedCurrentPeriod = localStorage.getItem('currentPeriod')
  const storedReferencePeriod = localStorage.getItem('referencePeriod')
  const storedCurrentStart = localStorage.getItem('currentStart')
  const storedCurrentEnd = localStorage.getItem('currentEnd')
  const storedReferenceStart = localStorage.getItem('referenceStart')
  const storedReferenceEnd = localStorage.getItem('referenceEnd')

  // Current period state
  type CurrentPeriod =
    | 'today'
    | 'yesterday'
    | 'last7'
    | 'last30'
    | 'monthToDate'
    | 'lastMonth'
    | 'yearToDate'
    | 'last12'
    | 'custom'
  let currentPeriod = $state<CurrentPeriod>((storedCurrentPeriod as CurrentPeriod) || 'last7')

  // Reference period state
  type ReferencePeriod = 'previousPeriod' | 'previousYear' | 'custom'
  let referencePeriod = $state<ReferencePeriod>(
    (storedReferencePeriod as ReferencePeriod) || 'previousPeriod'
  )

  // Date states
  let selectedCurrentStart = $state(
    storedCurrentStart ? new Date(storedCurrentStart) : $state.snapshot(appState.date.currentStart)
  )
  let selectedCurrentEnd = $state(
    storedCurrentEnd ? new Date(storedCurrentEnd) : $state.snapshot(appState.date.currentEnd)
  )
  let selectedReferenceStart = $state(
    storedReferenceStart
      ? new Date(storedReferenceStart)
      : $state.snapshot(appState.date.referenceStart)
  )
  let selectedReferenceEnd = $state(
    storedReferenceEnd ? new Date(storedReferenceEnd) : $state.snapshot(appState.date.referenceEnd)
  )

  // Initialize app state from localStorage on mount
  onMount(async () => {
    await applyDates()
  })

  const loadRecords = async () => {
    await Promise.all(
      Object.values(appState.account.reports).map(async (report) => {
        await report.loadRecords('current', appState.date.currentStart, appState.date.currentEnd)
        await report.loadRecords(
          'reference',
          appState.date.referenceStart,
          appState.date.referenceEnd
        )
      })
    )
  }

  const calculateCurrentDates = (period: CurrentPeriod) => {
    const now = new Date()
    const year = now.getFullYear()
    const month = now.getMonth()
    const endOfDay = new Date(now)
    endOfDay.setHours(23, 59, 59, 999)

    // Helper to get start of day
    const startOfDay = (date: Date) => {
      const d = new Date(date)
      d.setHours(0, 0, 0, 0)
      return d
    }

    switch (period) {
      case 'today': {
        const start = startOfDay(now)
        return { start, end: endOfDay }
      }
      case 'yesterday': {
        const yesterday = new Date(now)
        yesterday.setDate(yesterday.getDate() - 1)
        const start = startOfDay(yesterday)
        const end = new Date(yesterday)
        end.setHours(23, 59, 59, 999)
        return { start, end }
      }
      case 'last7': {
        const start = new Date(now)
        start.setDate(start.getDate() - 6)
        return { start: startOfDay(start), end: endOfDay }
      }
      case 'last30': {
        const start = new Date(now)
        start.setDate(start.getDate() - 29)
        return { start: startOfDay(start), end: endOfDay }
      }
      case 'monthToDate':
        return {
          start: startOfDay(new Date(year, month, 1)),
          end: endOfDay
        }
      case 'lastMonth': {
        const start = new Date(year, month - 1, 1)
        const end = new Date(year, month, 0)
        end.setHours(23, 59, 59, 999)
        return {
          start: startOfDay(start),
          end: end
        }
      }
      case 'yearToDate':
        return {
          start: startOfDay(new Date(year, 0, 1)),
          end: endOfDay
        }
      case 'last12': {
        const start = new Date(now)
        start.setFullYear(start.getFullYear() - 1)
        return {
          start: startOfDay(start),
          end: endOfDay
        }
      }
      default:
        return {
          start: new Date(selectedCurrentStart),
          end: new Date(selectedCurrentEnd)
        }
    }
  }

  const calculateReferenceDates = () => {
    if (referencePeriod === 'previousYear') {
      const start = new Date(selectedCurrentStart)
      start.setFullYear(start.getFullYear() - 1)
      const end = new Date(selectedCurrentEnd)
      end.setFullYear(end.getFullYear() - 1)
      return { start, end }
    }

    if (referencePeriod === 'previousPeriod') {
      const duration = selectedCurrentEnd.getTime() - selectedCurrentStart.getTime()
      const start = new Date(selectedCurrentStart.getTime() - duration - 1)
      const end = new Date(selectedCurrentStart.getTime() - 1)
      return { start, end }
    }

    return { start: selectedReferenceStart, end: selectedReferenceEnd }
  }

  const applyDates = async () => {
    // Clone dates to avoid reference issues
    const currentDates = calculateCurrentDates(currentPeriod)
    selectedCurrentStart = new Date(currentDates.start)
    selectedCurrentEnd = new Date(currentDates.end)

    // Update app state with cloned dates
    appState.date.currentStart = new Date(selectedCurrentStart)
    appState.date.currentEnd = new Date(selectedCurrentEnd)
    appState.date.currentEnd.setHours(23, 59, 59, 999)

    // Similar cloning for reference dates
    const referenceDates = calculateReferenceDates()
    selectedReferenceStart = new Date(referenceDates.start)
    selectedReferenceEnd = new Date(referenceDates.end)

    appState.date.referenceStart = new Date(selectedReferenceStart)
    appState.date.referenceEnd = new Date(selectedReferenceEnd)
    appState.date.referenceEnd.setHours(23, 59, 59, 999)

    // Persist to localStorage
    localStorage.setItem('currentPeriod', currentPeriod)
    localStorage.setItem('referencePeriod', referencePeriod)
    localStorage.setItem('currentStart', selectedCurrentStart.toISOString())
    localStorage.setItem('currentEnd', selectedCurrentEnd.toISOString())
    localStorage.setItem('referenceStart', selectedReferenceStart.toISOString())
    localStorage.setItem('referenceEnd', selectedReferenceEnd.toISOString())

    await loadRecords()
  }
</script>

<div class="flex flex-row gap-4 py-4">
  <div class="flex items-end gap-2">
    <div class="w-40">
      <Label class="mb-2">Current</Label>
      <Select bind:value={currentPeriod} on:change={applyDates}>
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

    {#if currentPeriod === 'custom'}
      <Datepicker
        showActionButtons
        range
        bind:rangeFrom={selectedCurrentStart}
        bind:rangeTo={selectedCurrentEnd}
        on:apply={applyDates}
        inputClass="rounded-none border-gray-200 w-64"
      />
    {/if}
  </div>
  <div class="pt-8">compared to</div>
  <div class="flex items-end gap-2">
    <div class="w-40">
      <Label class="mb-2">Reference</Label>
      <Select bind:value={referencePeriod} on:change={applyDates}>
        <option value="previousPeriod">Previous period</option>
        <option value="previousYear">Previous year</option>
        <option value="custom">Custom range</option>
      </Select>
    </div>

    {#if referencePeriod === 'custom'}
      <Datepicker
        showActionButtons
        range
        bind:rangeFrom={selectedReferenceStart}
        bind:rangeTo={selectedReferenceEnd}
        on:apply={applyDates}
        inputClass="rounded-none border-gray-200 w-64"
      />
    {/if}
  </div>
</div>
