import { useTheme, Box, Typography, Button } from '@mui/material'
import { Air } from '@mui/icons-material'
import FlexBox from '../../components/FlexBox'
import GridBox from '../../components/GridBox'

import { Link } from 'react-router-dom'

function Error() {
  const theme = useTheme().palette

  const containerStyle = {
    position: 'absolute',
    height: '100vh',
    width: 1,
    mt: -11,
    overflow: 'hidden',
  }
  const contentStyle = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: '1',
    maxWidth: 600,
    p: 3,
  }
  const airStyle = {
    fontSize: 32,
    animation: 'pulse 2.5s linear infinite',
  }
  const textStyle = {
    fontWeight: '400',
    color: 'tone.lightLow',
    textShadow: `0 -10px 50px ${theme.primary.transparent}`,
  }
  const linkStyle = {
    display: 'flex',
    justifyContent: 'center',
    width: '100',
    textDecoration: 'none',
  }
  const buttonStyle = {
    width: { xs: '100%', sm: 'fit-content' },
  }

  return (
    <Box sx={containerStyle}>
      <Box sx={contentStyle}>
        <GridBox gap={4}>
          <FlexBox type='center'>
            <Air sx={airStyle} />
          </FlexBox>
          <Typography variant='h3' sx={textStyle}>
            Sorry, but the winds of fate have blown you off course and onto a
            page that does not exist.
          </Typography>
          <Link to='/' style={linkStyle}>
            <Button
              size='large'
              variant='outlined'
              color='primary'
              sx={buttonStyle}
            >
              Go back to home
            </Button>
          </Link>
        </GridBox>
      </Box>
    </Box>
  )
}

export default Error
