import { Box } from '@mui/material'

import PropTypes from 'prop-types'

ItalicText.propTypes = {
  children: PropTypes.node.isRequired,
}

function ItalicText({ children }) {
  return (
    <Box component='span' fontWeight='500' fontStyle='italic'>
      {children}
    </Box>
  )
}

export default ItalicText
