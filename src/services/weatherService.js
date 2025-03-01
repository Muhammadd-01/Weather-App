// API key for OpenWeather API
const API_KEY = "YOUR_OPENWEATHER_API_KEY"
const BASE_URL = "https://api.openweathermap.org/data/2.5"

// Fetch current weather data
export async function fetchWeatherData(params) {
  let url = `${BASE_URL}/weather?appid=${API_KEY}&units=metric`

  if (params.q) {
    url += `&q=${params.q}`
  } else if (params.lat && params.lon) {
    url += `&lat=${params.lat}&lon=${params.lon}`
  }

  const response = await fetch(url)

  if (!response.ok) {
    throw new Error("Weather data not found")
  }

  return response.json()
}

// Fetch forecast data
export async function fetchForecastData(params) {
  let url = `${BASE_URL}/forecast?appid=${API_KEY}&units=metric`

  if (params.lat && params.lon) {
    url += `&lat=${params.lat}&lon=${params.lon}`
  }

  const response = await fetch(url)

  if (!response.ok) {
    throw new Error("Forecast data not found")
  }

  return response.json()
}

// Fetch city suggestions (mock implementation)
export async function fetchCitySuggestions(query) {
  // In a real app, you would use a geocoding API like OpenWeather Geocoding API
  // For this example, we'll use a mock implementation

  // Simulate API call delay
  await new Promise((resolve) => setTimeout(resolve, 300))

  // Mock data for city suggestions
  const cities = [
    "New York, US",
    "London, GB",
    "Paris, FR",
    "Tokyo, JP",
    "Sydney, AU",
    "Berlin, DE",
    "Moscow, RU",
    "Beijing, CN",
    "Rio de Janeiro, BR",
    "Cairo, EG",
    "Toronto, CA",
    "Mumbai, IN",
    "Dubai, AE",
    "Singapore, SG",
    "Los Angeles, US",
    "Chicago, US",
    "Miami, US",
    "San Francisco, US",
    "Seattle, US",
    "Boston, US",
  ]

  // Filter cities based on query
  return cities.filter((city) => city.toLowerCase().includes(query.toLowerCase())).slice(0, 5) // Return top 5 results
}

