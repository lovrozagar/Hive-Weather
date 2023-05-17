import PropTypes from 'prop-types'
import { GoogleMap, MarkerF, useJsApiLoader } from '@react-google-maps/api'
import { Box } from '@mui/material'

Map.propTypes = {
  coordinates: PropTypes.object,
}

function Map({ coordinates }) {
  const { lat, lng } = coordinates

  const { isLoaded, loadError } = useJsApiLoader({
    id: 'google-map-script',
    googleMapsApiKey: import.meta.env.VITE_GOOGLE_API_KEY,
  })

  const options = {
    mapTypeId: 'hybrid',
    styles: [
      {
        featureType: 'road',
        stylers: [{ visibility: 'off' }],
      },
    ],
    disableDefaultUI: true,
    streetViewControl: false,
    zoomControl: true,
    fullscreenControl: true,
  }

  const containerStyle = {
    display: 'inline-block',
    width: '100%',
    maxWidth: { xs: '100%', sm: 450 },
  }
  const mapStyle = {
    aspectRatio: '1/1',
  }

  if (loadError) return <Box>Error loading maps</Box>
  if (!isLoaded) return <Box>Loading maps</Box>

  return (
    <Box
      sx={containerStyle}
      borderRadius={2}
      overflow='hidden !important'
      // HIDE OVERFLOW OVER BORDER RADIUS
    >
      {isLoaded ? (
        <GoogleMap
          mapContainerStyle={mapStyle}
          center={coordinates}
          zoom={10}
          controlsSize={5}
          options={options}
        >
          <MarkerF position={{ lat, lng }} visible={true} />
        </GoogleMap>
      ) : null}
    </Box>
  )
}
export default Map
