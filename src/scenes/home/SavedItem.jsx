import { useTheme, Button, Typography } from '@mui/material'
import { Launch } from '@mui/icons-material'
import FlexBox from '../../components/FlexBox'

import PropTypes from 'prop-types'
import { Link } from 'react-router-dom'

SavedItem.propTypes = {
  location: PropTypes.object.isRequired,
}

function SavedItem({ location }) {
  const { city, country, link } = location

  const theme = useTheme().palette

  const buttonStyle = {
    '&&': {
      display: 'flex',
      py: 1,
      textAlign: 'start',
      textTransform: 'none',
      bgcolor: theme.tone.darkNormal,
      '&:hover': {
        bgcolor: theme.tone.darkLow,
      },
      '&.MuiButtonBase-root': {
        transition: 'none',
      },
    },
  }
  const launchIconStyle = {
    ml: 'auto',
    fontSize: 16,
  }
  const typographyStyle = {
    textOverflow: 'ellipsis',
  }

  return (
    <Button
      variant='text'
      color='tone'
      LinkComponent={Link}
      to={link}
      sx={buttonStyle}
    >
      <FlexBox gap={0.5} width={1}>
        <Typography noWrap={true} sx={typographyStyle}>
          {city}, {country}
        </Typography>
        <Launch sx={launchIconStyle} />
      </FlexBox>
    </Button>
  )
}

export default SavedItem
