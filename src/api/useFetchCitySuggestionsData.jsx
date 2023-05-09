import React, { useCallback } from 'react'

const useFetchCitySuggestionsData = () => {
  const fetchCitySuggestionsData = useCallback(async (input) => {
    const autocompleteService =
      new window.google.maps.places.AutocompleteService()
    const options = {
      input,
      types: ['(cities)'],
    }
    const results = await new Promise((resolve, reject) => {
      autocompleteService.getPlacePredictions(options, (results, status) => {
        if (status !== 'OK') {
          reject(status)
        }
        resolve(results)
      })
    })

    const suggestions = await Promise.all(
      results.map(async (result) => {
        const placeId = result.place_id
        const details = await new Promise((resolve, reject) => {
          const placesService = new window.google.maps.places.PlacesService(
            document.createElement('div')
          )
          placesService.getDetails({ placeId }, (details, status) => {
            if (status !== 'OK') {
              reject(status)
            }
            resolve(details)
          })
        })

        const lat = details.geometry.location.lat()
        const lon = details.geometry.location.lng()
        const name = result.structured_formatting.main_text
        const region = result.structured_formatting.secondary_text
        const countryCode = details.address_components.find((component) =>
          component.types.includes('country')
        ).short_name

        return { name, region, countryCode, lat, lon }
      })
    )

    return suggestions
  }, [])

  return fetchCitySuggestionsData
}

export default useFetchCitySuggestionsData
