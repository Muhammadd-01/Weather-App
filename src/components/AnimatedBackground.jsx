"use client"

import { useEffect, useRef } from "react"
import { weatherPatterns } from "../services/backgroundService"

const AnimatedBackground = ({ weatherType }) => {
  const canvasRef = useRef(null)
  const pattern = weatherPatterns[weatherType] || weatherPatterns.clear

  useEffect(() => {
    const canvas = canvasRef.current
    const ctx = canvas.getContext("2d")
    let particles = []
    let animationFrameId

    const resizeCanvas = () => {
      canvas.width = window.innerWidth
      canvas.height = window.innerHeight
    }

    const createParticles = () => {
      particles = []
      for (let i = 0; i < pattern.particles; i++) {
        particles.push({
          x: Math.random() * canvas.width,
          y: Math.random() * canvas.height,
          speed: 1 + Math.random() * 3,
          size: 2 + Math.random() * 3,
        })
      }
    }

    const drawParticles = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height)
      ctx.fillStyle = "rgba(255, 255, 255, 0.3)"

      particles.forEach((particle) => {
        ctx.beginPath()

        switch (pattern.pattern) {
          case "rain":
            ctx.moveTo(particle.x, particle.y)
            ctx.lineTo(particle.x, particle.y + 10)
            ctx.strokeStyle = "rgba(255, 255, 255, 0.3)"
            ctx.stroke()
            break
          case "snow":
            ctx.arc(particle.x, particle.y, particle.size, 0, Math.PI * 2)
            ctx.fill()
            break
          case "cloud":
            drawCloud(ctx, particle.x, particle.y, particle.size * 10)
            break
          case "thunder":
            if (Math.random() < 0.003) {
              ctx.fillStyle = "rgba(255, 255, 255, 0.9)"
              ctx.fillRect(0, 0, canvas.width, canvas.height)
              setTimeout(() => ctx.clearRect(0, 0, canvas.width, canvas.height), 50)
            }
            break
        }

        // Update particle position
        particle.y += particle.speed
        if (particle.y > canvas.height) {
          particle.y = -10
          particle.x = Math.random() * canvas.width
        }
      })

      animationFrameId = requestAnimationFrame(drawParticles)
    }

    const drawCloud = (ctx, x, y, size) => {
      ctx.beginPath()
      ctx.arc(x, y, size, 0, Math.PI * 2)
      ctx.arc(x + size * 0.5, y - size * 0.2, size * 0.8, 0, Math.PI * 2)
      ctx.arc(x - size * 0.5, y - size * 0.2, size * 0.8, 0, Math.PI * 2)
      ctx.fillStyle = "rgba(255, 255, 255, 0.2)"
      ctx.fill()
    }

    // Initialize
    resizeCanvas()
    createParticles()
    drawParticles()

    // Event listeners
    window.addEventListener("resize", () => {
      resizeCanvas()
      createParticles()
    })

    return () => {
      cancelAnimationFrame(animationFrameId)
      window.removeEventListener("resize", resizeCanvas)
    }
  }, [pattern])

  useEffect(() => {}, [weatherType])

  return <canvas ref={canvasRef} className="fixed top-0 left-0 w-full h-full pointer-events-none z-0" />
}

export default AnimatedBackground

