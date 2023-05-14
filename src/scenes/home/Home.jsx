import GridBox from '../../components/GridBox'
import FlexBox from '../../components/FlexBox'
import Saved from './Saved'
import Popular from './Popular'
import {
  Container,
  Stepper,
  Step,
  StepLabel,
  Typography,
  StepConnector,
  Button,
} from '@mui/material'
import {
  Search,
  CloudOutlined,
  QueryBuilder,
  FavoriteBorder,
  CalendarTodayOutlined,
  GitHub,
  DescriptionOutlined,
} from '@mui/icons-material'

import { styled } from '@mui/styles'
import CityTitle from '../../components/CityTitle'
import { useEffect, useState } from 'react'
import useFetchCurrentWeatherData from '../../api/useFetchCurrentWeatherData'

const steps = [
  {
    label:
      'Search for a location: Use the autocomplete feature to quickly find the weather information for your desired city or town.',
    icon: <Search />,
  },
  {
    label:
      'View current weather: See the temperature, humidity, wind speed, and other important weather data for your selected location.',
    icon: <CloudOutlined />,
  },
  {
    label:
      'Check weekly forecast: Look at the weekly forecast to plan ahead for the upcoming days and know what to expect in terms of weather conditions.',
    icon: <CalendarTodayOutlined />,
  },
  {
    label:
      'Check hourly forecast: For more detailed planning, check out the hourly forecast to see how the weather is expected to change throughout the day.',
    icon: <QueryBuilder />,
  },
  {
    label:
      'Save cities: Save your frequently visited cities for easy access to their weather data.',
    icon: <FavoriteBorder />,
  },
]

function Home() {
  const gridStyle = {
    '& > :nth-of-type(1)': {
      gridColumn: '1/2',
    },
    '& > :nth-of-type(4)': {
      gridColumn: '1/2',
    },
    '@media (min-width: 800px)': {
      '&': {
        gridTemplateColumns: '1fr 1fr',
      },
      '& > :nth-of-type(1)': {
        gridColumn: '1/3',
      },
      '& > :nth-of-type(4)': {
        gridColumn: '1/3',
      },
    },
  }

  const [userCoordinates, setUserCoordinates] = useState(null)
  const [userPlace, setUserPlace] = useState(null)
  const weatherData = useFetchCurrentWeatherData(
    userCoordinates?.latitude,
    userCoordinates?.longitude
  )

  useEffect(() => {
    navigator.geolocation.getCurrentPosition(async (position) => {
      setUserCoordinates(position?.coords)
      console.log(position.coords.latitude)
      console.log(position.coords.longitude)

      // Call the Google Maps Geocoding API to get the address based on the user's coordinates
      const response = await fetch(
        `https://maps.googleapis.com/maps/api/geocode/json?latlng=${position.coords.latitude},${position.coords.longitude}&key=AIzaSyAO1ey3FsygPJn0Xo-4eDhbhHQFMVmql5Y`
      )
      const data = await response.json()

      // Extract the city, country, and country code from the address components
      let city, country, countryCode
      data.results[0].address_components.forEach((component) => {
        if (component.types.includes('locality')) {
          city = component.long_name
        }
        if (component.types.includes('country')) {
          country = component.long_name
          countryCode = component.short_name
        }
      })

      setUserPlace({ city, country, countryCode })
    })
  }, [])

  return (
    <Container sx={{ pt: { md: 5 }, pb: 10 }}>
      <GridBox type='1fr' sx={gridStyle} gap={3}>
        {userPlace !== null ? (
          <CityTitle
            isHome='true'
            city={userPlace.city}
            country={userPlace?.country}
            countryCode={userPlace?.countryCode}
            lat={userCoordinates.latitude}
            lng={userCoordinates.longitude}
            weather={weatherData}
          />
        ) : (
          <CityTitle
            isHome='true'
            city={'Location not found'}
            description='Please enable location service'
          />
        )}

        <GridBox gap={3} mb='auto'>
          <Saved />
          <Popular />
        </GridBox>
        <Stepper
          activeStep={steps.length}
          orientation='vertical'
          connector={<StyledStepConnector />}
          sx={{ mb: 'auto', px: 3, pt: 2 }}
        >
          {steps.map(({ label, icon }) => (
            <Step key={label}>
              <StepLabel icon={icon}>
                <Typography sx={{ pl: 1 }}>{label}</Typography>
              </StepLabel>
            </Step>
          ))}
        </Stepper>
        <HomeButtons sx={{ justifySelf: 'center' }} />
      </GridBox>
    </Container>
  )
}

function HomeButtons({ sx }) {
  const containerStyle = {
    ...sx,
    m: '1rem auto 0 auto',
  }

  return (
    <GridBox sx={containerStyle} type='1fr 1fr' gap={3}>
      <Button
        size='large'
        variant='text'
        href='https://github.com/lovrozagar/Hive-Weather'
        target='_blank'
      >
        <FlexBox gap={1}>
          <GitHub />
          <Typography>Github</Typography>
        </FlexBox>
      </Button>
      <Button size='large' variant='outlined' color='primary'>
        <FlexBox gap={1}>
          <DescriptionOutlined /> About
        </FlexBox>
      </Button>
    </GridBox>
  )
}

const StyledStepConnector = styled(StepConnector)({
  '& .MuiStepConnector-line': {
    minHeight: 40,
  },
})

export default Home
