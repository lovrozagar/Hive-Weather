const yyyymmdd_to_ddmmyyyy = (date) => date.split('-').reverse().join('.') + '.'
const hourMinutes_yyyymmdd = (date) => date.split('T').at(-1)
const getDayTime = (hourMinutesSunrise, hourMinutesSunset) => {
  const sunriseHours = parseInt(hourMinutesSunrise.split(':')[0])
  const sunriseMinutes = parseInt(hourMinutesSunrise.split(':')[1])

  const sunsetHours = parseInt(hourMinutesSunset.split(':')[0])
  const sunsetMinutes = parseInt(hourMinutesSunset.split(':')[1])

  const sunriseTimeFloat = sunriseHours + sunriseMinutes / 60
  const sunsetTimeFloat = sunsetHours + sunsetMinutes / 60

  let dayTimeFloat
  if (sunriseTimeFloat < sunsetTimeFloat)
    dayTimeFloat = sunsetTimeFloat - sunriseTimeFloat
  else dayTimeFloat = 24 - sunriseTimeFloat + sunsetTimeFloat

  const hours = Math.floor(dayTimeFloat)
  const minutes = Math.floor((dayTimeFloat - hours) * 60)

  return `${hours} h ${minutes} min`
}

export { yyyymmdd_to_ddmmyyyy, hourMinutes_yyyymmdd, getDayTime }
