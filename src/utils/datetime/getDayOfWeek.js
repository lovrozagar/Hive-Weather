function getDayOfWeek(date_yyyy_mm_dd, index) {
  if (index === 0) return 'Today'
  if (index === 1) return 'Tomorrow'

  const daysOfWeek = [
    'Sunday',
    'Monday',
    'Tuesday',
    'Wednesday',
    'Thursday',
    'Friday',
    'Saturday',
  ]
  const date = new Date(date_yyyy_mm_dd)

  return daysOfWeek[date.getDay()]
}

export default getDayOfWeek
