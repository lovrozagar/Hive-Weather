import { useState, useMemo, useLayoutEffect, createContext } from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'

import AppBar from './scenes/appBar/AppBar'
import Home from './scenes/home/Home'
import Forecast from './scenes/forecast/Forecast'
import Hourly from './scenes/hourly/Hourly'
import Docs from './scenes/docs/Docs'
import Error from './scenes/error/Error'

import { createTheme } from '@mui/material'
import { themeSettings } from './theme'
import { ThemeProvider } from '@emotion/react'
import { CssBaseline } from '@mui/material'
import {
  getSavedModeOption,
  saveModeOption,
} from './utils/localStorage/themeStorage'

export const ModeContext = createContext()

function App() {
  const [mode, setMode] = useState('dark')
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
        <ModeContext.Provider value={{ mode, handleModeSwitch }}>
          <AppBar />
          <Routes>
            <Route path='/hive-weather/' element={<Home />} />
            <Route
              path='/hive-weather/forecast/:city/:country/:countryCode/:latitude/:longitude'
              element={<Forecast />}
            />
            <Route
              path='/hive-weather/hourly/:city/:country/:countryCode/:timezone/:latitude/:longitude/:day'
              element={<Hourly />}
            />
            <Route path='/hive-weather/docs' element={<Docs />} />
            <Route path='*' element={<Error />} />
          </Routes>
        </ModeContext.Provider>
      </ThemeProvider>
    </Router>
  )
}

export default App
