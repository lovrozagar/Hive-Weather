import { useEffect, useState } from 'react'
import { IconButton, Zoom } from '@mui/material'
import { FavoriteBorder, Favorite } from '@mui/icons-material'
import {
  saveLocations,
  getSavedLocations,
} from '../utils/localStorage/savedLocationsStorage'
import uniqid from 'uniqid'

function LikeSaveButton({ city, country, countryCode, lat, lng }) {
  const [liked, setLiked] = useState(false)

  useEffect(() => {
    const locations = getSavedLocations()
    const isLikedOnLoad = locations.find(
      (location) => location.city === city && location.country === country
    )
    setLiked(Boolean(isLikedOnLoad))
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
            link: window.location.href,
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
        <Zoom in={!liked}>
          <FavoriteBorder />
        </Zoom>
      )}
      {liked ? (
        <Zoom in={liked}>
          <Favorite />
        </Zoom>
      ) : null}
    </IconButton>
  )
}

export default LikeSaveButton
