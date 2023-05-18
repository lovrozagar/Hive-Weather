import {
  Air,
  Grain,
  DoubleArrow,
  Opacity as Droplet,
  CloudQueue as Cloud,
  Flare as UVIndex,
  AcUnit as SnowParticle,
  Visibility as VisibilityEye,
  Speed as Barometer,
  ExpandMore as ExpandMoreIcon,
} from '@mui/icons-material'
import {
  styled,
  Card,
  CardContent,
  CardMedia,
  Typography,
  Collapse,
  Divider,
  IconButton,
} from '@mui/material'
import FlexBox from '../../components/FlexBox'
import GridBox from '../../components/GridBox'
import ToolTip from '../../components/ToolTip'
import Tilt from 'react-parallax-tilt'
import PropTypes from 'prop-types'
import { useState } from 'react'

import getDescription from '../../utils/weather/getDescription'
import getHourFromFullTime from '../../utils/datetime/getHourFromFullTime'
import getWeatherLogo from '../../utils/weather/getWeatherLogo'
import getHourParagraphText from '../../utils/weather/getHourParagraphText'

HourCard.propTypes = {
  hours: PropTypes.object.isRequired,
  hour: PropTypes.string.isRequired,
  index: PropTypes.number.isRequired,
}

function HourCard({ hours, hour, index }) {
  const [expanded, setExpanded] = useState(false)
  const handleExpandClick = () => setExpanded((prevExpanded) => !prevExpanded)

  const {
    weathercode: { [index]: weatherCode },
    temperature_2m: { [index]: temperature },
    relativehumidity_2m: { [index]: humidity },
    precipitation_probability: { [index]: chanceOfRain },
    apparent_temperature: { [index]: feel },
    winddirection_10m: { [index]: windDirection },
    windspeed_10m: { [index]: windSpeed },
    visibility: { [index]: visibility },
    pressure_msl: { [index]: pressure },
    cloudcover: { [index]: cloudCover },
    uv_index: { [index]: uvIndex },
    snowfall: { [index]: snowfall },
    is_day: { [index]: isDay },
  } = hours

  const containerStyle = {
    display: { xs: 'block', sm: 'flex' },
    justifyItems: { xs: 'start', sm: 'none' },
  }
  const mainContentStyle = {
    display: { xs: 'flex', sm: 'grid' },
    alignItems: 'center',
    alignSelf: 'center',
    px: 0,
    pt: 0,
    pb: 1,
    '&:last-of-type': {
      paddingBottom: 0,
    },
  }
  const secondaryCardContentStyle = {
    alignSelf: 'center',
    pt: 0,
    pr: 0,
    pl: { xs: 1, sm: 2.5 },
    mb: { xs: 1.5, sm: 0 },
    '&:last-of-type': {
      paddingBottom: 0,
    },
  }
  const cardMediaStyle = {
    height: '50px',
    width: '50px',
    aspectRatio: '1/1',
  }
  const expandMoreStyle = {
    ml: 'auto',
    alignSelf: { xs: 'center', sm: 'end' },
    justifySelf: 'end',
  }

  return (
    <Tilt
      glareEnable={true}
      glareMaxOpacity={expanded ? 0 : 0.175}
      glareColor='lightgray'
      glarePosition='all'
      glareBorderRadius='8px'
      tiltEnable={true}
      tiltMaxAngleX={expanded ? 0 : 0.5}
      tiltMaxAngleY={expanded ? 0 : 0.5}
      style={{ width: '100%' }}
    >
      <Card sx={{ py: 1, px: 1.5 }}>
        <GridBox type='1fr auto' alignItems='center'>
          <FlexBox flexWrap='wrap' sx={containerStyle}>
            <CardContent sx={mainContentStyle}>
              <CardMedia
                component='img'
                image={getWeatherLogo(weatherCode, isDay)}
                alt='sun logo'
                sx={cardMediaStyle}
              />
              <Typography sx={{ pl: 0.75 }}>
                {getHourFromFullTime(hour)}
              </Typography>
            </CardContent>
            <CardContent sx={secondaryCardContentStyle}>
              <FlexBox flexWrap='wrap' gap={1} mb={2} pl={0.25}>
                <Typography>{`${Math.round(temperature)} °C`}</Typography>
                <Typography>|</Typography>
                <Typography>{`Feels like ${Math.round(feel)} °C`}</Typography>
                <Typography>|</Typography>
                <Typography>{getDescription(weatherCode)}</Typography>
              </FlexBox>
              <FlexBox gap={2} flexWrap='wrap'>
                <ToolTip title='chance of rain'>
                  <FlexBox gap={0.5}>
                    <Droplet />
                    <Typography>{`${chanceOfRain}%`}</Typography>
                  </FlexBox>
                </ToolTip>
                <ToolTip title='cloud coverage'>
                  <FlexBox gap={0.5}>
                    <Cloud />
                    <Typography>{`${cloudCover}%`}</Typography>
                  </FlexBox>
                </ToolTip>
                <ToolTip title='wind direction'>
                  <FlexBox gap={0.5}>
                    <DoubleArrow
                      sx={{ transform: `rotate(${-90 + windDirection}deg)` }}
                    />
                    <Typography>{`${windDirection}°`}</Typography>
                  </FlexBox>
                </ToolTip>
                <ToolTip title='wind speed'>
                  <FlexBox gap={0.5}>
                    <Air />
                    <Typography>{`${windSpeed} km/h`}</Typography>
                  </FlexBox>
                </ToolTip>
              </FlexBox>
            </CardContent>
          </FlexBox>
          <ExpandMore
            onClick={handleExpandClick}
            aria-expanded={expanded}
            aria-label='show more'
            sx={expandMoreStyle}
          >
            <ExpandMoreIcon />
          </ExpandMore>
        </GridBox>
        <Collapse in={expanded} timeout='auto' unmountOnExit>
          <Divider />
          <CardContent sx={{ py: 2, pr: 3, pl: 1 }}>
            <FlexBox gap={2} flexWrap='wrap'>
              <ToolTip title='visibility'>
                <FlexBox gap={0.5}>
                  <VisibilityEye />
                  <Typography>{`${visibility} m`}</Typography>
                </FlexBox>
              </ToolTip>
              <ToolTip title='pressure'>
                <FlexBox gap={0.5}>
                  <Barometer />
                  <Typography>{`${Math.round(pressure)} hPa`}</Typography>
                </FlexBox>
              </ToolTip>
              <ToolTip title='humidity'>
                <FlexBox gap={0.5}>
                  <Grain />
                  <Typography>{`${humidity} %`}</Typography>
                </FlexBox>
              </ToolTip>
              <ToolTip title='uv index'>
                <FlexBox gap={0.5}>
                  <UVIndex />
                  <Typography>{`${uvIndex}`}</Typography>
                </FlexBox>
              </ToolTip>
              <ToolTip title='snowfall'>
                <FlexBox gap={0.5}>
                  <SnowParticle />
                  <Typography>{`${snowfall} cm`}</Typography>
                </FlexBox>
              </ToolTip>
            </FlexBox>
            <Typography mt={1.5}>
              {getHourParagraphText({
                temperature,
                feel,
                windDirection,
                windSpeed,
                chanceOfRain,
                snowfall,
                visibility,
                cloudCover,
              })}
            </Typography>
          </CardContent>
        </Collapse>
      </Card>
    </Tilt>
  )
}

const ExpandMore = styled((props) => {
  const { ...other } = props
  return <IconButton {...other} />
})(({ expand }) => ({
  marginLeft: 'auto',
  transform: !expand ? 'rotate(0deg)' : 'rotate(180deg)',
}))

export default HourCard
