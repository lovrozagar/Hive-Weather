const getRandomYearTodaysDate = () => {
  // 5 - 40 YEARS THROWBACK
  const randomThrowBackYear = Math.floor(Math.random() * 35) + 5

  const date = new Date()
  const year = date.getFullYear() - randomThrowBackYear
  const month = (date.getMonth() + 1).toString().padStart(2, '0')
  const day = date.getDate().toString().padStart(2, '0')
  console.log('YEAR', year, 'MONTH', month, 'DAY', day)

  return `${year}-${month}-${day}`
}

export default getRandomYearTodaysDate
