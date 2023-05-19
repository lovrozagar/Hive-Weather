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
  const [noCities, setNoCities] = useState(false)
  const [autocompleteRefresh, setAutocompleteRefresh] = useState(0)

  const fetchCitySuggestionsData = useFetchCitySuggestionsData()

  let debounceFetch = useRef(null)

  const loadSuggestions = useCallback(() => {
    if (debounceFetch.current) {
      debounceFetch.current.cancel()
      debounceFetch.current = null

      setNoCities(false)
    }

    debounceFetch.current = debounce(async () => {
      setLoading(true)

      const suggestions = await fetchCitySuggestionsData(city)

      setSuggestions(suggestions)
      setLoading(false)

      if (city.length > 0 && suggestions.length === 0) setNoCities(true)
    }, 300)

    debounceFetch.current()
  }, [city, fetchCitySuggestionsData])

  // mapping object to a string and extracting later as MUI wants an array of strings
  const suggestionAsString = () => {
    return suggestions.length > 0
      ? suggestions.map(
          (suggestion) =>
            `${suggestion.city}/${suggestion.country}/${suggestion.countryCode}/${suggestion.lat}/${suggestion.lng}`
        )
      : []
  }

  useEffect(() => {
    if (city && city.length > 1) loadSuggestions()
    else setSuggestions([])
  }, [city, loadSuggestions])

  const handleSearch = (e) => {
    const inputValue = e.target.value
    setCity(inputValue)

    if (inputValue === '') {
      setNoCities(false)
      setLoading(false)
      setAutocompleteRefresh((prev) => prev + 1)
      return
    }

    const isAlphanumeric = /^[a-zA-Z0-9\s]+$/.test(inputValue)
    if (inputValue !== '' && !isAlphanumeric) {
      setLoading(false)
      setNoCities(true)
      return
    }
  }

  const handleChange = (e, value) => {
    if (value) {
      const [city, country, countryCode, lat, lng] = value.split('/')
      const latStr = lat.toString().replace('.', '_')
      const lngStr = lng.toString().replace('.', '_')

      setAutocompleteRefresh((prevRefresh) => prevRefresh + 1)

      navigate(
        `/forecast/${city}/${country}/${countryCode}/${latStr}/${lngStr}`
      )
    }
  }

  const handleGoIconClick = async () => {
    // TIMEOUT FOR SUGGESTIONS TO ARRIVE
    await new Promise((resolve) => setTimeout(resolve, 200))

    if (suggestions.length) {
      const { city, country, countryCode, lat, lng } = suggestions[0]
      const latStr = lat.toString().replace('.', '_')
      const lngStr = lng.toString().replace('.', '_')

      setAutocompleteRefresh((prevRefresh) => prevRefresh + 1)

      navigate(
        `/forecast/${city}/${country}/${countryCode}/${latStr}/${lngStr}`
      )
    }
  }

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
        open={noCities}
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
        clearOnBlur
        disableListWrap
        disableClearable
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
        aria-label='go'
        onClick={handleGoIconClick}
      >
        <Directions />
      </IconButton>
    </Paper>
  )
}

export default AutocompleteCity
