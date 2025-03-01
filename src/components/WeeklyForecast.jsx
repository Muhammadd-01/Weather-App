"use client"

import { motion } from "framer-motion"
import { getWeatherIcon, formatDay } from "../utils/helpers"

function WeeklyForecast({ forecastData }) {
  // Get daily forecast by filtering for noon (12:00) of each day
  const dailyData = forecastData.list
    .filter((item) => {
      const date = new Date(item.dt * 1000)
      return date.getHours() === 12
    })
    .slice(0, 5) // Get 5 days

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.2 }}
      className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6"
    >
      <h3 className="text-xl font-bold text-gray-800 dark:text-white mb-4">5-Day Forecast</h3>

      <div className="space-y-4">
        {dailyData.map((item, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.3, delay: index * 0.05 }}
            className="flex items-center justify-between p-3 rounded-lg bg-gray-50 dark:bg-gray-700"
          >
            <div className="flex items-center">
              <div className="w-16 text-center">
                <p className="text-sm font-medium text-gray-500 dark:text-gray-400">
                  {formatDay(new Date(item.dt * 1000))}
                </p>
              </div>

              <div className="flex items-center ml-4">
                <img
                  src={getWeatherIcon(item.weather[0].icon) || "/placeholder.svg"}
                  alt={item.weather[0].description}
                  className="w-10 h-10 mr-3"
                />
                <p className="text-sm text-gray-600 dark:text-gray-300 capitalize w-24">
                  {item.weather[0].description}
                </p>
              </div>
            </div>

            <div className="flex items-center">
              <p className="text-lg font-semibold text-gray-800 dark:text-white">{Math.round(item.main.temp)}°C</p>
              <div className="ml-4 text-right">
                <p className="text-xs text-blue-500 dark:text-blue-400">{Math.round(item.main.temp_max)}°</p>
                <p className="text-xs text-gray-500 dark:text-gray-400">{Math.round(item.main.temp_min)}°</p>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </motion.div>
  )
}

export default WeeklyForecast

