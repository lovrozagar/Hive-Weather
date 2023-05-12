const setSavedLocations = (array) =>
  localStorage.setItem('saved', JSON.stringify(array))

export default setSavedLocations
