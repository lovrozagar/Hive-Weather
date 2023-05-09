import {
  Box,
  Link,
  TextField,
  Autocomplete,
  Typography,
  Divider,
  CircularProgress,
  useTheme,
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
import { makeStyles } from '@mui/styles'
import { Search } from '@mui/icons-material'

function AutocompleteCity() {
  const [city, setCity] = useState('')
  const [suggestions, setSuggestions] = useState([])
  const [loading, setLoading] = useState(false)
  const navigate = useNavigate()

  let debounceFetch = useRef(null)

  const emptySuggestions = () => setSuggestions([])

  const fetchSuggestions = useCallback(async () => {
    const autocompleteService =
      new window.google.maps.places.AutocompleteService()
    const options = {
      input: city,
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
    console.log(results)
    // HERE ERROR OF GETTING ONLY FIRST COUNTRY CODE
    const placeId = results[0].place_id
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

    const countryCode = details.address_components.find((component) =>
      component.types.includes('country')
    ).short_name
    const lat = details.geometry.location.lat()
    const lng = details.geometry.location.lng()

    setSuggestions(
      results.map((suggestion) => ({
        name: suggestion.structured_formatting.main_text,
        region: suggestion.structured_formatting.secondary_text,
        countryCode,
        lat: lat,
        lon: lng,
      })) || []
    )

    console.log(countryCode)

    // return results
  }, [city])

  const loadSuggestions = useCallback(() => {
    setLoading(true)

    if (debounceFetch.current) {
      debounceFetch.current.cancel()
      debounceFetch.current = null
    }

    debounceFetch.current = debounce(async () => {
      await fetchSuggestions()
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
