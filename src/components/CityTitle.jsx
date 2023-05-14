import {
  Card,
  CardHeader,
  CardContent,
  CardActions,
  Avatar,
  Typography,
  Box,
  IconButton,
  Button,
  Divider,
} from '@mui/material'
import {
  PlaceOutlined,
  FavoriteBorder,
  IosShare,
  Place,
  LocationOffOutlined,
} from '@mui/icons-material'
import FlexBox from './FlexBox'
import GridBox from './GridBox'
import LikeSaveButton from './LikeSaveButton'
import CopyLinkButton from './CopyLinkButton'
import CountryIcon from './CountryIcon'
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
  Brightness5Outlined as Day,
  Brightness4Outlined as Night,
} from '@mui/icons-material'
import { Thermostat, ThermostatOutlined } from '@mui/icons-material'
import getDescription from '../utils/getDescription'
import ToolTip from './ToolTip'
import { useNavigate } from 'react-router-dom'
// import

function CityTitle({
  city,
  country,
  countryCode,
  lat,
  lng,
  sx,
  isHome = false,
  description,
  weather,
  ...props
}) {
  const navigate = useNavigate()

  const handleSeeMore = () => {
    if (weather) {
      const latStr = lat.toString().replace('.', '_')
      const lonStr = lng.toString().replace('.', '_')

      navigate(
        `/hive-weather/forecast/${city}/${country}/${countryCode}/${latStr}/${lonStr}`
      )
    }
  }

  return (
    <Card {...props} sx={{ pl: 1, color: 'tone.light', ...sx }}>
      <GridBox
        sx={{
          gridTemplateColumns: { xs: '1fr', sm: '1fr auto' },
          '@media (max-width: 599px)': {
            '& > :nth-of-type(1)': {
              order: 1,
            },
            '& > :nth-of-type(2)': {
              order: 3,
            },
            '& > :nth-of-type(3)': {
              order: 2,
            },
          },
        }}
      >
        <CardHeader
          avatar={
            countryCode ? (
              <CountryIcon
                height={28}
                width={28}
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
              fontWeight='300'
              letterSpacing={1}
              sx={{ color: 'tone.lightLow' }}
            >
              {description || `${lat}°N ${lng}°E`}
            </Typography>
          }
        />
        <CardActions
          sx={{
            pr: 3,
            gridRow: { md: '1/3' },
            gridColumn: { md: '2/3' },
            pb: { xs: 2, sm: 0 },
          }}
        >
          {isHome ? (
            <Button
              variant='outlined'
              onClick={handleSeeMore}
              sx={{ mx: 'auto' }}
            >
              See more
            </Button>
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
          <CardContent
            sx={{
              pt: 0,
              pl: 2,
              '&:last-child': {
                pb: { xs: 1, sm: 2, md: 2, lg: 2 },
              },
            }}
          >
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
                <ToolTip title='temperature'>
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
                <ToolTip title='temperature'>
                  <FlexBox gap={0.5}>
                    <Waves />
                    <Typography>{`${weather.windspeed} km/h`}</Typography>
                  </FlexBox>
                </ToolTip>
              </FlexBox>
              <FlexBox>
                <ToolTip title='temperature'>
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
