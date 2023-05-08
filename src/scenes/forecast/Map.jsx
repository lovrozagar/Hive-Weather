import PropTypes from 'prop-types'
import { GoogleMap, MarkerF, useJsApiLoader } from '@react-google-maps/api'
import { Box } from '@mui/material'

Map.propTypes = {
  coordinates: PropTypes.object,
}

function Map({ coordinates }) {
  const mapStyle = {
    width: '450px',
    aspectRatio: '1/1',
  }

  const { isLoaded, loadError } = useJsApiLoader({
    id: 'google-map-script',
    googleMapsApiKey: 'AIzaSyAO1ey3FsygPJn0Xo-4eDhbhHQFMVmql5Y',
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

  if (loadError) return <div>Error loading maps</div>
  if (!isLoaded) return <div>Loading maps</div>

  const { lat, lng } = coordinates

  const handleLoad = (map) => {
    // console.log('Map loaded:', map)
  }

  return (
    <Box display='inline-block' borderRadius={2} overflow='hidden !important'>
      {isLoaded ? (
        <GoogleMap
          mapContainerStyle={mapStyle}
          center={coordinates}
          zoom={10}
          controlsSize={5}
          onLoad={handleLoad}
          options={options}
        >
          <MarkerF position={{ lat, lng }} visible={true} />
        </GoogleMap>
      ) : null}
    </Box>
  )
}
export default Map
