import { useCallback, useEffect, useState } from 'react'

const useFetchHourlyData = (latitude, longitude, index) => {
  const [dayHourlyData, setDayHourlyData] = useState(null)
  // CUSTOM HOOK TO FETCH 24 HOUR DAY DATA
  const fetchHourlyData = useCallback(async () => {
    const prefix = 'https://api.open-meteo.com/v1/forecast?'
    const lat = `latitude=${latitude}`
    const lng = `&longitude=${longitude}`
    const options =
      '&hourly=relativehumidity_2m,temperature_2m,apparent_temperature,precipitation_probability,snowfall,weathercode,pressure_msl,cloudcover,visibility,windspeed_10m,winddirection_10m,uv_index,is_day&timezone=auto'

    const start = index * 24
    const end = start + 24

    try {
      const response = await fetch(`${prefix}${lat}${lng}${options}`)
      const json = await response.json()
      console.log('HOURLY REQUEST', json)
      const { hourly } = json

      const indexDayHours = {}
      for (let key in hourly) {
        indexDayHours[key] = hourly[key].slice(start, end)
      }
      setDayHourlyData(indexDayHours)
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
