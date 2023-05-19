import { useCallback } from 'react'

const useFetchCitySuggestionsData = () => {
  //
  const fetchCitySuggestionsData = useCallback(async (input) => {
    const backendAbsolutePath =
      'https://hive-weather-server.onrender.com/api/google/autocomplete?'

    // LOCAL
    // const backendAbsolutePath = 'http://localhost:5000/api/google/autocomplete?'

    const inputString = `input=${input}`

    try {
      const response = await fetch(`${backendAbsolutePath}${inputString}`)
      const json = await response.json()

      return json.suggestions
      //
    } catch (error) {
      console.log(error)
    }
  }, [])

  return fetchCitySuggestionsData
}

export default useFetchCitySuggestionsData
