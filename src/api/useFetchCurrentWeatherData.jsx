import { useCallback, useEffect, useState } from 'react'

const useFetchCurrentWeatherData = (latitude, longitude) => {
  const [currentData, setCurrentData] = useState(null)

  const fetchCurrentWeatherData = useCallback(async () => {
    const prefix =
      'https://api.open-meteo.com/v1/forecast?latitude=52.52&longitude=13.41&current_weather=true&hourly=temperature_2m,relativehumidity_2m,windspeed_10m"'
    const lat = `lat=${latitude}`
    const lng = `&lon=${longitude}`
    const options = '&exclude=daily,hourly,minutely,alerts&units=metric'
    const key = '&appid=20f7632ffc2c022654e4093c6947b4f4'

    try {
      const response = await fetch(`${prefix}${lat}${lng}${options}${key}`)
      const json = await response.json()
      console.log('OWA', json.current)
      setCurrentData(json.current)
    } catch (error) {
      console.log(error)
      setCurrentData(null)
    }
  }, [latitude, longitude])

  useEffect(() => {
    fetchCurrentWeatherData()
  }, [fetchCurrentWeatherData])

  return currentData
}

export default useFetchCurrentWeatherData
