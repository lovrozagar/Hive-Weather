import PropTypes from 'prop-types'
import { useTheme, Button, Typography } from '@mui/material'
import { Launch } from '@mui/icons-material'
import FlexBox from '../../components/FlexBox'

SavedItem.propTypes = {
  location: PropTypes.object.isRequired,
}

function SavedItem({ location }) {
  const { city, country, link } = location

  const theme = useTheme().palette
  const greyBackground = theme.neutral.light
  const greyBackgroundHover = theme.neutral.lightMedium

  const buttonStyle = {
    display: 'flex',
    textAlign: 'start',
    transition: 'none',
    py: 1,
    textTransform: 'none',
    bgcolor: greyBackground,
    '&:hover': {
      bgcolor: greyBackgroundHover,
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
      disableRipple
      variant='text'
      color='tone'
      sx={buttonStyle}
      href={link}
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
