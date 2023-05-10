import { useCallback, useEffect, useMemo, useState } from 'react'
import { useParams } from 'react-router-dom'
import useFetchHourlyData from '../../api/useFetchHourlyData'
import { Box, Container, Skeleton } from '@mui/material'
import GridBox from '../../components/GridBox'
import moment from 'moment-timezone'
import ReactApexChart from 'react-apexcharts'
import HourCard from './HourCard'
import ThrowbackCard from '../forecast/ThrowbackCard'

function Hourly() {
  const { city, timezone, latitude, longitude, dayIndex } = useParams()

  const lat = useMemo(() => parseFloat(latitude.replace('_', '.')), [latitude])
  const lng = useMemo(
    () => parseFloat(longitude.replace('_', '.')),
    [longitude]
  )
  const [currentTime, setCurrentTime] = useState(null)
  const [options, setOptions] = useState(null)

  const hours = useFetchHourlyData(lat, lng, dayIndex)

  const MINUTE_TO_MILLISECOND_MULTIPLAYER = 60000
  const TWO_HOUR_MILLISECOND_OFFSET = 7_200_000

  const getCurrentTimezoneMilliseconds = useCallback(() => {
    const now = moment().tz(timezone.split('_').join('/'))
    const offset = now._offset * MINUTE_TO_MILLISECOND_MULTIPLAYER

    return Date.now() + offset - TWO_HOUR_MILLISECOND_OFFSET
  }, [timezone])

  const chartOptions = useMemo(() => {
    if (!hours) return null
    return {
      chart: {
        type: 'area',
      },
      annotations: {
        xaxis: [
          {
            x: currentTime,
            borderColor: '#000',
            label: {
              borderColor: '#000',
              style: {
                fontSize: '12px',
                color: '#fff',
                background: '#000',
              },
              text: 'Location Current Time',
            },
          },
        ],
      },
      series: [
        {
          name: 'My series',
          data: hours.temperature_2m,
        },
      ],
      xaxis: {
        labels: {
          datetimeUTC: false,
        },
        type: 'datetime',
        categories: hours.time || [],
      },
    }
  }, [currentTime, hours])

  useEffect(() => {
    setCurrentTime(getCurrentTimezoneMilliseconds())
  }, [getCurrentTimezoneMilliseconds])

  useEffect(() => {
    if (hours && currentTime) {
      setOptions(chartOptions)
    }
  }, [hours, currentTime, chartOptions])

  return (
    <Container>
      {options ? (
        <ReactApexChart
          options={options}
          series={options.series}
          type='area'
          height={350}
        />
      ) : (
        <Skeleton
          animation='wave'
          variant='rounded'
          width='100%'
          height={350}
          sx={{ mb: 2 }}
        />
      )}
      <GridBox gap={1}>
        {hours
          ? hours.time.map((hour, index) => {
              return (
                <Box key={index}>
                  {options ? (
                    <HourCard
                      key={hour}
                      hours={hours}
                      hour={hour}
                      index={index}
                    />
                  ) : (
                    <Skeleton
                      animation='wave'
                      variant='rounded'
                      width='100%'
                      height={100}
                    />
                  )}
                </Box>
              )
            })
          : null}
      </GridBox>
    </Container>
  )
}

export default Hourly
