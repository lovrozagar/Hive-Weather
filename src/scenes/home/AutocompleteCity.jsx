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

import { useState, useEffect, useCallback, useRef, Fragment } from 'react'
import debounce from 'lodash.debounce'
import uniqid from 'uniqid'
import { useNavigate } from 'react-router-dom'
import { Search } from '@mui/icons-material'
import useFetchCitySuggestionsData from '../../api/useFetchCitySuggestionsData'

function AutocompleteCity() {
  const navigate = useNavigate()
  const [city, setCity] = useState('')
  const [suggestions, setSuggestions] = useState([])
  const [loading, setLoading] = useState(false)
  const fetchCitySuggestionsData = useFetchCitySuggestionsData()

  let debounceFetch = useRef(null)

  const emptySuggestions = useCallback(() => setSuggestions([]), [])

  const loadSuggestions = useCallback(() => {
    setLoading(true)

    if (debounceFetch.current) {
      debounceFetch.current.cancel()
      debounceFetch.current = null
    }

    debounceFetch.current = debounce(async () => {
      const suggestions = await fetchCitySuggestionsData(city)
      setSuggestions(suggestions)
      setLoading(false)
    }, 200)

    debounceFetch.current()
  }, [city, fetchCitySuggestionsData])

  useEffect(() => {
    if (city && city.length > 0) {
      loadSuggestions()
    } else {
      emptySuggestions()
    }
  }, [city, loadSuggestions, emptySuggestions])

  const linkStyle = {
    '&&': {
      cursor: 'pointer',
      textDecoration: 'none',
      color: 'inherit',
      // color: 'lightgray',
    },
  }
  const typographyStyle = {
    overflow: 'hidden',
    textOverflow: 'ellipsis',
    wordBreak: 'keep-all',
  }
  const fontNormalStyle = {
    mr: 1,
    // color: 'black',
  }
  const fontLightStyle = {
    mr: 1,
    // color: 'grey',
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
      selectOnFocus
      color='navbar'
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
      color='grey'
      size='small'
      placeholder='Search a city'
      InputProps={{
        ...params.InputProps,
        startAdornment: (
          <Fragment>
            {<Search color='inherit' size={20} />}
            {params.InputProps.startAdornment}
          </Fragment>
        ),
        endAdornment: (
          <Fragment>
            {loading ? <CircularProgress color='inherit' size={20} /> : null}
            {params.InputProps.endAdornment}
          </Fragment>
        ),
      }}
      // helperText={
      //   city &&
      //   (!isAlphanumeric
      //     ? 'Enter letters only'
      //     : city.length > 1 && suggestions.length === 0
      //     ? 'No matching options'
      //     : '')
      // }
    />
  )
}

export default AutocompleteCity
