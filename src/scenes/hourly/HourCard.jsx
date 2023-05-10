import {
  Waves,
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
import {} from '@mui/icons-material'

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
import ToolTip from '../../components/ToolTip'
import Tilt from 'react-parallax-tilt'
import PropTypes from 'prop-types'
import { useState } from 'react'

import getDescription from '../../utils/getDescription'
import getHourFromFullTime from '../../utils/getHourFromFullTime'
import getWeatherLogo from '../../utils/getWeatherLogo'
import getHourParagraphText from '../../utils/getHourParagraphText'

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

  const typographyStyle = {
    overflow: 'auto',
    textOverflow: 'ellipsis',
    wordBreak: 'keep-all',
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
      <Card>
        <FlexBox sx={{ alignItems: 'start' }}>
          <CardContent sx={{ pb: 1 }}>
            <Typography sx={{ pl: 0.75 }}>
              {getHourFromFullTime(hour)}
            </Typography>
            <CardMedia
              component='img'
              image={getWeatherLogo(weatherCode, isDay)}
              alt='sun logo'
              sx={{
                height: '50px',
                width: '50px',
                aspectRatio: '1/1',
              }}
            />
          </CardContent>
          <CardContent>
            <FlexBox gap={1} mb={2} pl={0.25}>
              <Typography>{`${Math.round(temperature)} °C`}</Typography>
              <Typography>|</Typography>
              <Typography>{`Feels like ${Math.round(feel)} °C`}</Typography>
              <Typography>|</Typography>
              <Typography>{getDescription(weatherCode)}</Typography>
            </FlexBox>
            <FlexBox gap={2}>
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
                  <Waves />
                  <Typography>{`${windSpeed} km/h`}</Typography>
                </FlexBox>
              </ToolTip>
            </FlexBox>
          </CardContent>
          <ExpandMore
            expand={expanded}
            onClick={handleExpandClick}
            aria-expanded={expanded}
            aria-label='show more'
            sx={{ alignSelf: 'end', mr: 0.5, mb: 0.5 }}
          >
            <ExpandMoreIcon />
          </ExpandMore>
        </FlexBox>
        <Collapse in={expanded} timeout='auto' unmountOnExit>
          <Divider sx={{ mx: 1 }} />
          <CardContent sx={{ py: 2, px: 3 }}>
            <FlexBox gap={2}>
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
