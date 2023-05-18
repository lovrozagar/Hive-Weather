import { useTheme, Box, Container, Skeleton } from '@mui/material'
import GridBox from '../../components/GridBox'
import CityTitle from '../../components/CityTitle'
import HourCard from './HourCard'

import { useCallback, useContext, useEffect, useMemo, useState } from 'react'
import { useParams } from 'react-router-dom'
import { ModeContext } from '../../App'
import ReactApexChart from 'react-apexcharts'
import useFetchHourlyData from '../../api/useFetchHourlyData'

function Hourly() {
  const { mode } = useContext(ModeContext)
  const theme = useTheme().palette

  const { city, country, countryCode, timezone, latitude, longitude, day } =
    useParams()

  const lat = useMemo(() => parseFloat(latitude.replace('_', '.')), [latitude])
  const lng = useMemo(
    () => parseFloat(longitude.replace('_', '.')),
    [longitude]
  )
  const timezoneTzFormat = useMemo(
    () => timezone.split('-').join('/'),
    [timezone]
  )
  const dayIndex = useMemo(() => {
    if (day === 'today') return 0
    if (day === 'tomorrow') return 1
    else return day.split('-')[1]
  }, [day])

  const [currentTime, setCurrentTime] = useState(null)
  const [options, setOptions] = useState(null)

  const hours = useFetchHourlyData(lat, lng, dayIndex)

  const getCurrentTimezoneMilliseconds = useCallback(() => {
    try {
      const options = { timeZone: timezoneTzFormat }
      const datetime = new Date().toLocaleString('en-US', options)
      const milliseconds = new Date(datetime).getTime()

      return milliseconds
      //
    } catch (error) {
      // IF WRONG TIMEZONE, AVOID CRASH, RETURN CURRENT USER MILLISECONDS
      return Date.now()
    }
  }, [timezoneTzFormat])

  const chartOptions = useMemo(() => {
    if (!hours) return null
    return {
      chart: {
        type: 'area',
        foreColor: theme.tone.middle,
      },
      tooltip: {
        theme: mode,
      },
      annotations: {
        xaxis: [
          {
            x: currentTime,
            label: {
              text: 'Location Current Time',
              style: {
                color: theme.tone.light,
                background: theme.tone.dark,
              },
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
  }, [currentTime, hours, theme, mode])

  useEffect(() => {
    setCurrentTime(getCurrentTimezoneMilliseconds())
  }, [getCurrentTimezoneMilliseconds])

  useEffect(() => {
    if (hours && currentTime) {
      setOptions(chartOptions)
    }
  }, [hours, currentTime, chartOptions])

  return (
    <Container component='main' sx={{ pb: 10 }}>
      <CityTitle
        component='section'
        city={city}
        country={country}
        countryCode={countryCode}
        lat={lat.toString()}
        lng={lng.toString()}
        sx={{ mb: 2 }}
      />
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
      <GridBox component='section' gap={1}>
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
