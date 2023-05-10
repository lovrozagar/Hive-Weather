function getDescription(weatherCode) {
  switch (parseInt(weatherCode)) {
    case 0:
      return 'Clear'
    case 1:
      return 'Mainly Clear'
    case 2:
      return 'Small Clouds'
    case 3:
      return 'Clouds'
    case 45:
      return 'Fog'
    case 48:
      return 'Dense Fog'
    case 51:
      return 'Light Drizzle'
    case 53:
      return 'Drizzle'
    case 55:
      return 'Dense Drizzle'
    case 56:
      return 'Light Freezing Drizzle'
    case 57:
      return 'Dense Freezing Drizzle'
    case 61:
      return 'Light Rain'
    case 63:
      return 'Rain'
    case 65:
      return 'Heavy Rain'
    case 66:
      return 'Light Freezing Rain'
    case 67:
      return 'Heavy Freezing Rain'
    case 71:
      return 'Light Snow'
    case 73:
      return 'Snow'
    case 75:
      return 'Heavy Snow'
    case 80:
    case 81:
    case 82:
      return 'Rain Shower'
    case 85:
    case 86:
      return 'Snow Shower'
    case 95:
    case 96:
    case 99:
      return 'Clouds'
    default:
      return 'Clear'
  }
}

export default getDescription
