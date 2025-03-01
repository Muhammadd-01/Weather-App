"use client"

import { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import Header from "./components/Header"
import Footer from "./components/Footer"
import WeatherDisplay from "./components/weather-display"
import SearchBar from "./components/search-bar"
import HourlyForecast from "./components/hourly-forecast"
import WeeklyForecast from "./components/weekly-forecast"
import WeatherStats from "./components/WeatherStats"
import LoadingSpinner from "./components/loading-spinner"
import ErrorMessage from "./components/error-message"
import AnimatedBackground from "./components/AnimatedBackground"
import { fetchWeatherData, fetchForecastData } from "./services/weatherService"
import { getWeatherPattern } from "./services/backgroundService"

export default function App() {
  const [weatherData, setWeatherData] = useState(null)
  const [forecastData, setForecastData] = useState(null)
  const [location, setLocation] = useState("")
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [darkMode, setDarkMode] = useState(() => {
    const savedTheme = localStorage.getItem("theme")
    return savedTheme ? savedTheme === "dark" : window.matchMedia("(prefers-color-scheme: dark)").matches
  })

  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add("dark")
    } else {
      document.documentElement.classList.remove("dark")
    }
    localStorage.setItem("theme", darkMode ? "dark" : "light")
  }, [darkMode])

  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        async (position) => {
          try {
            const { latitude, longitude } = position.coords
            const weatherResponse = await fetchWeatherData({ lat: latitude, lon: longitude })
            setWeatherData(weatherResponse)
            setLocation({ lat: latitude, lon: longitude, name: weatherResponse.name })

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

  const toggleDarkMode = () => {
    setDarkMode(!darkMode)
  }

  const weatherPattern = weatherData ? getWeatherPattern(weatherData.weather[0].id) : "clear"

  return (
    <div className={`min-h-screen relative ${darkMode ? "dark" : ""}`}>
      <AnimatedBackground weatherType={weatherPattern} />

      <div className="relative z-10">
        <Header darkMode={darkMode} toggleDarkMode={toggleDarkMode} />

        <main className="container mx-auto px-4 py-8">
          <SearchBar
            searchQuery={location?.name || ""}
            handleSearchChange={(e) => setLocation({ ...location, name: e.target.value })}
            searchResults={[]}
            handleLocationSelect={handleLocationSelect}
          />

          {loading ? (
            <LoadingSpinner />
          ) : error ? (
            <ErrorMessage message={error} />
          ) : (
            <AnimatePresence>
              <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.5 }}>
                {weatherData && (
                  <>
                    <WeatherDisplay weather={weatherData} location={location} />
                    <WeatherStats weatherData={weatherData} />
                    {forecastData && (
                      <>
                        <HourlyForecast hourlyData={forecastData.list.slice(0, 8)} />
                        <WeeklyForecast forecast={forecastData} />
                      </>
                    )}
                  </>
                )}
              </motion.div>
            </AnimatePresence>
          )}
        </main>

        <Footer />
      </div>
    </div>
  )
}

