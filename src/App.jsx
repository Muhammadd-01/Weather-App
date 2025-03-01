"use client"

import { useState, useEffect } from "react"
import { motion } from "framer-motion"
import SearchBar from "./components/SearchBar"
import CurrentWeather from "./components/CurrentWeather"
import HourlyForecast from "./components/HourlyForecast"
import WeeklyForecast from "./components/WeeklyForecast"
import ThemeToggle from "./components/ThemeToggle"
import LoadingSpinner from "./components/LoadingSpinner"
import ErrorMessage from "./components/ErrorMessage"
import { fetchWeatherData, fetchForecastData } from "./services/weatherService"

function App() {
  const [weatherData, setWeatherData] = useState(null)
  const [forecastData, setForecastData] = useState(null)
  const [location, setLocation] = useState("")
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [darkMode, setDarkMode] = useState(() => {
    // Get saved theme from localStorage or use system preference
    const savedTheme = localStorage.getItem("theme")
    return savedTheme ? savedTheme === "dark" : window.matchMedia("(prefers-color-scheme: dark)").matches
  })

  // Apply dark mode class to html element
  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add("dark")
    } else {
      document.documentElement.classList.remove("dark")
    }
    localStorage.setItem("theme", darkMode ? "dark" : "light")
  }, [darkMode])

  // Get user's location on initial load
  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        async (position) => {
          try {
            const { latitude, longitude } = position.coords
            const weatherResponse = await fetchWeatherData({ lat: latitude, lon: longitude })
            setWeatherData(weatherResponse)
            setLocation(weatherResponse.name)

            const forecastResponse = await fetchForecastData({ lat: latitude, lon: longitude })
            setForecastData(forecastResponse)

            setLoading(false)
          } catch (err) {
            setError("Failed to fetch weather data. Please try again.")
            setLoading(false)
          }
        },
        (err) => {
          setError("Location access denied. Please search for a city manually.")
          setLoading(false)
        },
      )
    } else {
      setError("Geolocation is not supported by your browser. Please search for a city manually.")
      setLoading(false)
    }
  }, [])

  // Handle location search
  const handleLocationSelect = async (selectedLocation) => {
    try {
      setLoading(true)
      setError(null)

      const weatherResponse = await fetchWeatherData({ q: selectedLocation })
      setWeatherData(weatherResponse)
      setLocation(selectedLocation)

      const forecastResponse = await fetchForecastData({
        lat: weatherResponse.coord.lat,
        lon: weatherResponse.coord.lon,
      })
      setForecastData(forecastResponse)

      setLoading(false)
    } catch (err) {
      setError("Failed to fetch weather data. Please try again.")
      setLoading(false)
    }
  }

  // Toggle dark mode
  const toggleDarkMode = () => {
    setDarkMode(!darkMode)
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-blue-100 dark:from-gray-900 dark:to-gray-800 transition-colors duration-500">
      <div className="container mx-auto px-4 py-8 max-w-4xl">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="flex justify-between items-center mb-8"
        >
          <h1 className="text-3xl font-bold text-blue-600 dark:text-blue-400">Weather App</h1>
          <ThemeToggle darkMode={darkMode} toggleDarkMode={toggleDarkMode} />
        </motion.div>

        <SearchBar onLocationSelect={handleLocationSelect} />

        {loading ? (
          <LoadingSpinner />
        ) : error ? (
          <ErrorMessage message={error} />
        ) : (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.5, delay: 0.2 }}>
            {weatherData && <CurrentWeather weatherData={weatherData} />}

            {forecastData && (
              <>
                <HourlyForecast forecastData={forecastData} />
                <WeeklyForecast forecastData={forecastData} />
              </>
            )}
          </motion.div>
        )}
      </div>
    </div>
  )
}

export default App

