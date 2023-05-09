import clear from '../assets/animated/clear.svg'
import clouds_sm from '../assets/animated/clouds_sm.svg'
import clouds_md from '../assets/animated/clouds_md.svg'
import clouds_lg from '../assets/animated/clouds_lg.svg'
import clouds_full from '../assets/animated/clouds_full.svg'
import rain_sm from '../assets/animated/rain_sm.svg'
import rain_md from '../assets/animated/rain_md.svg'
import rain_full from '../assets/animated/rain_full.svg'
import snow_sm from '../assets/animated/snow_sm.svg'
import snow_md from '../assets/animated/snow_md.svg'
import snow_full from '../assets/animated/snow_full.svg'

function getDayWeatherLogo(weatherCode) {
  // console.log(weatherCode)
  switch (weatherCode) {
    case 0:
      return clear
    case 1:
      return clouds_sm
    case 2:
      return clouds_md
    case 3:
      return clouds_lg
    case 45:
    case 48:
      return clouds_full
    case 51:
    case 56:
    case 61:
    case 66:
      return rain_sm
    case 53:
    case 63:
      return rain_md
    case 55:
    case 57:
    case 65:
    case 67:
    case 80:
    case 81:
    case 82:
      return rain_full
    case 71:
      return snow_sm
    case 73:
      return snow_md
    case 75:
    case 85:
    case 86:
      return snow_full
    case 95:
    case 96:
    case 99:
      return clouds_full
    default:
      return clouds_full
  }
}

export default getDayWeatherLogo
