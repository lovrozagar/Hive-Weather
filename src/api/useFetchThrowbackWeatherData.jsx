import { useCallback, useEffect, useState } from 'react'

const useFetchThrowbackWeatherData = (latitude, longitude) => {
  const [throwbackData, setThrowbackData] = useState([null, null])

  const fetchThrowbackWeatherData = useCallback(async () => {
    if (!latitude || !longitude) {
      setThrowbackData([null, null])
      return
    }

    console.log(latitude, longitude)

    try {
      const backendAbsolutePath =
        'https://hive-weather-server.onrender.com/weather/throwback?'

      const response = await fetch(
        `${backendAbsolutePath}latitude=${latitude}&longitude=${longitude}`
      )
      const json = await response.json()
      const { hourly, throwbackDate } = json
      console.log('THROWBACK BACKEND REQUEST', json)

      setThrowbackData([hourly, throwbackDate])
      //
    } catch (error) {
      console.log(error)
      setThrowbackData([null, null])
    }
  }, [latitude, longitude])

  useEffect(() => {
    fetchThrowbackWeatherData()
  }, [fetchThrowbackWeatherData])

  return throwbackData
}

export default useFetchThrowbackWeatherData
