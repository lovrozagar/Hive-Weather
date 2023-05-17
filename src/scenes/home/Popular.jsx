import {
  Card,
  CardHeader,
  CardContent,
  Typography,
  Divider,
} from '@mui/material'
import { Whatshot } from '@mui/icons-material'
import FlexBox from '../../components/FlexBox'
import GridBox from '../../components/GridBox'
import SavedItem from './SavedItem'

import { useMemo } from 'react'
import PropTypes from 'prop-types'

Popular.propTypes = {
  component: PropTypes.string,
}

function Popular({ component = 'section' }) {
  const popular = useMemo(
    () => [
      {
        city: 'Paris',
        country: 'France',
        link: '/hive-weather/forecast/Paris/France/FR/48_856614/2_3522219',
      },
      {
        city: 'New York',
        country: 'United States of America',
        link: '/hive-weather/forecast/New%20York/United%20States%20of%20America/US/40_7127753/-74_0059728',
      },
      {
        city: 'Tōkyō',
        country: 'Tokio, Japan',
        link: '/hive-weather/forecast/Tōkyō/Tokio,%20Japan/JP/35_6803997/139_7690174',
      },
      {
        city: 'London',
        country: 'United Kingdom',
        link: '/hive-weather/forecast/London/United%20Kingdom/GB/51_5072178/-0_1275862',
      },
      {
        city: 'Dubai',
        country: 'United Arab Emirates',
        link: '/hive-weather/forecast/Dubai/United%20Arab%20Emirates/AE/25_2048493/55_2707828',
      },
    ],
    []
  )

  const cardStyle = {
    p: 3,
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

  return (
    <GridBox>
      <Card sx={cardStyle} component={component}>
        <CardHeader
          sx={{ pt: 0, px: 0 }}
          title={
            <FlexBox type='center' gap={1}>
              <Whatshot color='orange' />
              <Typography variant='h5'>Popular</Typography>
            </FlexBox>
          }
        />
        <CardContent sx={contentStyle}>
          {popular && popular.length > 0
            ? popular.map((location, index) => (
                <GridBox key={index} width={1}>
                  <GridBox type='1fr'>
                    <SavedItem location={location} />
                  </GridBox>
                  {index < popular.length - 1 ? (
                    <Divider sx={{ my: 1 }} />
                  ) : null}
                </GridBox>
              ))
            : null}
        </CardContent>
      </Card>
    </GridBox>
  )
}

export default Popular
