import { Box } from '@mui/material'
import { PlaceOutlined } from '@mui/icons-material'

import PropTypes from 'prop-types'

CountryIcon.propTypes = {
  countryCode: PropTypes.string,
  sx: PropTypes.object,
  type: PropTypes.string,
}

function CountryIcon({ countryCode, sx, type = 'suggestion', ...props }) {
  const placeIconStyle = {
    fontSize: type === 'suggestion' ? 18 : 28,
    color: 'tone.lightMedium',
  }

  return (
    <Box {...props} sx={sx}>
      {countryCode && countryCode !== 'no-country-code' ? (
        <img
          style={{ height: '100%' }}
          src={`https://open-meteo.com/images/country-flags/${countryCode}.svg`}
          alt={`country logo ${countryCode}`}
        />
      ) : (
        <PlaceOutlined sx={placeIconStyle} />
      )}
    </Box>
  )
}

export default CountryIcon
