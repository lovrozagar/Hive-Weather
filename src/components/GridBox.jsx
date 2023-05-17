import { Box } from '@mui/material'

import PropTypes from 'prop-types'

GridBox.propTypes = {
  type: PropTypes.string,
  children: PropTypes.node,
  sx: PropTypes.object,
}

function GridBox({ type, children, sx, ...props }) {
  const styling = {
    display: 'grid',
    gridTemplateColumns: type,
    alignItems: 'center',
    ...sx,
  }
  return (
    <Box {...props} sx={styling}>
      {children}
    </Box>
  )
}

export default GridBox
