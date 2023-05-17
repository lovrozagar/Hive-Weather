import { useEffect, useState } from 'react'

const useFetchUserGeolocationData = () => {
  const [userCoordinates, setUserCoordinates] = useState(null)
  const [userPlace, setUserPlace] = useState(null)

  useEffect(() => {
    const fetchUserGeolocationData = async () => {
      navigator.geolocation.getCurrentPosition(async (position) => {
        // JS GEOLOCATION API
        setUserCoordinates(position?.coords)

        if (!userCoordinates) return

        try {
          // GOOGLE GEOLOCATION API WITH THE COORDS
          const response = await fetch(
            `https://maps.googleapis.com/maps/api/geocode/json?latlng=${position.coords.latitude},${position.coords.longitude}&key=AIzaSyAO1ey3FsygPJn0Xo-4eDhbhHQFMVmql5Y`
          )
          const data = await response.json()

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
  }, [userCoordinates])

  return { userCoordinates, userPlace }
}

export default useFetchUserGeolocationData
