export type CurrentPeriod =
  | 'today'
  | 'yesterday'
  | 'last7'
  | 'last30'
  | 'monthToDate'
  | 'lastMonth'
  | 'yearToDate'
  | 'last12'
  | 'custom'

export type ReferencePeriod = 'previousPeriod' | 'previousYear' | 'custom'

export class DateRange {
  currentPeriod = $state<CurrentPeriod>('last7')
  referencePeriod = $state<ReferencePeriod>('previousPeriod')

  currentStart: Date = $state(new Date())
  currentEnd: Date = $state(new Date())
  referenceStart: Date = $state(new Date())
  referenceEnd: Date = $state(new Date())

  constructor() {
    const cachedDates = localStorage.getItem('daterange')
    if (cachedDates) {
      const dates = JSON.parse(cachedDates)
      this.currentPeriod = dates.currentPeriod || 'last7'
      this.referencePeriod = dates.referencePeriod || 'previousPeriod'
      this.currentStart = new Date(dates.currentStart)
      this.currentEnd = new Date(dates.currentEnd)
      this.referenceStart = new Date(dates.referenceStart)
      this.referenceEnd = new Date(dates.referenceEnd)
    } else {
      // monday 00:00
      const monday = new Date()
      monday.setDate(monday.getDate() - monday.getDay() + 1)
      monday.setHours(0, 0, 0, 0)
      this.currentStart = monday

      // next sunday 23:59
      const sunday = new Date()
      sunday.setDate(sunday.getDate() + (7 - sunday.getDay()))
      sunday.setHours(23, 59, 59, 999)
      this.currentEnd = sunday

      // last week monday 00:00
      const lastMonday = new Date()
      lastMonday.setDate(lastMonday.getDate() - lastMonday.getDay() - 6)
      lastMonday.setHours(0, 0, 0, 0)
      this.referenceStart = lastMonday

      // last week sunday 23:59
      const lastSunday = new Date()
      lastSunday.setDate(lastSunday.getDate() - lastSunday.getDay())
      lastSunday.setHours(23, 59, 59, 999)
      this.referenceEnd = lastSunday
    }

    $effect(() => {
      localStorage.setItem(
        'daterange',
        JSON.stringify({
          currentPeriod: this.currentPeriod,
          referencePeriod: this.referencePeriod,
          currentStart: this.currentStart,
          currentEnd: this.currentEnd,
          referenceStart: this.referenceStart,
          referenceEnd: this.referenceEnd
        })
      )
    })
  }

  calculateCurrentDates(period: CurrentPeriod) {
    const now = new Date()
    const year = now.getFullYear()
    const month = now.getMonth()
    const endOfDay = new Date(now)
    endOfDay.setHours(23, 59, 59, 999)

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
          start: new Date(this.currentStart),
          end: new Date(this.currentEnd)
        }
    }
  }

  calculateReferenceDates() {
    if (this.referencePeriod === 'previousYear') {
      const start = new Date(this.currentStart)
      start.setFullYear(start.getFullYear() - 1)
      const end = new Date(this.currentEnd)
      end.setFullYear(end.getFullYear() - 1)
      return { start, end }
    }

    if (this.referencePeriod === 'previousPeriod') {
      const duration = this.currentEnd.getTime() - this.currentStart.getTime()
      const start = new Date(this.currentStart.getTime() - duration - 1)
      const end = new Date(this.currentStart.getTime() - 1)
      return { start, end }
    }

    return {
      start: this.referenceStart,
      end: this.referenceEnd
    }
  }
}
