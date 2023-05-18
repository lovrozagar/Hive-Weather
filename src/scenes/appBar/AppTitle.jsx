import { useTheme, Box, Typography } from '@mui/material'
import FlexBox from '../../components/FlexBox'
import logo from '../../assets/static/logo.svg'

import { Link } from 'react-router-dom'
import PropTypes from 'prop-types'

AppTitle.propTypes = {
  component: PropTypes.string,
  sx: PropTypes.object,
  main: PropTypes.bool,
}

function AppTitle({ sx, component = 'h3', main = false }) {
  const theme = useTheme().palette

  const fluidGray = theme.tone.lightLow
  const lightGray = theme.lightPreserved.lightGray

  const containerStyle = {
    ...sx,
  }
  const fontStyle = {
    position: 'relative',
    bottom: 1,
    display: main ? { xs: 'none', md: 'block' } : 'auto',
    fontFamily: ['Roboto Mono', 'monospace'].join(','),
    fontWeight: '500',
    letterSpacing: -1,
    color: main ? lightGray : fluidGray,
  }

  return (
    <Box sx={containerStyle}>
      {main ? (
        <Link to='/' style={{ textDecoration: 'none' }}>
          <FlexBox type='left' gap={0.5}>
            <Box height='42px' width='42px'>
              <Box
                component='img'
                alt='Hive weather logo'
                src={logo}
                width={1}
                sx={{ objectFit: 'contain' }}
              />
            </Box>
            <Typography component={component} variant='h4' sx={fontStyle}>
              hive_weather
            </Typography>
          </FlexBox>
        </Link>
      ) : (
        <FlexBox type='left' gap={0.5}>
          <Box height='42px' width='42px'>
            <Box
              component='img'
              alt='Hive weather logo'
              src={logo}
              width={1}
              sx={{ objectFit: 'contain' }}
            />
          </Box>
          <Typography component={component} variant='h4' sx={fontStyle}>
            hive_weather
          </Typography>
        </FlexBox>
      )}
    </Box>
  )
}

export default AppTitle
