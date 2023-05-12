import { useTheme, Box, IconButton, Snackbar, Alert } from '@mui/material'
import { IosShare, ContentCopy } from '@mui/icons-material'
import { useState } from 'react'

function CopyLinkButton() {
  const [snackbar, setSnackbar] = useState(false)

  const shareUrl = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: 'Hive Weather',
          url: window.location.href,
        })
        console.log('Shared successfully')
      } catch (err) {
        console.error('Error sharing:', err)
      }
    } else {
      navigator.clipboard.writeText(window.location.href)
      setSnackbar(true)
    }
  }

  const theme = useTheme().palette
  const alertColor = theme.tone.dark
  const alertBackground = theme.tone.light

  const alertStyle = { color: alertColor, bgcolor: alertBackground }

  return (
    <Box>
      <IconButton color='tone' onClick={shareUrl}>
        <IosShare />
      </IconButton>
      <Snackbar
        open={snackbar}
        autoHideDuration={1000}
        anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
        onClose={() => setSnackbar(false)}
      >
        <Alert
          icon={<ContentCopy />}
          variant='filled'
          sx={alertStyle}
        >{`Link copied`}</Alert>
      </Snackbar>
    </Box>
  )
}

export default CopyLinkButton
