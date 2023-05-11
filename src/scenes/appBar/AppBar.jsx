import { Search, Menu } from '@mui/icons-material'
import {
  Box,
  useTheme,
  useMediaQuery,
  AppBar as Bar,
  Toolbar,
  IconButton,
  Typography,
} from '@mui/material'
import React from 'react'
import AutocompleteCity from '../home/AutocompleteCity'
import ModeSwitch from './ModeSwitch'

function AppBar() {
  const isNonMobileScreens = useMediaQuery('(min-width: 1000px)')
  const theme = useTheme()
  const neutralLight = theme.palette.neutral.light
  const dark = theme.palette.neutral.dark
  const alt = theme.palette.background.alt

  return (
    <Bar position='static' color='navbar'>
      <Toolbar
        sx={{
          display: 'flex',
          justifyContent: 'space-between',
          gap: 1,
        }}
      >
        <Typography
          variant='h6'
          noWrap
          component='div'
          sx={{ display: { xs: 'none', sm: 'block' } }}
        >
          Hive Weather
        </Typography>
        <Box
          color='navbar'
          sx={{
            width: '50%',
            mx: 2,
            m: '0 auto',
            // display: { xs: 'none', sm: 'block' },
            color: 'white',
          }}
        >
          <AutocompleteCity />
        </Box>
        <Box position='relative'>
          <ModeSwitch />
        </Box>
        <IconButton
          size='large'
          edge='start'
          color='inherit'
          aria-label='open drawer'
        >
          <Menu />
        </IconButton>
      </Toolbar>
    </Bar>
  )
}

export default AppBar
