import { Tooltip, Box } from '@mui/material'

function ToolTip({ children, title }) {
  return (
    <Tooltip title={title} sx={{ '&:hover': { cursor: 'default' } }}>
      <Box>{children}</Box>
    </Tooltip>
  )
}

export default ToolTip
