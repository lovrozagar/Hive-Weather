import { Button, Typography } from '@mui/material'
import { DescriptionOutlined, GitHub } from '@mui/icons-material'
import FlexBox from '../../components/FlexBox'

import { Link } from 'react-router-dom'

function HomeButtons() {
  const containerStyle = {
    mt: 1,
    gap: { xs: 1, sm: 3 },
    '& > *': { flex: { xs: 1, sm: 'unset' } },
    '& > :nth-of-type(1)': { ml: { xs: 0, sm: 0.5 } },
  }

  return (
    <FlexBox type='center' sx={containerStyle}>
      <Button
        component={Link}
        to='/hive-weather/docs'
        size='large'
        variant='outlined'
        color='primary'
        sx={{ py: 1.135, px: 3, w: 1 }}
      >
        <FlexBox gap={1}>
          <DescriptionOutlined /> Docs
        </FlexBox>
      </Button>
      <Button
        component='a'
        variant='text'
        size='large'
        href='https://github.com/lovrozagar/Hive-Weather'
        target='_blank'
        rel='noopener noreferrer'
        sx={{ py: 1.5, px: 3 }}
      >
        <FlexBox gap={1}>
          <GitHub />
          <Typography>Github</Typography>
        </FlexBox>
      </Button>
    </FlexBox>
  )
}

export default HomeButtons
