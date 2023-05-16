import { Container } from '@mui/material'
import GridBox from '../../components/GridBox'

import CityTitle from '../../components/CityTitle'
import Saved from './Saved'
import Popular from './Popular'
import Steps from './Steps'
import HomeButtons from './HomeButtons'

import { useState } from 'react'
import useFetchCurrentWeatherData from '../../api/useFetchCurrentWeatherData'

function Home() {
  const [userCoordinates, setUserCoordinates] = useState(null)
  const [userPlace, setUserPlace] = useState(null)
  const weatherData = useFetchCurrentWeatherData(
    userCoordinates?.latitude,
    userCoordinates?.longitude
  )

  // useEffect(() => {
  //   navigator.geolocation.getCurrentPosition(async (position) => {
  //     setUserCoordinates(position?.coords)
  //     console.log(position.coords.latitude)
  //     console.log(position.coords.longitude)

  //     // Call the Google Maps Geocoding API to get the address based on the user's coordinates
  //     const response = await fetch(
  //       `https://maps.googleapis.com/maps/api/geocode/json?latlng=${position.coords.latitude},${position.coords.longitude}&key=AIzaSyAO1ey3FsygPJn0Xo-4eDhbhHQFMVmql5Y`
  //     )
  //     const data = await response.json()

  //     // Extract the city, country, and country code from the address components
  //     let city, country, countryCode
  //     data.results[0].address_components.forEach((component) => {
  //       if (component.types.includes('locality')) {
  //         city = component.long_name
  //       }
  //       if (component.types.includes('country')) {
  //         country = component.long_name
  //         countryCode = component.short_name
  //       }
  //     })

  //     setUserPlace({ city, country, countryCode })
  //   })
  // }, [])

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
    <Container sx={{ pt: { md: 5 }, pb: 10 }}>
      <GridBox type='1fr' sx={gridStyle} gap={3}>
        {userPlace !== null ? (
          <CityTitle
            isHome={true}
            city={userPlace.city}
            country={userPlace?.country}
            countryCode={userPlace?.countryCode}
            lat={userCoordinates.latitude}
            lng={userCoordinates.longitude}
            weather={weatherData}
          />
        ) : (
          <CityTitle
            isHome={true}
            city={'Location not found'}
            description='Please enable location service'
          />
        )}

        <GridBox gap={3} mb='auto'>
          <Saved />
          <Popular />
        </GridBox>
        <Steps />
        <HomeButtons />
      </GridBox>
    </Container>
  )
}

export default Home
