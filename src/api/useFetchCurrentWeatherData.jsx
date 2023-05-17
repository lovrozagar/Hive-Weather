import { useCallback, useEffect, useState } from 'react'

const useFetchCurrentWeatherData = (latitude, longitude) => {
  const [currentData, setCurrentData] = useState(null)

  const fetchCurrentWeatherData = useCallback(async () => {
    if (!latitude || !longitude) return

    try {
      const response = await fetch(
        `https://api.open-meteo.com/v1/forecast?latitude=${latitude}&longitude=${longitude}&current_weather=true&hourly=temperature_2m,windspeed_10m,weathercode`
      )
      const json = await response.json()
      console.log('current', json.current_weather)

      setCurrentData(json.current_weather)
    } catch (error) {
      console.log(error)
      setCurrentData(null)
    }
  }, [latitude, longitude])

  useEffect(() => {
    fetchCurrentWeatherData()
  }, [latitude, longitude, fetchCurrentWeatherData])

  return currentData
}

export default useFetchCurrentWeatherData
