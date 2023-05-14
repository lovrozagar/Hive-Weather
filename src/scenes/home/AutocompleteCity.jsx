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
import { Clear, Place, Search } from '@mui/icons-material'
import useFetchCitySuggestionsData from '../../api/useFetchCitySuggestionsData'
import CountryIcon from '../../components/CountryIcon'
import { Paper, IconButton, InputBase, Tooltip } from '@mui/material'
import { Menu, Directions } from '@mui/icons-material'
import { makeStyles } from '@mui/styles'

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
            `${suggestion.name}/${suggestion.region}/${suggestion.countryCode}/${suggestion.lat}/${suggestion.lon}`
        )
      : []
  }

  const handleSearch = (e) => setCity(e.target.value)

  const handleChange = (e, value) => {
    if (value) {
      const [name, country, countryCode, lat, lon] = value.split('/')
      const latStr = lat.toString().replace('.', '_')
      const lonStr = lon.toString().replace('.', '_')

      navigate(
        `/hive-weather/forecast/${name}/${country}/${countryCode}/${latStr}/${lonStr}`
      )
    }
  }

  const isAlphanumeric = /^[a-zA-Z0-9\s]+$/.test(city)

  const useStyles = makeStyles((theme) => ({
    paper: {
      minWidth: 200,
    },
  }))

  return (
    <Paper
      component='form'
      sx={{
        p: '2px 4px',
        display: 'flex',
        alignItems: 'center',
        overflowX: 'hidden',
      }}
    >
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
        <IconButton>
          <Search />
        </IconButton>
      </Tooltip>
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
        // disableClearable
        PaperComponent={(props) => (
          <Paper
            {...props}
            sx={{
              position: 'relative',
              left: { xs: -110, sm: 0 },
              width: { xs: 600, sm: 'auto' },
            }}
          />
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
          const [name, region, countryCode, lat, lon] = option.key.split('/')
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
                      <Box component='span' sx={fontNormalStyle}>
                        {name}
                      </Box>
                      <Box component='span' sx={fontLightStyle}>
                        {region !== 'no-country' ? region : null}
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
      {/* <IconButton type='button' sx={{ p: '10px' }} aria-label='clear'>
        <Clear />
      </IconButton> */}
      <Divider sx={{ height: 28, m: 0.5 }} orientation='vertical' />
      <IconButton
        type='button'
        color='primary'
        sx={{ p: '10px' }}
        aria-label='clear'
      >
        <Directions />
      </IconButton>
    </Paper>
  )
}

function InputAutocompleteField({ city, loading, suggestions, ...params }) {
  return (
    <TextField
      {...params}
      color='primary'
      size='small'
      placeholder='Search a city'
      sx={{
        '& .MuiOutlinedInput-root': {
          '& fieldset': {
            border: 'none',
          },
        },
      }}
      InputProps={{
        ...params.InputProps,
        endAdornment: (
          <Fragment>
            {loading ? <CircularProgress color='inherit' size={20} /> : null}
            {params.InputProps.endAdornment}
          </Fragment>
        ),
      }}
    />
  )
}

export default AutocompleteCity
