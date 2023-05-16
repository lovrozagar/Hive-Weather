import {
  Stepper,
  Step,
  StepLabel,
  StepConnector,
  Typography,
} from '@mui/material'
import {
  Search,
  CloudOutlined,
  QueryBuilder,
  FavoriteBorder,
  CalendarTodayOutlined,
} from '@mui/icons-material'
import { styled } from '@mui/styles'
import { useState } from 'react'

function Steps() {
  const [activeStep, setActiveStep] = useState(-1)

  const steps = [
    {
      label:
        'Search for a location: Use the autocomplete feature to quickly find the weather information for your desired city.',
      icon: <Search />,
    },
    {
      label:
        'View current weather: See the temperature, humidity, wind speed, and other important weather data for your selected location.',
      icon: <CloudOutlined />,
    },
    {
      label:
        'Check weekly forecast: Look at the weekly forecast to plan ahead for the upcoming days and know what to expect in terms of weather conditions.',
      icon: <CalendarTodayOutlined />,
    },
    {
      label:
        'Check hourly forecast: For more detailed planning, check out the hourly forecast to see how the weather is expected to change throughout the day.',
      icon: <QueryBuilder />,
    },
    {
      label:
        'Save cities: Save your frequently visited cities for easy access to their weather data.',
      icon: <FavoriteBorder />,
    },
  ]

  const handleStepClick = (stepIndex) => {
    if (stepIndex === activeStep) setActiveStep(-1)
    else setActiveStep(stepIndex)
  }

  const stepStyle = {
    cursor: 'default',
    '& .MuiStepLabel-root .Mui-active': {
      color: 'primary.main',
    },
  }

  return (
    <Stepper
      activeStep={activeStep}
      orientation='vertical'
      nonLinear
      connector={<StyledStepConnector />}
      sx={{ mb: 'auto', px: 3, pt: 2 }}
    >
      {steps.map(({ label, icon }, index) => (
        <Step key={label} onClick={() => handleStepClick(index)} sx={stepStyle}>
          <StepLabel
            icon={icon}
            sx={{ color: index === activeStep ? 'unset' : 'tone.lightLow' }}
          >
            <Typography
              sx={{
                pl: 1,
                color: index === activeStep ? 'unset' : 'tone.lightLow',
              }}
            >
              {label}
            </Typography>
          </StepLabel>
        </Step>
      ))}
    </Stepper>
  )
}

const StyledStepConnector = styled(StepConnector)({
  '& .MuiStepConnector-line': {
    minHeight: 40,
  },
})

export default Steps
