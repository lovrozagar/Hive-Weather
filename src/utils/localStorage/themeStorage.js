const saveModeOption = (option) =>
  localStorage.setItem('mode', option.toString())

const getSavedModeOption = () => localStorage.getItem('mode') || 'dark'

export { saveModeOption, getSavedModeOption }
