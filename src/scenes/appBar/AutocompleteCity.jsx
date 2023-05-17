import {
  Box,
  Link,
  Autocomplete,
  Typography,
  Divider,
  Paper,
  IconButton,
  Tooltip,
} from '@mui/material'
import { Directions, Search } from '@mui/icons-material'
import FlexBox from '../../components/FlexBox'
import CountryIcon from '../../components/CountryIcon'
import InputAutocompleteField from './InputAutocompleteField'

import { useState, useEffect, useCallback, useRef } from 'react'
import { useNavigate } from 'react-router-dom'
import debounce from 'lodash.debounce'
import uniqid from 'uniqid'
import useFetchCitySuggestionsData from '../../api/useFetchCitySuggestionsData'

function AutocompleteCity() {
  const navigate = useNavigate()

  const [city, setCity] = useState('')
  const [suggestions, setSuggestions] = useState([])
  const [loading, setLoading] = useState(false)
  const [autocompleteRefresh, setAutocompleteRefresh] = useState(0)

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
    }, 400)

    debounceFetch.current()
  }, [city, fetchCitySuggestionsData])

  useEffect(() => {
    if (city && city.length > 0) {
      loadSuggestions()
    } else {
      emptySuggestions()
    }
  }, [city, loadSuggestions, emptySuggestions])

  // mapping object to a string and extracting later as MUI wants an array of strings
  const suggestionAsString = () => {
    return suggestions.length > 0
      ? suggestions.map(
          (suggestion) =>
            `${suggestion.city}/${suggestion.country}/${suggestion.countryCode}/${suggestion.lat}/${suggestion.lng}`
        )
      : []
  }

  const handleSearch = (e) => setCity(e.target.value)

  const handleChange = (e, value) => {
    if (value) {
      const [city, country, countryCode, lat, lng] = value.split('/')
      const latStr = lat.toString().replace('.', '_')
      const lngStr = lng.toString().replace('.', '_')

      setAutocompleteRefresh((prevRefresh) => prevRefresh + 1)

      navigate(
        `/hive-weather/forecast/${city}/${country}/${countryCode}/${latStr}/${lngStr}`
      )
    }
  }

  const handleGoIconClick = async () => {
    // TIMEOUT FOR SUGGESTIONS TO ARRIVE
    await new Promise((resolve) => setTimeout(resolve, 200))

    console.log(suggestions)
    if (suggestions.length) {
      const { city, country, countryCode, lat, lng } = suggestions[0]
      const latStr = lat.toString().replace('.', '_')
      const lngStr = lng.toString().replace('.', '_')

      setAutocompleteRefresh((prevRefresh) => prevRefresh + 1)

      navigate(
        `/hive-weather/forecast/${city}/${country}/${countryCode}/${latStr}/${lngStr}`
      )
    }
  }

  const isAlphanumeric = /^[a-zA-Z0-9\s]+$/.test(city)

  const containerPaperStyle = {
    p: '2px 4px',
    display: 'flex',
    alignItems: 'center',
    overflowX: 'hidden',
  }
  const autocompletePaperStyle = {
    position: 'relative',
    left: { xs: -110, sm: 0 },
    width: { xs: 600, sm: 'auto' },
  }
  const linkStyle = {
    '&&': {
      cursor: 'pointer',
      textDecoration: 'none',
      color: 'inherit',
    },
  }
  const typographyStyle = {
    overflow: 'hidden',
    textOverflow: 'ellipsis',
    wordBreak: 'keep-all',
  }
  const fontLightStyle = {
    mr: 1,
    fontWeight: '400',
    color: 'tone.lightLow',
  }

  return (
    <Paper component='form' sx={containerPaperStyle}>
      <Tooltip
        title='No cities found'
        open={Boolean(
          (!loading && city?.length > 1 && suggestions?.length === 0) ||
            (!loading && city?.length > 0 && !isAlphanumeric)
        )}
        enterDelay={500}
        arrow
        disableFocusListener
        disableHoverListener
        disableInteractive
        disableTouchListener
      >
        <IconButton sx={{ pointerEvents: 'none' }}>
          <Search />
        </IconButton>
      </Tooltip>
      <Autocomplete
        key={autocompleteRefresh}
        selectOnFocus
        clearOnEscape
        disableListWrap
        handleHomeEndKeys
        color='navbar'
        loading={loading}
        freeSolo={true}
        onChange={handleChange}
        onInputChange={handleSearch}
        options={suggestionAsString()}
        getOptionLabel={(option) => option}
        PaperComponent={(props) => (
          <Paper {...props} sx={autocompletePaperStyle} />
        )}
        renderInput={(params) => (
          <InputAutocompleteField
            {...params}
            city={city}
            loading={loading}
            suggestions={suggestions}
          />
        )}
        sx={{ flex: 1 }}
        renderOption={(option) => {
          const [city, country, countryCode, lat, lng] = option.key.split('/')
          return (
            <Box key={uniqid()}>
              <Box component='li' {...option}>
                <Link sx={linkStyle}>
                  <FlexBox gap={1} py={1}>
                    <CountryIcon
                      height={18}
                      width={18}
                      countryCode={countryCode}
                    />
                    <Typography noWrap sx={typographyStyle}>
                      <Box component='span' sx={{ mr: 1 }}>
                        {city}
                      </Box>
                      <Box component='span' sx={fontLightStyle}>
                        {country !== 'no-country' ? country : null}
                      </Box>
                      <Box
                        component='span'
                        sx={fontLightStyle}
                      >{`${lat}°N ${lng}°E`}</Box>
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
      <Divider sx={{ height: 28, m: 0.5 }} orientation='vertical' />
      <IconButton
        type='button'
        color='primary'
        sx={{ p: '10px' }}
        aria-label='clear'
        onClick={handleGoIconClick}
      >
        <Directions />
      </IconButton>
    </Paper>
  )
}

export default AutocompleteCity
