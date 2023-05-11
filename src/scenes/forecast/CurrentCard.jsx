import { Box, Card, CardHeader, CardContent, Typography } from '@mui/material'
import { Thermostat, Waves, DoubleArrow } from '@mui/icons-material'
import FlexBox from '../../components/FlexBox'
import ToolTip from '../../components/ToolTip'
import getDescription from '../../utils/getDescription'
import { getWindDirectionDescription } from '../../utils/getHourParagraphText'

function CurrentCard({ city, current }) {
  const { temperature, is_day, windspeed, weathercode, winddirection } = current

  const temp = Math.round(temperature)
  const daytimeOrNighttime = is_day ? 'daytime' : 'nighttime'
  const weatherDescription = getDescription(weathercode).toLowerCase()
  const windSpeed = Math.round(windspeed)
  const windDirection = getWindDirectionDescription(winddirection)

  return (
    <Card sx={{ maxWidth: '450px' }}>
      <CardHeader title='Current Weather' sx={{ pb: 0 }} />
      <CardContent>
        <Typography>
          At current time, the weather in <ItalicText>{city}</ItalicText> is{' '}
          <ItalicText>{temp} °C</ItalicText> and it is{' '}
          <ItalicText>{daytimeOrNighttime}</ItalicText>. The current weather{' '}
          condition is described as{' '}
          <ItalicText>{weatherDescription}</ItalicText>. Wind is blowing at the
          speed of <ItalicText>{windSpeed} kilometers per hour </ItalicText>
          from the <ItalicText>{windDirection}</ItalicText>.
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
                sx={{ transform: `rotate(${-90 + winddirection}deg)` }}
              />
              <Typography>{`${winddirection}°`}</Typography>
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

export default CurrentCard

const ItalicText = ({ children }) => (
  <Box component='span' fontWeight='500' fontStyle='italic'>
    {children}
  </Box>
)
