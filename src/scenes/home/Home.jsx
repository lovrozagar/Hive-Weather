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

  const [userLocation, setUserLocation] = useState(null)
  const weatherData = useFetchCurrentWeatherData(
    userLocation?.coords?.latitude,
    userLocation?.coords?.longitude
  )

  useEffect(() => {
    navigator.geolocation.getCurrentPosition((position) => {
      setUserLocation(position)
      console.log(position.coords.latitude)
      console.log(position.coords.longitude)
    })
  }, [])

  useEffect(() => {
    console.log(weatherData)
  }, [weatherData])

  return (
    <Container sx={{}}>
      <GridBox type='1fr' sx={gridStyle} gap={3}>
        <CityTitle
          isHome='true'
          city={'Location not found'}
          description='Please enable location service'
        />
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
