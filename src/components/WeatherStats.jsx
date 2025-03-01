"use client"

import { motion } from "framer-motion"
import { Droplets, Wind, Sun, Cloud, Umbrella, Thermometer } from "lucide-react"

const WeatherStats = ({ weatherData }) => {
  const stats = [
    {
      icon: Thermometer,
      label: "Feels Like",
      value: `${Math.round(weatherData.main.feels_like)}°C`,
      color: "text-orange-500",
    },
    {
      icon: Droplets,
      label: "Humidity",
      value: `${weatherData.main.humidity}%`,
      color: "text-blue-500",
    },
    {
      icon: Wind,
      label: "Wind Speed",
      value: `${weatherData.wind.speed} m/s`,
      color: "text-teal-500",
    },
    {
      icon: Cloud,
      label: "Cloudiness",
      value: `${weatherData.clouds.all}%`,
      color: "text-gray-500",
    },
    {
      icon: Sun,
      label: "UV Index",
      value: "Moderate",
      color: "text-yellow-500",
    },
    {
      icon: Umbrella,
      label: "Precipitation",
      value: "0 mm",
      color: "text-purple-500",
    },
  ]

  return (
    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4 mt-6">
      {stats.map((stat, index) => (
        <motion.div
          key={stat.label}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: index * 0.1 }}
          className="bg-white dark:bg-gray-800 rounded-xl p-4 shadow-lg"
        >
          <div className="flex flex-col items-center text-center">
            <stat.icon className={`h-8 w-8 ${stat.color} mb-2`} />
            <h3 className="text-sm text-gray-500 dark:text-gray-400">{stat.label}</h3>
            <p className="text-lg font-semibold text-gray-800 dark:text-white mt-1">{stat.value}</p>
          </div>
        </motion.div>
      ))}
    </div>
  )
}

export default WeatherStats

