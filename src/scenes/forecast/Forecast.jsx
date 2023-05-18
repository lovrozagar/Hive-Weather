import { Container } from '@mui/material'
import GridBox from '../../components/GridBox'
import CityTitle from '../../components/CityTitle'
import DayCard from './DayCard'
import CurrentCard from './CurrentCard'
import ThrowbackCard from './ThrowbackCard'
import Map from './Map'

import { useMemo } from 'react'
import { useParams } from 'react-router-dom'
import useFetchGoogleApiKey from '../../api/useFetchGoogleApiKey'
import useFetchForecastData from '../../api/useFetchForecastData'
import useFetchCurrentWeatherData from '../../api/useFetchThrowbackWeatherData'

function Forecast() {
  const { city, country, countryCode, latitude, longitude } = useParams()
  const googleKey = useFetchGoogleApiKey()

  // TAKE PARAM COORDINATES, RETURN DOTS INSTEAD OF UNDERSCORES, DONE BECAUSE DOTS ARE NOT ALLOWED
  const lat = useMemo(() => parseFloat(latitude.replace('_', '.')), [latitude])
  const lng = useMemo(
    () => parseFloat(longitude.replace('_', '.')),
    [longitude]
  )

  const [timezone, current, forecast] = useFetchForecastData(lat, lng)
  const [throwback, throwbackDate] = useFetchCurrentWeatherData(lat, lng)

  const getDayLink = (dayIndex) => {
    const timezoneUrlFormat = timezone.split('/').join('-')
    // RATHER THAN PASSING ONLY THE INDEX, MAKING THE DAY PART OF THE LINK MORE READABLE FOR THE USER AND BETTER SEO, GETTING ONLY INDEX BACK IN HOURLY SCENE
    const dayUrlFormat =
      dayIndex === 0 ? 'today' : dayIndex === 1 ? 'tomorrow' : `day-${dayIndex}`

    return `/hourly/${city}/${country}/${countryCode}/${timezoneUrlFormat}/${latitude}/${longitude}/${dayUrlFormat}`
  }

  const gridStyle = {
    alignItems: 'start',
    '@media (min-width: 600px)': {
      gridTemplateColumns: '1fr auto',
    },
  }
  return (
    <Container component='main'>
      <CityTitle
        city={city}
        country={country}
        countryCode={countryCode}
        lat={lat.toString()}
        lng={lng.toString()}
        sx={{ mb: 2 }}
      />
      <GridBox gap={3} sx={gridStyle}>
        <GridBox
          component='section'
          type='repeat(auto-fit, minmax(250px, 1fr))'
          gap={2}
        >
          {forecast
            ? forecast.time.map((date, index) => (
                <DayCard
                  key={index}
                  forecast={forecast}
                  date={date}
                  index={index}
                  link={getDayLink(index)}
                />
              ))
            : null}
        </GridBox>
        <GridBox component='aside' sx={{ m: '0 auto' }} gap={3}>
          {current ? (
            <CurrentCard component='article' city={city} current={current} />
          ) : null}
          {lat && lng && googleKey && (
            <Map coordinates={{ lat, lng }} googleKey={googleKey} />
          )}
          {current && throwback ? (
            <ThrowbackCard
              component='article'
              city={city}
              throwback={throwback}
              throwbackDate={throwbackDate}
              currentTime={current.time}
            />
          ) : null}
        </GridBox>
      </GridBox>
    </Container>
  )
}

export default Forecast
