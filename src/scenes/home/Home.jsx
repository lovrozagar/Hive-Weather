import { Box, Container } from '@mui/material'
import GridBox from '../../components/GridBox'

import CityTitle from '../../components/CityTitle'
import Saved from './Saved'
import Popular from './Popular'
import Steps from './Steps'
import HomeButtons from './HomeButtons'

import useFetchUserGeolocationData from '../../api/useFetchGeolocationData'
import useFetchCurrentWeatherData from '../../api/useFetchCurrentWeatherData'

function Home() {
  // const { userCoordinates, userPlace } = useFetchUserGeolocationData()
  const { userCoordinates, userPlace } = {
    userCoordinates: null,
    userPlace: null,
  }
  const weatherData = useFetchCurrentWeatherData(
    userCoordinates?.latitude,
    userCoordinates?.longitude
  )

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

  return (
    <Container component='main' sx={{ pt: { md: 5 }, pb: 10 }}>
      <GridBox type='1fr' sx={gridStyle} gap={3}>
        {userPlace !== null ? (
          <CityTitle
            component='section'
            isHome={true}
            city={userPlace.city}
            country={userPlace?.country}
            countryCode={userPlace?.countryCode}
            lat={userCoordinates?.latitude.toString()}
            lng={userCoordinates?.longitude.toString()}
            weather={weatherData}
          />
        ) : (
          <CityTitle
            component='section'
            isHome={true}
            city={'Location not found'}
            description='Please enable location service'
          />
        )}

        <GridBox gap={3} mb='auto'>
          <Saved component='section' />
          <Popular component='section' />
        </GridBox>
        <Box alignSelf='start'>
          <Box component='summary'>
            <Steps />
          </Box>
        </Box>
        <HomeButtons />
      </GridBox>
    </Container>
  )
}

export default Home
