import { useTheme, Box, Typography, ButtonBase } from '@mui/material'
import FlexBox from '../../components/FlexBox'
import logo from '../../assets/static/logo.svg'

import { useContext } from 'react'
import { ModeContext } from '../../App'
import { Link } from 'react-router-dom'
import PropTypes from 'prop-types'

AppTitle.propTypes = {
  component: PropTypes.string,
  sx: PropTypes.object,
  main: PropTypes.bool,
}

function AppTitle({ sx, component = 'h3', main = false }) {
  const { mode } = useContext(ModeContext)
  const theme = useTheme().palette

  const containerStyle = {
    ...sx,
  }
  const buttonBaseStyle = {
    borderRadius: 2,
    '&:focus-visible': {
      outline: `${theme.lightPreserved.lightGray} solid 2px`,
      outlineOffset: 3,
    },
  }
  const fontStyle = {
    position: 'relative',
    bottom: 1,
    display: main ? { xs: 'none', md: 'block' } : 'auto',
    fontFamily: ['Roboto Mono', 'monospace'].join(','),
    fontWeight: '500',
    letterSpacing: -1,
    color: main
      ? theme.lightPreserved.dark
      : mode === 'dark'
      ? theme.lightPreserved.dark
      : theme.lightPreserved.strongGray,
  }

  return (
    <Box sx={containerStyle}>
      {main ? (
        <ButtonBase
          component={Link}
          to='/'
          disableRipple
          tabIndex={1}
          color='tone'
          sx={buttonBaseStyle}
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
        </ButtonBase>
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
