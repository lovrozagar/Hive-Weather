import {
  Card,
  CardHeader,
  CardContent,
  Avatar,
  Typography,
  Box,
} from '@mui/material'
import { PlaceOutlined } from '@mui/icons-material'
import FlexBox from './FlexBox'
import GridBox from './GridBox'

import CountryIcon from './CountryIcon'

function CityTitle({ city, country, countryCode, lat, lng, sx, ...props }) {
  return (
    <Card {...props} sx={sx}>
      <CardHeader
        avatar={
          <CountryIcon height={28} width={28} countryCode={countryCode} />
        }
        title={
          <Typography
            variant='h5'
            fontWeight='500'
          >{`${city}, ${country}`}</Typography>
        }
        subheader={
          <Typography
            variant='h6'
            fontWeight='300'
            letterSpacing={1}
          >{`${lat}°N ${lng}°E`}</Typography>
        }
      />
    </Card>
  )
}

export default CityTitle
// `https://open-meteo.com/images/country-flags/${countryCode}.svg`
