import { useState, useMemo, useLayoutEffect } from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'

import AppBar from './scenes/appBar/AppBar'
import Home from './scenes/home/Home'
import Forecast from './scenes/forecast/Forecast'
import Hourly from './scenes/hourly/Hourly'
import Error from './scenes/Error'

import { createTheme } from '@mui/material'
import { themeSettings } from './theme'
import { ThemeProvider } from '@emotion/react'
import { CssBaseline, Button } from '@mui/material'
import {
  getSavedModeOption,
  saveModeOption,
} from './utils/localStorage/themeStorage'

function App() {
  const [mode, setMode] = useState('light')
  const theme = useMemo(() => createTheme(themeSettings(mode)), [mode])

  const handleModeSwitch = () => {
    setMode((prevTheme) => {
      const oppositeMode = prevTheme === 'dark' ? 'light' : 'dark'
      saveModeOption(oppositeMode)
      return oppositeMode
    })
  }

  useLayoutEffect(() => {
    setMode(getSavedModeOption())
  }, [])

  return (
    <Router>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <AppBar />
        <Button onClick={handleModeSwitch}>Theme</Button>
        <Routes>
          <Route path='/hive-weather/' element={<Home />} />
          <Route
            path='/hive-weather/forecast/:city/:country/:countryCode/:latitude/:longitude'
            element={<Forecast />}
          />
          <Route
            path='/hive-weather/hourly/:city/:country/:countryCode/:timezone/:latitude/:longitude/:dayIndex'
            element={<Hourly />}
          />
          <Route path='*' element={<Error />} />
        </Routes>
      </ThemeProvider>
    </Router>
  )
}

export default App
