function getMeterGradient(tempMin, tempMax) {
  // <= 16 VERY COLD, -15 <= -1 COLD, 0 <= 14 WARM, 15 <= 29 VERY WARM, HOT >= 30
  // If varies enough, push to new color
  // VERY COLD
  const isVeryColdToWarm =
    tempMin < tempMax &&
    tempMin <= -16 &&
    (tempMin <= tempMax - 15 || tempMax >= 0)
  const isVeryColdToCold =
    tempMin < tempMax &&
    tempMin <= -16 &&
    (tempMin <= tempMax - 5 || tempMax >= -15)
  const isVeryCold = tempMin <= -16
  // COLD
  const isColdToVeryWarm =
    tempMin < tempMax &&
    tempMin <= -1 &&
    (tempMin <= tempMax - 15 || tempMax >= 15)
  const isColdToWarm =
    tempMin < tempMax &&
    tempMin <= -1 &&
    (tempMin <= tempMax - 5 || tempMax >= 0)
  const isCold = tempMin <= -1
  // WARM
  const isWarmToHot =
    tempMin < tempMax &&
    tempMin <= 14 &&
    (tempMin <= tempMax - 15 || tempMax >= 30)
  const isWarmToVeryWarm =
    tempMin < tempMax &&
    tempMin <= 14 &&
    (tempMin <= tempMax - 5 || tempMax >= 15)
  const isWarm = tempMin <= 14
  // VERY WARM
  const isVeryWarmToHot =
    tempMin < tempMax &&
    tempMin <= 29 &&
    (tempMin <= tempMax - 5 || tempMax >= 30)
  const isVeryWarm = tempMin <= 29

  switch (true) {
    // VERY COLD
    case isVeryColdToWarm:
      return 'very-cold-to-warm'
    case isVeryColdToCold:
      return 'very-cold-to-cold'
    case isVeryCold:
      return 'very-cold'
    // COLD
    case isColdToVeryWarm:
      return 'cold-to-very-warm'
    case isColdToWarm:
      return 'cold-to-warm'
    case isCold:
      return 'cold'
    // WARM
    case isWarmToHot:
      return 'warm-to-hot'
    case isWarmToVeryWarm:
      return 'warm-to-very-warm'
    case isWarm:
      return 'warm'
    // VERY WARM
    case isVeryWarmToHot:
      return 'very-warm-to-hot'
    case isVeryWarm:
      return 'very-warm'
    default:
      return 'hot'
  }
}

export default getMeterGradient
