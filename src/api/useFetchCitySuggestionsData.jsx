import { useCallback } from 'react'

// WILL NOT WORK DUE TO CORS, REWRITTEN TO THIS SO THAT I CAN REMOVE CDN AND START TRANSITIONING ON THE BACKEND

const useFetchCitySuggestionsData = () => {
  //
  const fetchCitySuggestionsData = useCallback(async (input) => {
    try {
      const prefix =
        'https://maps.googleapis.com/maps/api/place/autocomplete/json?'
      const googleKey = import.meta.env.VITE_GOOGLE_API_KEY
      const key = `key=${googleKey}`

      const response = await fetch(
        `${prefix}input=${input}&types=geocode&${key}`
      )

      const json = await response.json()

      if (json.status === 'OK') {
        const predictions = json.predictions
        const suggestions = []

        for (const prediction of predictions) {
          const { place_id } = prediction
          const placeDetails = await getPlaceDetails(place_id, googleKey)

          if (placeDetails) {
            const { city, country, countryCode, lat, lng } = placeDetails
            suggestions.push({
              name: city,
              region: country,
              countryCode,
              lat,
              lon: lng,
            })
          }
        }

        console.log(suggestions)
        return suggestions
      }
      //
    } catch (error) {
      console.error('Error occurred:', error)
    }
  }, [])

  return fetchCitySuggestionsData
}

async function getPlaceDetails(placeId, apiKey) {
  const detailsUrl = 'https://maps.googleapis.com/maps/api/place/details/json?'
  const key = `key=${apiKey}`

  const response = await fetch(`${detailsUrl}place_id=${placeId}&${key}`)
  const json = await response.json()

  if (json.status === 'OK') {
    const { address_components } = json.result
    const cityComponent = address_components.find((component) =>
      component.types.includes('locality')
    )
    const countryComponent = address_components.find((component) =>
      component.types.includes('country')
    )

    if (cityComponent && countryComponent) {
      const city = cityComponent.long_name
      const country = countryComponent.long_name
      const countryCode = countryComponent.short_name
      const { lat, lng } = json.result.geometry.location
      return { city, country, countryCode, lat, lng }
    }
  }

  return null
}

export default useFetchCitySuggestionsData
