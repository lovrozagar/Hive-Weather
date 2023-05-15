import {
  Drawer,
  Box,
  Link,
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
import { useNavigate } from 'react-router-dom'
import { ModeContext } from '../../App'

function SideMenu() {
  const { mode, handleModeSwitch } = useContext(ModeContext)
  const [open, setOpen] = useState(false)
  const navigate = useNavigate()

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

  const handleOptionClick = (option) => {
    switch (option.toLowerCase()) {
      case 'home':
        navigate('/hive-weather/')
        break
      case 'docs':
        navigate('hive-weather/docs')
        break
      case 'github':
        break
      case 'mode':
        handleModeSwitch()
        break
      default:
        null
    }

    setOpen(false)
  }

  return (
    <>
      <IconButton color='inherit' onClick={() => setOpen(true)}>
        <Menu />
      </IconButton>
      <Drawer
        anchor='right'
        open={open}
        PaperProps={{ sx: { width: 270 } }}
        ModalProps={{
          onBackdropClick: () => setOpen(false),
        }}
      >
        <GridBox gap={1}>
          <AppTitle sx={{ mt: 2, ml: 2.5 }} />
          <List sx={{ p: 0 }}>
            {options.map((option) => (
              <Box key={option}>
                {option === 'mode' ? <Divider sx={{ my: 0.5 }} /> : null}
                <Link
                  href={
                    option.toLocaleLowerCase() === 'github'
                      ? 'https://github.com/lovrozagar/hive-weather'
                      : null
                  }
                  target='_blank'
                  underline='none'
                  color='inherit'
                >
                  <ListItem onClick={() => handleOptionClick(option)}>
                    <ListItemButton sx={{ borderRadius: 1 }}>
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
                </Link>
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
