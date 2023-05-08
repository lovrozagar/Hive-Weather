import { Box } from '@mui/material'

function FlexBox({ type, children, sx, ...props }) {
  let justifyContent
  switch (type) {
    case 'between':
      justifyContent = 'space-between'
      break
    case 'around':
      justifyContent = 'space-around'
      break
    case 'evenly':
      justifyContent = 'space-evenly'
      break
    case 'center':
      justifyContent = 'center'
      break
    case 'end':
      justifyContent = 'flex-end'
      break
    default:
      justifyContent = 'flex-start'
  }

  const styling = {
    display: 'flex',
    alignItems: 'center',
    justifyContent,
    ...sx,
  }
  return (
    <Box {...props} sx={styling}>
      {children}
    </Box>
  )
}

export default FlexBox
