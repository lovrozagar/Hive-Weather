import { useMemo } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import GridBox from '../../components/GridBox'
import { Box, Container } from '@mui/material'
import useFetchForecastData from '../../api/useFetchForecastData'
import DayCard from './DayCard'
import Map from './Map'

function Forecast() {
  const { city, latitude, longitude } = useParams()
  const navigate = useNavigate()
  console.log(latitude, longitude)

  // TAKE PARAM COORDINATES, RETURN DOTS INSTEAD OF UNDERSCORES, DONE BECAUSE DOTS ARE NOT ALLOWED
  const lat = useMemo(() => parseFloat(latitude.replace('_', '.')), [latitude])
  const lng = useMemo(
    () => parseFloat(longitude.replace('_', '.')),
    [longitude]
  )

  const forecast = useFetchForecastData(lat, lng)

  const handleMoreDetailsClick = (dayIndex) =>
    navigate(
      `/hive-weather/hourly/${city}/${latitude}/${longitude}/${dayIndex}`
    )

  return (
    <Container>
      <GridBox type='1fr 1fr' sx={{ alignItems: 'start' }}>
        <GridBox type='repeat(auto-fit, minmax(225px, 1fr))' gap={2}>
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
        <Box sx={{ m: '0 auto' }}>
          <Map coordinates={{ lat, lng }} />
        </Box>
      </GridBox>
    </Container>
  )
}

export default Forecast
