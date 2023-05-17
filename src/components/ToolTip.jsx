import { Tooltip, Box } from '@mui/material'
import PropTypes from 'prop-types'

ToolTip.propTypes = {
  children: PropTypes.element,
  title: PropTypes.string.isRequired,
}

function ToolTip({ children, title }) {
  return (
    <Tooltip title={title} sx={{ '&:hover': { cursor: 'default' } }}>
      <Box>{children}</Box>
    </Tooltip>
  )
}

export default ToolTip
