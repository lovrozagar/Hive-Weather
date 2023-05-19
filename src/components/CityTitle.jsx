import {
  Card,
  CardHeader,
  CardContent,
  CardActions,
  Typography,
  Button,
} from '@mui/material'
import {
  LocationOffOutlined,
  Thermostat,
  Air,
  DoubleArrow,
  Brightness5Outlined as Day,
  Brightness4Outlined as Night,
} from '@mui/icons-material'
import FlexBox from './FlexBox'
import GridBox from './GridBox'
import CountryIcon from './CountryIcon'
import LikeSaveButton from './LikeSaveButton'
import CopyLinkButton from './CopyLinkButton'
import ToolTip from './ToolTip'

import { Link } from 'react-router-dom'
import PropTypes from 'prop-types'
import getDescription from '../utils/weather/getDescription'

CityTitle.propTypes = {
  city: PropTypes.string.isRequired,
  country: PropTypes.string,
  countryCode: PropTypes.string,
  lat: PropTypes.string,
  lng: PropTypes.string,
  sx: PropTypes.object,
  isHome: PropTypes.bool,
  description: PropTypes.string,
  weather: PropTypes.object,
  component: PropTypes.string,
}

function CityTitle({
  city,
  country,
  countryCode,
  lat,
  lng,
  sx,
  description,
  weather,
  isHome = false,
  component = 'section',
  ...props
}) {
  const latStr = lat?.toString().replace('.', '_')
  const lonStr = lng?.toString().replace('.', '_')

  const cardStyle = {
    pl: 1,
    color: 'tone.light',
    ...sx,
  }
  const containerStyle = {
    gridTemplateColumns: { xs: '1fr', sm: '1fr auto' },
    '& > :nth-of-type(1)': {
      order: 1,
    },
    '& > :nth-of-type(2)': {
      order: 3,
    },
    '& > :nth-of-type(3)': {
      order: 2,
    },
    '@media (min-width: 600px)': {
      '& > :nth-of-type(1)': {
        order: 1,
      },
      '& > :nth-of-type(2)': {
        order: 2,
      },
      '& > :nth-of-type(3)': {
        order: 3,
      },
    },
  }
  const cardActionsStyle = {
    pr: 3,
    gridRow: { md: '1/3' },
    gridColumn: { md: '2/3' },
    pt: 0,
    pb: { xs: 2, sm: 0 },
  }
  const buttonStyle = {
    width: 1,
    mx: 'auto',
  }
  const cardContentStyle = {
    pt: 0,
    pl: 2,
    '&:last-child': {
      pb: { xs: 1, sm: 2, md: 2, lg: 2 },
    },
  }

  return (
    <Card {...props} sx={cardStyle}>
      <GridBox sx={containerStyle} component={component}>
        <CardHeader
          avatar={
            countryCode ? (
              <CountryIcon
                height={28}
                width={28}
                type='title'
                countryCode={
                  countryCode !== 'no-country-code' ? countryCode : null
                }
              />
            ) : (
              <LocationOffOutlined
                sx={{ color: 'tone.lightMedium', fontSize: 28 }}
              />
            )
          }
          title={
            <Typography color='primary' variant='h5' fontWeight='500'>
              {country && country !== 'no-country'
                ? `${city}, ${country}`
                : `${city}`}
            </Typography>
          }
          subheader={
            <Typography
              variant='h6'
              fontWeight='400'
              sx={{ color: 'tone.lightLow' }}
            >
              {description || `${lat}°N ${lng}°E`}
            </Typography>
          }
        />
        <CardActions sx={cardActionsStyle}>
          {isHome ? (
            <>
              {weather ? (
                <Button
                  component={Link}
                  to={`/forecast/${city}/${country}/${countryCode}/${latStr}/${lonStr}`}
                  target='_blank'
                  variant='outlined'
                  sx={buttonStyle}
                >
                  See more
                </Button>
              ) : (
                <Button
                  variant='outlined'
                  href={
                    'https://www.google.com/search?q=How+to+turn+on+browser+location'
                  }
                  target='_blank'
                  rel='noopener noreferrer'
                  sx={buttonStyle}
                >
                  Location help
                </Button>
              )}
            </>
          ) : (
            <FlexBox>
              <LikeSaveButton
                city={city}
                country={country}
                countryCode={countryCode}
                lat={lat}
                lng={lng}
              />
              <CopyLinkButton />
            </FlexBox>
          )}
        </CardActions>
        {weather ? (
          <CardContent sx={cardContentStyle}>
            <FlexBox gap={2} flexWrap='wrap'>
              <ToolTip title='temperature'>
                <Typography>{`${getDescription(
                  weather.weathercode
                )}`}</Typography>
              </ToolTip>
              <FlexBox>
                <ToolTip title='temperature'>
                  <FlexBox gap={0.5}>
                    <Thermostat />
                    <Typography>{`${weather.temperature} °C`}</Typography>
                  </FlexBox>
                </ToolTip>
              </FlexBox>
              <FlexBox>
                <ToolTip title='wind direction'>
                  <FlexBox gap={0.5}>
                    <DoubleArrow
                      sx={{
                        transform: `rotate(${-90 + weather.winddirection}deg)`,
                      }}
                    />
                    <Typography>{`${weather.winddirection} °`}</Typography>
                  </FlexBox>
                </ToolTip>
              </FlexBox>
              <FlexBox>
                <ToolTip title='wind speed'>
                  <FlexBox gap={0.5}>
                    <Air />
                    <Typography>{`${weather.windspeed} km/h`}</Typography>
                  </FlexBox>
                </ToolTip>
              </FlexBox>
              <FlexBox>
                <ToolTip title='ambient'>
                  <FlexBox gap={0.5}>
                    {weather.is_day > 0 ? <Day /> : <Night />}
                    <Typography>{`${
                      weather.is_day > 0 ? 'Day' : 'Night'
                    }`}</Typography>
                  </FlexBox>
                </ToolTip>
              </FlexBox>
            </FlexBox>
          </CardContent>
        ) : null}
      </GridBox>
    </Card>
  )
}

export default CityTitle
