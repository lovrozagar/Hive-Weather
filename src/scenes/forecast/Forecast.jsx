import { useEffect, useMemo } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import GridBox from '../../components/GridBox'
import { Box, Card, Container } from '@mui/material'
import useFetchForecastData from '../../api/useFetchForecastData'
import DayCard from './DayCard'
import Map from './Map'
import CityTitle from '../../components/CityTitle'
import CurrentCard from './CurrentCard'
import ThrowbackCard from './ThrowbackCard'
import useFetchCurrentWeatherData from '../../api/useFetchThrowbackWeatherData'

function Forecast() {
  const { city, country, countryCode, latitude, longitude } = useParams()
  const navigate = useNavigate()
  console.log(latitude, longitude)

  // TAKE PARAM COORDINATES, RETURN DOTS INSTEAD OF UNDERSCORES, DONE BECAUSE DOTS ARE NOT ALLOWED
  const lat = useMemo(() => parseFloat(latitude.replace('_', '.')), [latitude])
  const lng = useMemo(
    () => parseFloat(longitude.replace('_', '.')),
    [longitude]
  )

  const [timezone, current, forecast] = useFetchForecastData(lat, lng)
  const [throwback, throwbackDate] = useFetchCurrentWeatherData(lat, lng)

  const handleMoreDetailsClick = (dayIndex) =>
    navigate(
      `/hive-weather/hourly/${city}/${timezone
        .split('/')
        .join('_')}/${latitude}/${longitude}/${dayIndex}`
    )

  return (
    <Container>
      <CityTitle
        city={city}
        country={country}
        countryCode={countryCode}
        lat={lat}
        lng={lng}
        sx={{ mb: 2 }}
      />
      <GridBox type='1fr auto' gap={3} sx={{ alignItems: 'start' }}>
        <GridBox type='repeat(auto-fit, minmax(250px, 1fr))' gap={2}>
          {forecast
            ? forecast.time.map((date, index) => (
                <DayCard
                  key={index}
                  forecast={forecast}
                  date={date}
                  index={index}
                  onClick={handleMoreDetailsClick}
                />
              ))
            : null}
        </GridBox>
        <GridBox sx={{ m: '0 auto' }} gap={3}>
          {current ? <CurrentCard city={city} current={current} /> : null}
          <Map coordinates={{ lat, lng }} />
          {current && throwback ? (
            <ThrowbackCard
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
