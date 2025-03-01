"use client"

import { motion } from "framer-motion"
import { GitlabIcon as GitHub, Twitter, Mail, Heart } from "lucide-react"

const Footer = () => {
  return (
    <footer className="bg-white/80 dark:bg-gray-900/80 backdrop-blur-md mt-12 py-8">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-gray-800 dark:text-white">WeatherView</h3>
            <p className="text-gray-600 dark:text-gray-300">
              Your comprehensive weather companion with real-time updates and forecasts.
            </p>
          </div>

          <div>
            <h4 className="text-lg font-semibold text-gray-800 dark:text-white mb-4">Quick Links</h4>
            <ul className="space-y-2">
              {["Home", "About", "Features", "API"].map((link) => (
                <motion.li key={link} whileHover={{ x: 5 }}>
                  <a href="#" className="text-gray-600 dark:text-gray-300 hover:text-blue-500 dark:hover:text-blue-400">
                    {link}
                  </a>
                </motion.li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="text-lg font-semibold text-gray-800 dark:text-white mb-4">Resources</h4>
            <ul className="space-y-2">
              {["Documentation", "Support", "Terms", "Privacy"].map((link) => (
                <motion.li key={link} whileHover={{ x: 5 }}>
                  <a href="#" className="text-gray-600 dark:text-gray-300 hover:text-blue-500 dark:hover:text-blue-400">
                    {link}
                  </a>
                </motion.li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="text-lg font-semibold text-gray-800 dark:text-white mb-4">Connect</h4>
            <div className="flex space-x-4">
              {[
                { icon: GitHub, link: "https://github.com" },
                { icon: Twitter, link: "https://twitter.com" },
                { icon: Mail, link: "mailto:contact@example.com" },
              ].map((social, index) => (
                <motion.a
                  key={index}
                  href={social.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-gray-600 dark:text-gray-300 hover:text-blue-500 dark:hover:text-blue-400"
                  whileHover={{ y: -3 }}
                >
                  <social.icon className="h-6 w-6" />
                </motion.a>
              ))}
            </div>
          </div>
        </div>

        <div className="mt-8 pt-8 border-t border-gray-200 dark:border-gray-700">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <p className="text-gray-600 dark:text-gray-300 text-center md:text-left">
              © {new Date().getFullYear()} WeatherView. All rights reserved.
            </p>
            <div className="flex items-center mt-4 md:mt-0">
              <span className="text-gray-600 dark:text-gray-300">Made with</span>
              <Heart className="h-4 w-4 mx-1 text-red-500" />
              <span className="text-gray-600 dark:text-gray-300">by Your Name</span>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}

export default Footer

