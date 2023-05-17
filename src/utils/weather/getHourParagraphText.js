const getTemperatureDescription = (celsius) => {
  switch (true) {
    case celsius < -15:
      return 'extremely cold'
    case celsius < 0:
      return 'very cold'
    case celsius < 5:
      return 'cold'
    case celsius < 10:
      return 'chilly'
    case celsius < 15:
      return 'cool'
    case celsius < 20:
      return 'mild'
    case celsius < 25:
      return 'warm'
    case celsius < 30:
      return 'hot'
    case celsius < 40:
      return 'very hot'
    default:
      return 'extremely hot'
  }
}

const getWindDirectionDescription = (degrees) => {
  // TRANSFORM TO SECTIONS FOR VISIBILITY
  const direction = Math.floor(degrees / 22.5 + 0.5) % 16
  switch (direction) {
    case 0:
      return 'north'
    case 1:
      return 'north-northeast'
    case 2:
      return 'northeast'
    case 3:
      return 'east-northeast'
    case 4:
      return 'east'
    case 5:
      return 'east-southeast'
    case 6:
      return 'southeast'
    case 7:
      return 'south-southeast'
    case 8:
      return 'south'
    case 9:
      return 'south-southwest'
    case 10:
      return 'southwest'
    case 11:
      return 'west-southwest'
    case 12:
      return 'west'
    case 13:
      return 'west-northwest'
    case 14:
      return 'northwest'
    case 15:
      return 'north-northwest'
    default:
      return 'unknown direction'
  }
}

const getWindSpeedDescription = (windSpeedKmh) => {
  switch (true) {
    case windSpeedKmh < 1:
      return 'calm air'
    case windSpeedKmh < 7:
      return 'light air'
    case windSpeedKmh < 13:
      return 'light breeze'
    case windSpeedKmh < 20:
      return 'gentle breeze'
    case windSpeedKmh < 28:
      return 'moderate breeze'
    case windSpeedKmh < 35:
      return 'fresh breeze'
    case windSpeedKmh < 43:
      return 'strong breeze'
    case windSpeedKmh < 51:
      return 'moderate gale'
    case windSpeedKmh < 60:
      return 'fresh gale'
    case windSpeedKmh < 69:
      return 'strong gale'
    case windSpeedKmh < 80:
      return 'whole gale'
    default:
      return 'storm'
  }
}

const getChanceOfRainDescription = (chanceOfRain) => {
  switch (true) {
    case chanceOfRain < 1:
      return 'Rain is not at all expected for this hour.'
    case chanceOfRain < 20:
      return "There's a very low chance of rain for this hour."
    case chanceOfRain < 40:
      return "There's a low chance of rain for this hour. You probably won't need an umbrella."
    case chanceOfRain < 60:
      return "There's a moderate chance of rain for this hour. You might want to bring an umbrella just in case."
    case chanceOfRain < 80:
      return "There's a high chance of rain for this hour. You should bring an umbrella."
    default:
      return "There's a very high chance of rain for this hour. Don't forget your umbrella!"
  }
}

const getSnowfallDescription = (snowfallCm) => {
  switch (true) {
    case snowfallCm === 0:
      return ''
    case snowfallCm < 2.5:
      return "Additionally, there's very little snow today."
    case snowfallCm < 10:
      return "Additionally, there's some snow today. Watch your step!"
    case snowfallCm < 20:
      return "Additionally, there's a moderate amount of snow today. Consider wearing snow boots."
    case snowfallCm < 30:
      return "Additionally, there's a lot of snow today. You should bring a shovel if you need to go out."
    default:
      return "Additionally, there's a significant amount of snow today. Stay inside if possible!"
  }
}

const getClearnessDescription = (cloudCoverage, visibility) => {
  let cloudCoverageDescription
  let visibilityDescription

  switch (true) {
    case cloudCoverage < 30:
      cloudCoverageDescription = 'The sky is clear with little to no clouds and'
      break
    case cloudCoverage < 70:
      cloudCoverageDescription = 'The sky is partly cloudy and'
      break
    default:
      cloudCoverageDescription = 'The sky is covered with clouds but'
      break
  }

  switch (true) {
    case visibility < 500:
      visibilityDescription =
        'visibility is very low, be extra careful while driving.'
      break
    case visibility < 1500:
      visibilityDescription = 'visibility is low, drive cautiously.'
      break
    default:
      visibilityDescription = 'visibility is good.'
      break
  }

  return `${cloudCoverageDescription} ${visibilityDescription}`
}

const getHourParagraphText = ({
  temperature,
  feel,
  windDirection,
  windSpeed,
  chanceOfRain,
  snowfall,
  visibility,
  cloudCover,
}) => {
  const tempDesc = getTemperatureDescription(temperature)
  const feelDesc = getTemperatureDescription(feel)
  const windDirectionDesc = getWindDirectionDescription(windDirection)
  const windSpeedDesc = getWindSpeedDescription(windSpeed)
  const rainDesc = getChanceOfRainDescription(chanceOfRain)
  const snowDesc = getSnowfallDescription(snowfall)
  const clearnessDesc = getClearnessDescription(cloudCover, visibility)

  const firstSection =
    tempDesc === feelDesc
      ? `The temperature outside is ${tempDesc}. The wind is`
      : temperature < feel
      ? `The temperature outside is ${tempDesc}, but it may feel more like ${feelDesc} because of the high humidity. The wind is`
      : `The temperature outside is ${tempDesc}, but it may feel more like ${feelDesc} due to the wind`

  const secondSection = `blowing from the ${windDirectionDesc} and feeling like a ${windSpeedDesc}.`

  return `${firstSection} ${secondSection} ${clearnessDesc} ${rainDesc} ${snowDesc}`
}

export default getHourParagraphText
export { getWindDirectionDescription }
