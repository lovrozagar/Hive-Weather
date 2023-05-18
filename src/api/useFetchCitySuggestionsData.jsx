import { useCallback } from 'react'

const useFetchCitySuggestionsData = () => {
  //
  const fetchCitySuggestionsData = useCallback(async (input) => {
    const backendAbsolutePath =
      'https://hive-weather-server.onrender.com/api/google/autocomplete?'
    const inputString = `input=${input}`

    try {
      const response = await fetch(`${backendAbsolutePath}${inputString}`)
      const json = await response.json()
      console.log('AUTOCOMPLETE BACKEND REQUEST', json)

      return json.suggestions
      //
    } catch (error) {
      console.log(error)
      return null
    }
  }, [])

  return fetchCitySuggestionsData
}

export default useFetchCitySuggestionsData
