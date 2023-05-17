import { useCallback, useEffect, useState } from 'react'

const useFetchForecastData = (latitude, longitude) => {
  const [forecastData, setForecastData] = useState([null, null, null])
  // CUSTOM HOOK TO FETCH FORECAST
  const fetchForecastData = useCallback(async () => {
    if (!latitude || !longitude) return

    const backendAbsolutePath = 'http://localhost:5000/api/weather/forecast?'

    try {
      const response = await fetch(
        `${backendAbsolutePath}latitude=${latitude}&longitude=${longitude}`
      )
      const json = await response.json()
      console.log('FORECAST BACKEND REQUEST', json)
      setForecastData([json.timezone, json.current_weather, json.daily])
    } catch (error) {
      console.error(error)
      setForecastData([null, null, null])
    }
  }, [latitude, longitude])

  useEffect(() => {
    fetchForecastData()
  }, [fetchForecastData])

  return forecastData
}

export default useFetchForecastData
