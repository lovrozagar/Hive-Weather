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
  const titleStye = { flex: { xs: 0, sm: 0, lg: 1 }, mr: 'auto' }
  const autocompleteStyle = { flex: 1, minWidth: { lg: 750 } }
  const optionsStyle = { flex: { xs: 0, sm: 0, lg: 1 }, ml: 'auto' }
  const optionButtonStyle = { display: { xs: 'none', md: 'inline-flex' } }

  return (
    <Bar sx={appBarStyle}>
      <Toolbar sx={toolbarStyle}>
        <AppTitle component='h1' main sx={titleStye} />
        <Box color='navbar' sx={autocompleteStyle}>
          <AutocompleteCity />
        </Box>
        <FlexBox type='end' gap={0.5} sx={optionsStyle}>
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
