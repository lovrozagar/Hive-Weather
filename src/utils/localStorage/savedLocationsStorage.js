const saveLocations = (array) =>
  localStorage.setItem('saved', JSON.stringify(array))

const getSavedLocations = () => {
  return JSON.parse(localStorage.getItem('saved')) || []
}

export { saveLocations, getSavedLocations }
