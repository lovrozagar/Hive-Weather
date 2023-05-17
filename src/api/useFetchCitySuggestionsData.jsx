import { useCallback } from 'react'

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
          resolve([])
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

        const city = result.structured_formatting.main_text || 'no-city'
        const country =
          result.structured_formatting.secondary_text || 'no-country' // RETURN EMPTY STRING IN KOSOVO LIKE CASES WHERE COUNTRY IS NOT RETURNED
        const countryCode =
          details.address_components.find((component) =>
            component.types.includes('country')
          )?.short_name || 'no-country-code'
        const lat = details.geometry.location.lat()
        const lng = details.geometry.location.lng()

        console.log({ city, country, countryCode, lat, lng })
        return { city, country, countryCode, lat, lng }
      })
    )

    return suggestions
  }, [])

  return fetchCitySuggestionsData
}

export default useFetchCitySuggestionsData
