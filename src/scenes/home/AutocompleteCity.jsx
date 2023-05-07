import {
  Box,
  Link,
  TextField,
  Autocomplete,
  Typography,
  Divider,
  CircularProgress,
} from '@mui/material'
import FlexBox from '../../components/FlexBox'
import GridBox from '../../components/GridBox'

import {
  useState,
  useEffect,
  useCallback,
  useRef,
  Fragment,
  useMemo,
} from 'react'
import debounce from 'lodash.debounce'
import uniqid from 'uniqid'
import { useNavigate } from 'react-router-dom'

function AutocompleteCity() {
  const [city, setCity] = useState('')
  const [suggestions, setSuggestions] = useState([])
  const [loading, setLoading] = useState(false)
  const navigate = useNavigate()

  const requestPrefix = useMemo(
    () => `http://api.geonames.org/searchJSON?name_startsWith=`,
    []
  )
  const requestOptions = useMemo(
    () => `&featureCode=P&maxRows=5&username=tawish&orderby=population`,
    []
  )
  let debounceFetch = useRef(null)

  const emptySuggestions = () => setSuggestions([])

  const populateSuggestions = (data) =>
    setSuggestions(
      data.geonames.map((suggestion) => ({
        name: suggestion.name,
        region: suggestion.adminName1,
        countryCode: suggestion.countryCode,
        lat: suggestion.lat,
        lon: suggestion.lng,
      })) || []
    )

  const fetchSuggestions = useCallback(async () => {
    const response = await fetch(`${requestPrefix}${city}${requestOptions}`)
    const json = await response.json()
    console.log(json)
    return json
  }, [city, requestPrefix, requestOptions])

  const loadSuggestions = useCallback(() => {
    setLoading(true)

    if (debounceFetch.current) {
      debounceFetch.current.cancel()
      debounceFetch.current = null
    }

    debounceFetch.current = debounce(async () => {
      const data = await fetchSuggestions()
      populateSuggestions(data)
      setLoading(false)
    }, 200)

    debounceFetch.current()
  }, [fetchSuggestions])

  useEffect(() => {
    if (city && city.length > 0) loadSuggestions()
    else emptySuggestions()
  }, [city, loadSuggestions])

  const linkStyle = {
    '&&': {
      cursor: 'pointer',
      textDecoration: 'none',
      color: 'lightgray',
    },
  }
  const typographyStyle = {
    overflow: 'hidden',
    textOverflow: 'ellipsis',
    wordBreak: 'keep-all',
  }
  const fontNormalStyle = {
    mr: 1,
    color: 'black',
  }
  const fontLightStyle = {
    mr: 1,
    color: 'grey',
    fontWeight: '300',
  }

  // mapping object to a string and extracting later as MUI wants an array of strings
  const suggestionAsString = () => {
    return suggestions.length > 0
      ? suggestions.map(
          (suggestion) =>
            `${suggestion.name}/${suggestion.region}/${suggestion.lat}/${suggestion.lon}/${suggestion.countryCode}`
        )
      : []
  }

  const handleSearch = (e) => setCity(e.target.value)

  const handleChange = (e, value) => {
    if (value) {
      const [name, , lat, lon] = value.split('/')
      const latStr = lat.toString().replace('.', '_')
      const lonStr = lon.toString().replace('.', '_')

      navigate(`/hive-weather/forecast/${name}/${latStr}/${lonStr}`)
    }
  }

  return (
    <Autocomplete
      // onKeyDown={handleSearchEnter}
      selectOnFocus
      autoHighlight
      disableListWrap
      handleHomeEndKeys
      loading={loading}
      freeSolo={true}
      onChange={handleChange}
      onInputChange={handleSearch}
      options={suggestionAsString()}
      getOptionLabel={(option) => option}
      renderInput={(params) => (
        <InputAutocompleteField
          {...params}
          city={city}
          loading={loading}
          suggestions={suggestions}
        />
      )}
      renderOption={(option) => {
        const [name, region, lat, lon, countryCode] = option.key.split('/')
        // console.log(countryCode)
        return (
          <Box key={uniqid()}>
            <Box component='li' {...option}>
              <Link sx={linkStyle}>
                <FlexBox gap={1} py={1}>
                  <Box height='18px' width='18px'>
                    <img
                      style={{ height: '100%' }}
                      src={
                        /^[a-zA-Z]{2}$/.test(countryCode)
                          ? `https://open-meteo.com/images/country-flags/${countryCode}.svg`
                          : 'https://upload.wikimedia.org/wikipedia/commons/thumb/4/4c/Ei-location.svg/2048px-Ei-location.svg.png'
                      }
                      alt={`country logo ${countryCode}`}
                    />
                  </Box>
                  <Typography noWrap sx={typographyStyle}>
                    <Box component='span' sx={fontNormalStyle}>
                      {name}
                    </Box>
                    <Box component='span' sx={fontLightStyle}>
                      {region}
                    </Box>
                    <Box
                      component='span'
                      sx={fontLightStyle}
                    >{`${lat}°N ${lon}°E`}</Box>
                  </Typography>
                </FlexBox>
              </Link>
            </Box>
            {suggestions.length !== 0 &&
            option['data-option-index'] !== suggestions.length - 1 ? (
              <Divider sx={{ color: 'lightgray' }} />
            ) : null}
          </Box>
        )
      }}
    />
  )
}

function InputAutocompleteField({ city, loading, suggestions, ...params }) {
  const isAlphanumeric = /^[a-zA-Z0-9\s]+$/.test(city)

  return (
    <TextField
      {...params}
      label='Search a city'
      InputProps={{
        ...params.InputProps,
        endAdornment: (
          <Fragment>
            {loading ? <CircularProgress color='inherit' size={20} /> : null}
            {params.InputProps.endAdornment}
          </Fragment>
        ),
      }}
      helperText={
        city &&
        (!isAlphanumeric
          ? 'Enter letters only'
          : city.length > 1 && suggestions.length === 0
          ? 'No matching options'
          : '')
      }
    />
  )
}

// const handleSearchEnter = async (e) => {
//   if (e.code === 'Enter') {
//     const response = await fetch(
//       `http://api.geonames.org/searchJSON?name_startsWith=${city}&orderby=population&sort=asc&featureClass=P&maxRows=1&username=tawish`
//     )
//     const json = await response.json()
//     const lat = json.geonames[0].lat
//     const lon = json.geonames[0].lng

//     const response2 = await fetch(
//       `https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${lon}&hourly=relativehumidity_2m&daily=weathercode,temperature_2m_max&timezone=auto`
//     )
//     const json2 = await response2.json()
//     console.log(json2)
//   }
// }
// // ;`https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${lon}&hourly=relativehumidity_2m&daily=weathercode,temperature_2m_max,temperature_2m_min,apparent_temperature_max,apparent_temperature_min,sunrise,sunset,uv_index_max,uv_index_clear_sky_max,precipitation_sum,rain_sum,showers_sum,snowfall_sum,precipitation_hours,precipitation_probability_max,windspeed_10m_max&timezone=auto`

// const handleSuggestionEnter = async (e, lat, lon) => {
//   if (e.code === 'Enter') {
//     fetchForecast(lat, lon)
//   }
// }

export default AutocompleteCity
