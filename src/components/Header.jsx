"use client"

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Menu, X, MapPin, Settings, Info, GitlabIcon as GitHub } from "lucide-react"

const Header = ({ darkMode, toggleDarkMode }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  return (
    <header className="relative z-10 bg-white/80 dark:bg-gray-900/80 backdrop-blur-md">
      <nav className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          <motion.div
            className="flex items-center space-x-2"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
          >
            <MapPin className="h-6 w-6 text-blue-500" />
            <span className="text-xl font-bold text-gray-800 dark:text-white">WeatherView</span>
          </motion.div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-6">
            <NavLinks />
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors"
              onClick={() => window.open("https://github.com/yourusername/weather-app", "_blank")}
            >
              <GitHub className="h-5 w-5" />
            </motion.button>
          </div>

          {/* Mobile Menu Button */}
          <motion.button
            whileTap={{ scale: 0.95 }}
            className="md:hidden p-2"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            {isMenuOpen ? (
              <X className="h-6 w-6 text-gray-800 dark:text-white" />
            ) : (
              <Menu className="h-6 w-6 text-gray-800 dark:text-white" />
            )}
          </motion.button>
        </div>

        {/* Mobile Navigation */}
        <AnimatePresence>
          {isMenuOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              className="md:hidden mt-4"
            >
              <NavLinks mobile />
            </motion.div>
          )}
        </AnimatePresence>
      </nav>
    </header>
  )
}

const NavLinks = ({ mobile }) => {
  const links = [
    { name: "Weather Maps", icon: MapPin },
    { name: "Settings", icon: Settings },
    { name: "About", icon: Info },
  ]

  return (
    <div className={`${mobile ? "flex flex-col space-y-4" : "flex items-center space-x-6"}`}>
      {links.map((link) => (
        <motion.a
          key={link.name}
          href="#"
          className={`flex items-center space-x-2 text-gray-600 dark:text-gray-300 hover:text-blue-500 dark:hover:text-blue-400 ${
            mobile ? "py-2" : ""
          }`}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          <link.icon className="h-5 w-5" />
          <span>{link.name}</span>
        </motion.a>
      ))}
    </div>
  )
}

export default Header

