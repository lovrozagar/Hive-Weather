import { useCallback, useEffect, useState } from 'react'

const useFetchHourlyData = (latitude, longitude, index) => {
  const [dayHourlyData, setDayHourlyData] = useState(null)
  // CUSTOM HOOK TO FETCH 24 HOUR DAY DATA
  const fetchHourlyData = useCallback(async () => {
    const backendAbsolutePath =
      'https://hive-weather-server.onrender.com/api/weather/hourly?'

    // LOCAL
    // const backendAbsolutePath = 'http://localhost:5000/api/weather/hourly?'

    try {
      const response = await fetch(
        `${backendAbsolutePath}latitude=${latitude}&longitude=${longitude}&index=${index}`
      )
      const json = await response.json()

      setDayHourlyData(json)
    } catch (error) {
      console.error(error)
      setDayHourlyData(null)
    }
  }, [latitude, longitude, index])

  useEffect(() => {
    fetchHourlyData()
  }, [fetchHourlyData])

  return dayHourlyData
}

export default useFetchHourlyData
