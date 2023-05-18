import { useCallback, useEffect, useState } from 'react'

const useFetchCurrentWeatherData = (latitude, longitude) => {
  const [currentData, setCurrentData] = useState(null)

  const fetchCurrentWeatherData = useCallback(async () => {
    if (!latitude || !longitude) return

    const backendAbsolutePath =
      'https://hive-weather-server.onrender.com/api/weather/current?'

    try {
      const response = await fetch(
        `${backendAbsolutePath}latitude=${latitude}&longitude=${longitude}`
      )
      const json = await response.json()
      console.log('CURRENT BACKEND REQUEST', json)

      setCurrentData(json)
      //
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
