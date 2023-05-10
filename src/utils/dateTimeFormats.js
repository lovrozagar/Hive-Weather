const yyyymmdd_to_ddmmyyyy = (date) => date.split('-').reverse().join('.') + '.'
const hourMinutes_yyyymmdd = (date) => date.split('T').at(-1)
const getDayTime = (hourMinutesSunrise, hourMinutesSunset) => {
  const sunriseTimeFloat = parseFloat(
    hourMinutesSunrise.toString().split(':').join('.')
  )
  const sunsetTimeFloat = parseFloat(
    hourMinutesSunset.toString().split(':').join('.')
  )

  const dayTimeFloat =
    sunriseTimeFloat < sunsetTimeFloat
      ? (sunsetTimeFloat - sunriseTimeFloat).toFixed(2)
      : (sunriseTimeFloat - sunsetTimeFloat).toFixed(2)

  return `${dayTimeFloat.split('.')[0]} h ${dayTimeFloat.split('.')[1]} min`
}

export { yyyymmdd_to_ddmmyyyy, hourMinutes_yyyymmdd, getDayTime }
