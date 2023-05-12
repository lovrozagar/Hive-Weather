import {
  useTheme,
  Card,
  CardHeader,
  CardContent,
  Typography,
  Button,
  Divider,
} from '@mui/material'
import { Favorite, Circle } from '@mui/icons-material'
import FlexBox from '../../components/FlexBox'
import GridBox from '../../components/GridBox'
import SavedItem from './SavedItem'

import { useLayoutEffect, useState } from 'react'
import {
  saveLocations,
  getSavedLocations,
} from '../../utils/localStorage/savedLocationsStorage'

function Saved() {
  const [saved, setSaved] = useState(null)

  // USING LAYOUT FOR OPTIMIZATION, AVOID 'NO SAVED' FLASH ON MOUNT
  useLayoutEffect(() => {
    setSaved(getSavedLocations())
  }, [])

  const handleRemoveSaved = (id) => {
    if (saved) {
      const filteredSaved = saved.filter((location) => location.id !== id)
      setSaved(filteredSaved)
      saveLocations(filteredSaved)
    }
  }

  const theme = useTheme().palette
  const blue = theme.primary.main
  const orange = theme.orange.main

  const weeklyOrDaily = (link) => (link.includes('forecast') ? blue : orange)

  const cardStyle = {
    py: 3,
    px: '3%',
  }
  const contentStyle = {
    display: 'grid',
    gridTemplateColumns: '1fr',
    justifyItems: 'start',
    borderRadius: '12px',
    '&&': {
      p: 0,
    },
  }
  const noSavedContainerStyle = {
    alignContent: 'center',
    placeSelf: 'center',
    textAlign: 'center',
    px: 4,
    gap: 1,
  }

  return (
    <GridBox>
      <Card sx={cardStyle}>
        <CardHeader
          sx={{ pt: 0, px: 0 }}
          title={
            <FlexBox type='center' gap={1}>
              <Favorite color='red' />
              <Typography variant='h5'>Saved</Typography>
            </FlexBox>
          }
        />
        <CardContent sx={contentStyle}>
          {saved && saved.length > 0 ? (
            <FlexBox type='center' width={1} gap={2} mb={2}>
              <FlexBox gap={1} color={blue}>
                <Circle size={6} sx={{ fontSize: 6 }} />
                <Typography fontWeight={500}>weekly</Typography>
              </FlexBox>
              <FlexBox gap={1} color={orange}>
                <Circle sx={{ fontSize: 6 }} />
                <Typography fontWeight={500}>hourly</Typography>
              </FlexBox>
            </FlexBox>
          ) : null}
          {saved && saved.length > 0 ? (
            saved.map((location, index) => (
              <GridBox key={index} width={1}>
                <GridBox type='auto 1fr auto' gap={1}>
                  <Circle
                    sx={{ color: weeklyOrDaily(location.link), fontSize: 6 }}
                  />
                  <SavedItem location={location} />
                  <Button
                    variant='outlined'
                    color='tone'
                    onClick={() => handleRemoveSaved(location.id)}
                  >
                    Remove
                  </Button>
                </GridBox>
                {index < saved.length - 1 ? (
                  <Divider sx={{ my: 1, ml: 2 }} />
                ) : null}
              </GridBox>
            ))
          ) : (
            <GridBox sx={noSavedContainerStyle}>
              <Typography>Your saved locations will appear here.</Typography>
              <Typography>{`To save a location's weekly or daily weather, click on the heart nex to it.`}</Typography>
            </GridBox>
          )}
        </CardContent>
      </Card>
    </GridBox>
  )
}

export default Saved
