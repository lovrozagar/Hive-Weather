import { Card, CardContent, CardMedia, Typography, Button } from '@mui/material'
import FlexBox from '../../components/FlexBox'
import GridBox from '../../components/GridBox'

import { useNavigate } from 'react-router-dom'
import PropTypes from 'prop-types'
import Tilt from 'react-parallax-tilt'
import getDayOfWeek from '../../utils/getDayOfWeek'
import getDayWeatherLogo from '../../utils/getDayWeatherLogo'
import getMeterGradient from '../../utils/getMeterGradient'

DayCard.propTypes = {
  forecast: PropTypes.object.isRequired,
  date: PropTypes.string.isRequired,
  index: PropTypes.number.isRequired,
  onClick: PropTypes.func.isRequired,
}

function DayCard({ forecast, date, index, onClick }) {
  const {
    weathercode,
    temperature_2m_min: minTemp,
    temperature_2m_max: maxTemp,
  } = forecast

  const dd_mm_yyyy = date.split('-').reverse().join('.') + '.'

  return (
    <Tilt
      glareEnable
      glareMaxOpacity={0.175}
      glareColor='lightgray'
      glarePosition='all'
      glareBorderRadius='8px'
      tiltEnable={true}
      tiltMaxAngleX={3}
      tiltMaxAngleY={3}
      style={{ width: '100%' }}
    >
      <Card sx={{ width: '100%' }}>
        <CardContent sx={{ pb: 0 }}>
          <FlexBox type='between'>
            <Button
              // variant='contained'
              size='large'
              onClick={() => onClick(index)}
            >
              See Hourly
            </Button>
            <Typography color='gray'>{dd_mm_yyyy}</Typography>
          </FlexBox>
        </CardContent>
        <CardMedia
          component='img'
          image={getDayWeatherLogo(weathercode[index])}
          alt='sun logo'
          sx={{
            height: '100px',
            width: '100px',
            aspectRatio: '1/1',
            m: '0 auto',
          }}
        />
        <CardContent sx={{ pt: 0 }}>
          <Typography textAlign='center'>
            {getDayOfWeek(date, index)}
          </Typography>
          <FlexBox type='between'>
            <Typography>{`${Math.round(minTemp[index])}°C`}</Typography>
            <Typography>{`${Math.round(maxTemp[index])}°C`}</Typography>
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
