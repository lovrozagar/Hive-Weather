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
} from '@mui/material'
import {
  PlaceOutlined,
  FavoriteBorder,
  IosShare,
  Place,
} from '@mui/icons-material'
import FlexBox from './FlexBox'
import GridBox from './GridBox'
import LikeSaveButton from './LikeSaveButton'
import CopyLinkButton from './CopyLinkButton'
import CountryIcon from './CountryIcon'

function CityTitle({
  city,
  country,
  countryCode,
  lat,
  lng,
  sx,
  isHome = false,
  description,
  ...props
}) {
  return (
    <Card {...props} sx={sx}>
      <FlexBox type='between'>
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
              <Place />
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
            <Typography variant='h6' fontWeight='300' letterSpacing={1}>
              {description || `${lat}°N ${lng}°E`}
            </Typography>
          }
        />
        <CardActions sx={{ mr: 1 }}>
          {isHome ? (
            <Button variant='outlined'>See more</Button>
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
      </FlexBox>
    </Card>
  )
}

export default CityTitle
// `https://open-meteo.com/images/country-flags/${countryCode}.svg`
