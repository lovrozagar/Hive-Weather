function getDayOfWeek(date_yyyy_mm_dd, index) {
  if (index === 0) return 'Today'
  if (index === 1) return 'Tomorrow'

  const daysOfWeek = [
    'Monday',
    'Tuesday',
    'Wednesday',
    'Thursday',
    'Friday',
    'Saturday',
    'Sunday',
  ]
  const date = new Date(date_yyyy_mm_dd)

  return daysOfWeek[date.getDay()]
}

export default getDayOfWeek
