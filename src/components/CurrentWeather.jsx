"use client"

import { motion } from "framer-motion"
import { getWeatherIcon, formatDate } from "../utils/helpers"

function CurrentWeather({ weatherData }) {
  const { main, weather, name, sys, wind } = weatherData
  const weatherIcon = getWeatherIcon(weather[0].icon)
  const formattedDate = formatDate(new Date())

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6 mb-8"
    >
      <div className="flex flex-col md:flex-row md:items-center justify-between">
        <div>
          <div className="flex items-center">
            <h2 className="text-2xl font-bold text-gray-800 dark:text-white">{name}</h2>
            <span className="ml-2 text-sm bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-200 px-2 py-0.5 rounded-full">
              {sys.country}
            </span>
          </div>
          <p className="text-gray-500 dark:text-gray-400 mt-1">{formattedDate}</p>

          <div className="mt-4">
            <div className="flex items-center">
              <span className="text-5xl font-bold text-gray-800 dark:text-white">{Math.round(main.temp)}°C</span>
              <div className="ml-4">
                <p className="text-gray-600 dark:text-gray-300 capitalize">{weather[0].description}</p>
                <p className="text-gray-500 dark:text-gray-400 text-sm mt-1">
                  Feels like: {Math.round(main.feels_like)}°C
                </p>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-6 md:mt-0">
          <img
            src={weatherIcon || "/placeholder.svg"}
            alt={weather[0].description}
            className="w-24 h-24 object-contain"
          />
        </div>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-6 pt-6 border-t border-gray-200 dark:border-gray-700">
        <div className="text-center">
          <p className="text-gray-500 dark:text-gray-400 text-sm">Humidity</p>
          <p className="text-xl font-semibold text-gray-800 dark:text-white mt-1">{main.humidity}%</p>
        </div>
        <div className="text-center">
          <p className="text-gray-500 dark:text-gray-400 text-sm">Wind</p>
          <p className="text-xl font-semibold text-gray-800 dark:text-white mt-1">{Math.round(wind.speed)} m/s</p>
        </div>
        <div className="text-center">
          <p className="text-gray-500 dark:text-gray-400 text-sm">Min Temp</p>
          <p className="text-xl font-semibold text-gray-800 dark:text-white mt-1">{Math.round(main.temp_min)}°C</p>
        </div>
        <div className="text-center">
          <p className="text-gray-500 dark:text-gray-400 text-sm">Max Temp</p>
          <p className="text-xl font-semibold text-gray-800 dark:text-white mt-1">{Math.round(main.temp_max)}°C</p>
        </div>
      </div>
    </motion.div>
  )
}

export default CurrentWeather

