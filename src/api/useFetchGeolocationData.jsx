import { useEffect, useState } from 'react'

const useFetchUserGeolocationData = () => {
  const [userCoordinates, setUserCoordinates] = useState(null)
  const [userPlace, setUserPlace] = useState(null)

  useEffect(() => {
    const fetchUserGeolocationData = async () => {
      navigator.geolocation.getCurrentPosition(async (position) => {
        // JS GEOLOCATION API
        setUserCoordinates(position?.coords)

        try {
          // GOOGLE GEOLOCATION API WITH THE COORDS
          const prefix = 'https://maps.googleapis.com/maps/api/geocode/json?'
          const latlng = `latlng=${position.coords.latitude},${position.coords.longitude}`
          const googleKey = import.meta.env.VITE_GOOGLE_API_KEY
          const key = `&key=${googleKey}`

          const response = await fetch(`${prefix}${latlng}${key}`)
          const data = await response.json()
          console.log('geo', data)

          // GET CITY, COUNTRY AND COUNTRY CODE
          let city, country, countryCode
          data.results[0].address_components.forEach((component) => {
            if (component.types.includes('locality')) {
              city = component.long_name
            }
            if (component.types.includes('country')) {
              country = component.long_name
              countryCode = component.short_name
            }
          })

          setUserPlace({ city, country, countryCode })
          //
        } catch (error) {
          console.log(error)
          setUserPlace(null)
        }
      })
    }

    fetchUserGeolocationData()
  }, [])

  return { userCoordinates, userPlace }
}

export default useFetchUserGeolocationData
