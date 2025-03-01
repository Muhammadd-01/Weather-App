"use client"

import { motion } from "framer-motion"
import { getWeatherIcon, formatTime } from "../utils/helpers"

function HourlyForecast({ forecastData }) {
  // Get the next 24 hours of forecast (8 items with 3-hour intervals)
  const hourlyData = forecastData.list.slice(0, 8)

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.1 }}
      className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6 mb-8"
    >
      <h3 className="text-xl font-bold text-gray-800 dark:text-white mb-4">Hourly Forecast</h3>

      <div className="flex overflow-x-auto pb-2 -mx-2 px-2">
        <div className="flex space-x-4">
          {hourlyData.map((item, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: index * 0.05 }}
              className="flex flex-col items-center min-w-[80px] p-3 rounded-lg bg-gray-50 dark:bg-gray-700"
            >
              <p className="text-sm font-medium text-gray-500 dark:text-gray-400">
                {formatTime(new Date(item.dt * 1000))}
              </p>
              <img
                src={getWeatherIcon(item.weather[0].icon) || "/placeholder.svg"}
                alt={item.weather[0].description}
                className="w-12 h-12 my-2"
              />
              <p className="text-lg font-semibold text-gray-800 dark:text-white">{Math.round(item.main.temp)}°C</p>
              <p className="text-xs text-gray-500 dark:text-gray-400 mt-1 capitalize">{item.weather[0].description}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </motion.div>
  )
}

export default HourlyForecast

