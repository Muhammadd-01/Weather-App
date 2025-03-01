"use client"

import { motion } from "framer-motion"

function LoadingSpinner() {
  return (
    <div className="flex justify-center items-center py-20">
      <motion.div
        animate={{ rotate: 360 }}
        transition={{ duration: 1, repeat: Number.POSITIVE_INFINITY, ease: "linear" }}
        className="w-12 h-12 border-4 border-blue-200 border-t-blue-500 rounded-full"
      />
    </div>
  )
}

export default LoadingSpinner

