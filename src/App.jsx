import { useState, useMemo } from 'react'
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom'
import Home from './scenes/home/Home'
import Forecast from './scenes/forecast/Forecast'
import Hourly from './scenes/hourly/Hourly'
import Error from './scenes/Error'

import { createTheme } from '@mui/material'
import { themeSettings } from './theme'
import { ThemeProvider } from '@emotion/react'
import { CssBaseline, Button } from '@mui/material'

function App() {
  const [mode, setMode] = useState('light')
  const theme = useMemo(() => createTheme(themeSettings(mode)), [mode])

  const handleModeSwitch = () =>
    setMode((prevTheme) => (prevTheme === 'dark' ? 'light' : 'dark'))

  return (
    <Router>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <nav>
          <Link to='/hive-weather/'>Home</Link>
          <Link to='/hive-weather/forecast'>Forecast</Link>
          <Link to='/hive-weather/hourly'>Hourly</Link>
        </nav>
        <Button onClick={handleModeSwitch}>Theme</Button>
        <Routes>
          <Route path='/hive-weather/' element={<Home />} />
          <Route
            path='/hive-weather/forecast/:city/:latitude/:longitude'
            element={<Forecast />}
          />
          <Route
            path='/hive-weather/hourly/:city/:latitude/:longitude'
            element={<Hourly />}
          />
          <Route path='*' element={<Error />} />
        </Routes>
      </ThemeProvider>
    </Router>
  )
}

export default App
