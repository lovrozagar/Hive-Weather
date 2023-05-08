import { Box } from '@mui/material'

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
