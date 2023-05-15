import { useTheme, Link, Box, Typography } from '@mui/material'
import FlexBox from '../../components/FlexBox'
import logo from '../../assets/static/logo.svg'

import { useNavigate } from 'react-router-dom'
import PropTypes from 'prop-types'

AppTitle.propTypes = {
  component: PropTypes.string,
  sx: PropTypes.object,
  main: PropTypes.bool,
}

function AppTitle({ sx, component = 'h3', main = false }) {
  const navigate = useNavigate()
  const theme = useTheme().palette

  const handleTitleClick = () => navigate('/hive-weather/')

  const fluidGray = theme.tone.lightLow
  const lightGray = theme.constant.lightGray

  const linkContainerStyle = {
    pointerEvents: main ? 'all' : 'none',
    ...sx,
  }
  const fontStyle = {
    position: 'relative',
    bottom: 1,
    letterSpacing: -1,
    fontFamily: ['Roboto Mono', 'monospace'].join(','),
    fontWeight: '500',
    color: main ? lightGray : fluidGray,
    display: main ? { xs: 'none', md: 'block' } : 'auto',
  }

  return (
    <Link
      underline='none'
      component='button'
      variant='body2'
      onClick={main ? handleTitleClick : null}
      sx={linkContainerStyle}
    >
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
  )
}

export default AppTitle
