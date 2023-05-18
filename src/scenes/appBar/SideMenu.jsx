import {
  Drawer,
  Box,
  Button,
  IconButton,
  List,
  ListItem,
  ListItemButton,
  ListItemText,
  ListItemIcon,
  Typography,
  Divider,
} from '@mui/material'
import {
  Menu,
  Home,
  GitHub,
  Close,
  DarkModeOutlined,
  LightModeOutlined,
  DescriptionOutlined,
} from '@mui/icons-material'
import FlexBox from '../../components/FlexBox'
import GridBox from '../../components/GridBox'
import AppTitle from './AppTitle'

import { useState, useContext } from 'react'
import { Link } from 'react-router-dom'
import { ModeContext } from '../../App'

function SideMenu() {
  const { mode, handleModeSwitch } = useContext(ModeContext)
  const [open, setOpen] = useState(false)

  const options = ['Home', 'Docs', 'GitHub', 'mode']

  const getIcon = (option) => {
    switch (option.toLowerCase()) {
      case 'home':
        return <Home />
      case 'docs':
        return <DescriptionOutlined />
      case 'github':
        return <GitHub />
      case 'mode':
        return mode === 'dark' ? <LightModeOutlined /> : <DarkModeOutlined />
      default:
        return null
    }
  }

  const handleAppSceneClick = (option) => {
    switch (option.toLowerCase()) {
      case 'home':
        return '/'
      case 'docs':
        return '/docs'
      default:
        return null
    }
  }

  const handleLinkNormalClick = (e, option) => {
    if (option.toLowerCase() === 'github' || option.toLowerCase() === 'mode')
      e.preventDefault()
    setOpen(false)
  }

  const handleLinkMiddleClick = (e, option) => {
    if (
      e.button === 1 &&
      (option.toLowerCase() === 'github' || option.toLowerCase() === 'mode')
    )
      e.preventDefault()
    setOpen(false)
  }

  return (
    <>
      <IconButton color='inherit' onClick={() => setOpen(true)}>
        <Menu sx={{ fontSize: 28, color: 'whitePreserved.main' }} />
      </IconButton>
      <Drawer
        anchor='right'
        open={open}
        PaperProps={{ sx: { width: 270 } }}
        ModalProps={{ onBackdropClick: () => setOpen(false) }}
      >
        <GridBox gap={1}>
          <AppTitle sx={{ mt: 2, ml: 2.5 }} />
          <List sx={{ p: 0 }}>
            {options.map((option) => (
              <Box key={option}>
                {option === 'mode' ? <Divider sx={{ my: 0.5 }} /> : null}
                {option.toLowerCase() === 'github' ? (
                  <ListItem>
                    <ListItemButton
                      href='https://github.com/lovrozagar/Hive-Weather'
                      target='_blank'
                      rel='noopener noreferrer'
                      sx={{ color: 'tone.light', borderRadius: 1 }}
                    >
                      <ListItemIcon>{getIcon(option)}</ListItemIcon>
                      <ListItemText primary={option} />
                    </ListItemButton>
                  </ListItem>
                ) : (
                  <ListItem
                    component={Link}
                    to={handleAppSceneClick(option)}
                    onClick={(e) => handleLinkNormalClick(e, option)}
                    onAuxClick={(e) => handleLinkMiddleClick(e, option)}
                    sx={{ textDecoration: 'none', color: 'inherit' }}
                  >
                    <ListItemButton
                      onClick={
                        option.toLocaleLowerCase() === 'mode'
                          ? handleModeSwitch
                          : null
                      }
                      sx={{ color: 'tone.light', orderRadius: 1 }}
                    >
                      <ListItemIcon>{getIcon(option)}</ListItemIcon>
                      <ListItemText
                        primary={
                          option === 'mode'
                            ? `${mode === 'light' ? 'Light' : 'Dark'} ${option}`
                            : option
                        }
                      />
                    </ListItemButton>
                  </ListItem>
                )}
              </Box>
            ))}
          </List>
          <Button
            variant='outlined'
            sx={{ mt: 2, mx: 'auto' }}
            onClick={() => setOpen(false)}
          >
            <FlexBox gap={1}>
              <Close />
              <Typography>Close</Typography>
            </FlexBox>
          </Button>
        </GridBox>
      </Drawer>
    </>
  )
}

export default SideMenu
