import { useEffect, useState } from 'react'
import { IconButton, Zoom } from '@mui/material'
import { FavoriteBorder, Favorite } from '@mui/icons-material'

import PropTypes from 'prop-types'
import uniqid from 'uniqid'
import {
  saveLocations,
  getSavedLocations,
} from '../utils/localStorage/savedLocationsStorage'

LikeSaveButton.propTypes = {
  city: PropTypes.string.isRequired,
  lat: PropTypes.string.isRequired,
  lng: PropTypes.string.isRequired,
  country: PropTypes.string,
  countryCode: PropTypes.string,
}

function LikeSaveButton({ city, country, countryCode, lat, lng }) {
  const [liked, setLiked] = useState(false)
  const [url, setUrl] = useState(null)

  useEffect(() => {
    const locations = getSavedLocations()
    const url = window.location.href
    const isLikedOnLoad = locations.find(
      (location) =>
        location.city === city &&
        location.country === country &&
        location.link === url
    )
    setLiked(Boolean(isLikedOnLoad))
    setUrl(url)
  }, [city, country])

  const handleClick = () => {
    const locations = getSavedLocations()

    setLiked((prevLiked) => {
      if (prevLiked === false) {
        saveLocations([
          ...locations,
          {
            city,
            country,
            countryCode,
            lat,
            lng,
            link: url,
            id: uniqid(),
          },
        ])
      } else {
        const newLocations = locations.filter(
          (location) => location.city !== city && location.country !== country
        )
        saveLocations(newLocations)
      }

      return !prevLiked
    })
  }

  return (
    <IconButton onClick={handleClick} color={liked ? 'red' : 'tone'}>
      {!liked && (
        <Zoom appear in={true}>
          <FavoriteBorder />
        </Zoom>
      )}
      {liked ? (
        <Zoom appear in={true}>
          <Favorite />
        </Zoom>
      ) : null}
    </IconButton>
  )
}

export default LikeSaveButton
