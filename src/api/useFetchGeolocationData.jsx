import { useEffect, useState } from 'react'

const useFetchGeolocationData = () => {
  const [userCoordinates, setUserCoordinates] = useState(null)
  const [userPlace, setUserPlace] = useState(null)

  useEffect(() => {
    const fetchGeolocationData = async () => {
      try {
        const position = await new Promise((resolve, reject) => {
          navigator.geolocation.getCurrentPosition(resolve, reject)
        })

        setUserCoordinates(position?.coords)

        const backendAbsolutePath =
          'http://localhost:5000/api/google/geocoding?'
        const latitude = `latitude=${position.coords.latitude}`
        const longitude = `&longitude=${position.coords.longitude}`

        const response = await fetch(
          `${backendAbsolutePath}${latitude}${longitude}`
        )
        const json = await response.json()
        console.log(json)

        setUserPlace(json)
        //
      } catch (error) {
        console.log(error)
      }
    }

    fetchGeolocationData()
  }, [])

  return { userCoordinates, userPlace }
}

export default useFetchGeolocationData
