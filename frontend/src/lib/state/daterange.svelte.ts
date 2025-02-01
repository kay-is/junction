export class DateRange {
  currentStart: Date = $state(new Date())
  currentEnd: Date = $state(new Date())
  referenceStart: Date = $state(new Date())
  referenceEnd: Date = $state(new Date())

  constructor() {
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
}
