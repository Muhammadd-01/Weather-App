// Different weather patterns for background animations
export const weatherPatterns = {
    clear: {
      particles: 0,
      pattern: "sun",
    },
    clouds: {
      particles: 20,
      pattern: "cloud",
    },
    rain: {
      particles: 100,
      pattern: "rain",
    },
    snow: {
      particles: 50,
      pattern: "snow",
    },
    thunderstorm: {
      particles: 30,
      pattern: "thunder",
    },
  }
  
  export const getWeatherPattern = (weatherCode) => {
    if (weatherCode >= 200 && weatherCode < 300) return "thunderstorm"
    if (weatherCode >= 300 && weatherCode < 600) return "rain"
    if (weatherCode >= 600 && weatherCode < 700) return "snow"
    if (weatherCode >= 801 && weatherCode < 900) return "clouds"
    return "clear"
  }
  
  