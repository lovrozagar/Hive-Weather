import { useCallback, useEffect, useState } from 'react'

const useFetchForecastData = (latitude, longitude) => {
  const [forecastData, setForecastData] = useState(null)
  // CUSTOM HOOK TO FETCH FORECAST
  const fetchForecastData = useCallback(async () => {
    const prefix = 'https://api.open-meteo.com/v1/forecast?'
    const lat = `latitude=${latitude}`
    const lng = `&longitude=${longitude}`
    const options =
      '&hourly=relativehumidity_2m&daily=weathercode,temperature_2m_max,temperature_2m_min,apparent_temperature_max,apparent_temperature_min,sunrise,sunset,uv_index_max,uv_index_clear_sky_max,precipitation_sum,rain_sum,showers_sum,snowfall_sum,precipitation_hours,precipitation_probability_max,windspeed_10m_max&timezone=auto'

    try {
      const response = await fetch(`${prefix}${lat}${lng}${options}`)
      const json = await response.json()
      console.log(json)
      setForecastData(json.daily)
    } catch (error) {
      console.error(error)
      setForecastData(null)
    }
  }, [latitude, longitude])

  useEffect(() => {
    fetchForecastData()
  }, [fetchForecastData])

  return forecastData
}

export default useFetchForecastData
