import {
  useTheme,
  Card,
  CardContent,
  CardMedia,
  Typography,
  Button,
} from '@mui/material'
import { WbTwilightOutlined } from '@mui/icons-material'
import FlexBox from '../../components/FlexBox'
import GridBox from '../../components/GridBox'
import ToolTip from '../../components/ToolTip'

import { Link } from 'react-router-dom'
import PropTypes from 'prop-types'
import Tilt from 'react-parallax-tilt'
import getDayOfWeek from '../../utils/datetime/getDayOfWeek'
import getWeatherLogo from '../../utils/weather/getWeatherLogo'
import getMeterGradient from '../../utils/weather/getMeterGradient'
import {
  yyyymmdd_to_ddmmyyyy,
  hourMinutes_yyyymmdd,
  getDayTime,
} from '../../utils/datetime/dateTimeFormats'

DayCard.propTypes = {
  forecast: PropTypes.object.isRequired,
  date: PropTypes.string.isRequired,
  index: PropTypes.number.isRequired,
  link: PropTypes.string.isRequired,
}

function DayCard({ forecast, date, index, link }) {
  const {
    weathercode,
    temperature_2m_min: minTemp,
    temperature_2m_max: maxTemp,
    sunrise: { [index]: sunrise },
    sunset: { [index]: sunset },
  } = forecast

  const formattedDate = yyyymmdd_to_ddmmyyyy(date)
  const sunriseTime = hourMinutes_yyyymmdd(sunrise)
  const sunsetTime = hourMinutes_yyyymmdd(sunset)
  const dayTime = getDayTime(sunriseTime, sunsetTime)

  const theme = useTheme().palette

  const cardMediaStyling = {
    height: '100px',
    width: '100px',
    aspectRatio: '1/1',
    m: '0 auto',
  }

  return (
    <Tilt
      glareEnable
      glareMaxOpacity={0.05}
      glareColor={theme.tone.light}
      glarePosition='top'
      glareBorderRadius='8px'
      tiltEnable={true}
      tiltMaxAngleX={1}
      tiltMaxAngleY={1}
      style={{ width: '100%' }}
    >
      <Card sx={{ width: '100%' }}>
        <CardContent sx={{ pb: 0 }}>
          <FlexBox type='between'>
            <GridBox justifyItems='start'>
              <Typography variant='h5' fontWeight='500' textAlign='center'>
                {getDayOfWeek(date, index)}
              </Typography>
              <Typography color='gray'>{formattedDate}</Typography>
            </GridBox>
            <FlexBox type='center'>
              <Link to={`${link}`} style={{ textDecoration: 'none' }}>
                <Button variant='outlined' color='tone' size='large'>
                  See Hourly
                </Button>
              </Link>
            </FlexBox>
          </FlexBox>
        </CardContent>
        <CardMedia
          component='img'
          image={getWeatherLogo(weathercode[index])}
          alt='sun logo'
          sx={cardMediaStyling}
        />
        <CardContent sx={{ px: 3, pt: 0 }}>
          <ToolTip title={`day time ${dayTime}`}>
            <FlexBox type='center' gap={3}>
              <GridBox justifyItems='center'>
                <WbTwilightOutlined sx={{ color: 'orange.main' }} />
                {sunriseTime}
              </GridBox>
              <GridBox justifyItems='center'>
                <WbTwilightOutlined
                  sx={{ color: 'primary.main', transform: 'rotate(180deg)' }}
                />
                {sunsetTime}
              </GridBox>
            </FlexBox>
          </ToolTip>
          <FlexBox type='between' mx={0.5} mb={1}>
            <Typography>{`${Math.round(minTemp[index])} °C`}</Typography>
            <Typography>{`${Math.round(maxTemp[index])} °C`}</Typography>
          </FlexBox>
          <GridBox
            className={getMeterGradient(minTemp[index], maxTemp[index])}
            flex={1}
            height={7}
            borderRadius={10}
          ></GridBox>
        </CardContent>
      </Card>
    </Tilt>
  )
}

export default DayCard
