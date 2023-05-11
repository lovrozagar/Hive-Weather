import { Box, Card, CardHeader, CardContent, Typography } from '@mui/material'
import { Thermostat, Waves, DoubleArrow } from '@mui/icons-material'
import FlexBox from '../../components/FlexBox'
import ToolTip from '../../components/ToolTip'
import getDescription from '../../utils/getDescription'
import { getWindDirectionDescription } from '../../utils/getHourParagraphText'
import { yyyymmdd_to_ddmmyyyy } from '../../utils/dateTimeFormats'

function ThrowbackCard({ city, throwback, throwbackDate, currentTime }) {
  const throwbackYear = throwbackDate.split('-')[0]
  const hourAsIndex = parseInt(currentTime.split('T')[0].split('-')[1])
  const throwbackDateFormatted = yyyymmdd_to_ddmmyyyy(throwbackDate)

  const {
    temperature_2m: { [hourAsIndex]: temperature },
    windspeed_10m: { [hourAsIndex]: windSpeed },
    winddirection_10m: { [hourAsIndex]: windDirection },
    weathercode: { [hourAsIndex]: weatherCode },
  } = throwback

  const temp = Math.round(temperature)
  const description = getDescription(weatherCode).toLowerCase()
  const windDirectionDescription = getWindDirectionDescription(windDirection)

  return (
    <Card sx={{ maxWidth: '450px' }}>
      <CardHeader
        title={`Throwback Weather ${throwbackDateFormatted}`}
        sx={{ pb: 0 }}
      />
      <CardContent>
        <Typography>
          On the same date and time of {throwbackYear}, the weather in{' '}
          <ItalicText>{city}</ItalicText> was{' '}
          <ItalicText>{temperature} °C</ItalicText>. The weather
          condition was described as <ItalicText>{description}</ItalicText>.
          Wind was blowing at the speed of{' '}
          <ItalicText>{windSpeed} kilometers per hour </ItalicText>
          from the <ItalicText>{windDirectionDescription}</ItalicText>.
        </Typography>
        <FlexBox flexWrap='wrap' gap={2} mt={2}>
          <ToolTip title='temperature'>
            <FlexBox gap={0.5}>
              <Thermostat />
              <Typography>{`${temp} °C`}</Typography>
            </FlexBox>
          </ToolTip>
          <ToolTip title='wind direction'>
            <FlexBox gap={0.5}>
              <DoubleArrow
                sx={{ transform: `rotate(${-90 + windDirection}deg)` }}
              />
              <Typography>{`${windDirection}°`}</Typography>
            </FlexBox>
          </ToolTip>
          <ToolTip title='wind speed'>
            <FlexBox gap={0.5}>
              <Waves />
              <Typography>{`${windSpeed} km/h`}</Typography>
            </FlexBox>
          </ToolTip>
        </FlexBox>
      </CardContent>
    </Card>
  )
}

export default ThrowbackCard

const ItalicText = ({ children }) => (
  <Box component='span' fontWeight='500' fontStyle='italic'>
    {children}
  </Box>
)
