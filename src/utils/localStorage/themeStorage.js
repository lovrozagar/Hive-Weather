const saveModeOption = (option) =>
  localStorage.setItem('mode', option.toString())

const getSavedModeOption = () => localStorage.getItem('mode') || 'light'

export { saveModeOption, getSavedModeOption }
