import { useCallback, useEffect, useState } from 'react'
import getRandomYearTodaysDate from '../utils/getRandomYearTodaysDate'

const useFetchCurrentWeatherData = (latitude, longitude) => {
  const [throwbackData, setThrowbackData] = useState([null, null])

  const fetchCurrentWeatherData = useCallback(async () => {
    const throwbackDate = getRandomYearTodaysDate()

    const prefix = 'https://archive-api.open-meteo.com/v1/era5?'
    const lat = `latitude=${latitude}`
    const lng = `&longitude=${longitude}`
    const startDate = `&start_date=${throwbackDate}`
    const endDate = `&end_date=${throwbackDate}`
    const options =
      '&hourly=temperature_2m,windspeed_10m,winddirection_10m,weathercode'

    const response = await fetch(
      `${prefix}${lat}${lng}${startDate}${endDate}${options}`
    )

    const json = await response.json()
    console.log('throwback!!!', json)

    setThrowbackData([json.hourly, throwbackDate])
  }, [latitude, longitude])

  useEffect(() => {
    fetchCurrentWeatherData()
  }, [fetchCurrentWeatherData])

  return throwbackData
}

export default useFetchCurrentWeatherData
