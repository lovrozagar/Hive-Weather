import { Box } from '@mui/material'

function CountryIcon({ countryCode, sx, ...props }) {
  return (
    <Box {...props} sx={sx}>
      <img
        style={{ height: '100%' }}
        src={`https://open-meteo.com/images/country-flags/${countryCode}.svg`}
        alt={`country logo ${countryCode}`}
      />
    </Box>
  )
}

export default CountryIcon
