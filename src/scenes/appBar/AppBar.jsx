import {
  Box,
  AppBar as Bar,
  Toolbar,
  Button,
  IconButton,
  Zoom,
} from '@mui/material'
import { DarkModeOutlined, LightModeOutlined } from '@mui/icons-material'
import FlexBox from '../../components/FlexBox'
import AppTitle from './AppTitle'
import AutocompleteCity from '../home/AutocompleteCity'
import SideMenu from './SideMenu'

import { ModeContext } from '../../App'
import { useContext } from 'react'
import { Link } from 'react-router-dom'

function AppBar() {
  const { mode, handleModeSwitch } = useContext(ModeContext)

  const appBarStyle = {
    position: 'relative',
    zIndex: 20,
    mb: 3,
  }
  const toolbarStyle = {
    display: 'flex',
    justifyContent: 'space-between',
    minHeight: 64,
    gap: { xs: 1, sm: 2, lg: 0 },
  }
  const autocompleteStyle = {
    position: 'relative',
    left: { md: -25 },
    flex: 1,
    maxWidth: 750,
    m: 'auto',
  }
  const optionButtonStyle = { display: { xs: 'none', md: 'inline-flex' } }

  return (
    <Bar sx={appBarStyle}>
      <Toolbar sx={toolbarStyle}>
        <Box>
          <AppTitle component='h1' main sx={{ mr: { md: 4 } }} />
        </Box>
        <Box sx={autocompleteStyle}>
          <AutocompleteCity />
        </Box>
        <FlexBox type='end' gap={1}>
          <Box sx={optionButtonStyle}>
            <Link to='/hive-weather/docs'>
              <Button color='lightPreserved' sx={{ mr: 1 }}>
                Docs
              </Button>
            </Link>
          </Box>
          <IconButton
            size='large'
            edge='start'
            color='inherit'
            aria-label='open drawer'
            onClick={handleModeSwitch}
            sx={optionButtonStyle}
          >
            {/* WRITTEN IN THIS WAY SO THAT THE ZOOM ANIMATIONS TRIGGER ON CHANGE */}
            {mode && mode === 'dark' && (
              <Zoom appear in={true}>
                <LightModeOutlined />
              </Zoom>
            )}
            {mode !== 'dark' && (
              <Zoom appear in={true}>
                <DarkModeOutlined />
              </Zoom>
            )}
          </IconButton>
          <SideMenu />
        </FlexBox>
      </Toolbar>
    </Bar>
  )
}

export default AppBar
