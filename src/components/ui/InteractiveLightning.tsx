'use client'

import { useEffect, useRef } from 'react'

export default function InteractiveLightning() {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const mousePos = useRef({ x: 0, y: 0 })
  const lastMouseMove = useRef(0)
  const animationRef = useRef<number>()

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext('2d')
    if (!ctx) return

    // Lightning positions - will be initialized after canvas is ready
    const lightningPositions: Array<{x: number, y: number, delay: number}> = []

    // Set canvas size and initialize lightning positions
    const resizeCanvas = () => {
      canvas.width = canvas.offsetWidth
      canvas.height = canvas.offsetHeight

      // Initialize many potential lightning positions across the hero section
      if (lightningPositions.length === 0) {
        for (let i = 0; i < 30; i++) {
          lightningPositions.push({
            x: Math.random() * canvas.width,
            y: Math.random() * canvas.height,
            delay: Math.random() * 1000
          })
        }
      }
    }

    // Handle mouse movement
    const handleMouseMove = (e: MouseEvent) => {
      const rect = canvas.getBoundingClientRect()
      mousePos.current = {
        x: e.clientX - rect.left,
        y: e.clientY - rect.top
      }
      lastMouseMove.current = Date.now()
    }

    // Animation loop
    const animate = () => {
      if (!canvas.width || !canvas.height || lightningPositions.length === 0) {
        animationRef.current = requestAnimationFrame(animate)
        return
      }

      ctx.clearRect(0, 0, canvas.width, canvas.height)

      const now = Date.now()
      const timeSinceMouseMove = now - lastMouseMove.current
      const mouseInfluence = Math.max(0, 1 - timeSinceMouseMove / 1000)

      // Only draw when mouse is active
      if (mouseInfluence > 0.1) {
        // Draw energy field around mouse
        const gradient = ctx.createRadialGradient(
          mousePos.current.x, mousePos.current.y, 0,
          mousePos.current.x, mousePos.current.y, 150
        )
        gradient.addColorStop(0, `rgba(255, 255, 255, ${mouseInfluence * 0.2})`)
        gradient.addColorStop(1, 'rgba(255, 255, 255, 0)')
        ctx.fillStyle = gradient
        ctx.fillRect(0, 0, canvas.width, canvas.height)

        // Draw lightning bolts - only some activate randomly
        lightningPositions.forEach((pos, index) => {
          const dx = mousePos.current.x - pos.x
          const dy = mousePos.current.y - pos.y
          const distance = Math.sqrt(dx * dx + dy * dy)
          const influence = Math.max(0, 1 - distance / 400) * mouseInfluence

          // Add randomness so not all bolts hit at once
          const randomChance = Math.sin(now * 0.003 + pos.delay) * 0.5 + 0.5 // 0-1
          const shouldActivate = randomChance > 0.6 // Only 40% chance to be active

          if (influence > 0.08 && shouldActivate) {
            ctx.save()
            ctx.globalAlpha = influence
            ctx.strokeStyle = '#ffffff'
            ctx.lineWidth = 1 + influence * 3
            ctx.shadowColor = '#ffffff'
            ctx.shadowBlur = 10 + influence * 15

            // Draw jagged lightning bolt
            ctx.beginPath()
            let x = pos.x
            let y = pos.y
            ctx.moveTo(x, y)

            // Create lightning path toward mouse
            const segments = 6
            for (let i = 0; i < segments; i++) {
              const progress = (i + 1) / segments
              const targetX = pos.x + dx * progress
              const targetY = pos.y + dy * progress

              // Add randomness for jagged effect
              x = targetX + (Math.random() - 0.5) * 30
              y = targetY + (Math.random() - 0.5) * 30

              ctx.lineTo(x, y)

              // Add random branches
              if (Math.random() < 0.3) {
                const branchX = x + (Math.random() - 0.5) * 40
                const branchY = y + (Math.random() - 0.5) * 40
                ctx.moveTo(x, y)
                ctx.lineTo(branchX, branchY)
                ctx.moveTo(x, y)
              }
            }

            ctx.stroke()
            ctx.restore()
          }

          // Move lightning positions slowly
          pos.x += Math.sin(now * 0.001 + pos.delay) * 0.2
          pos.y += Math.cos(now * 0.001 + pos.delay) * 0.2

          // Wrap around screen
          if (pos.x < 0) pos.x = canvas.width
          if (pos.x > canvas.width) pos.x = 0
          if (pos.y < 0) pos.y = canvas.height
          if (pos.y > canvas.height) pos.y = 0
        })
      }

      animationRef.current = requestAnimationFrame(animate)
    }

    // Initialize
    resizeCanvas()
    window.addEventListener('resize', resizeCanvas)

    // Add mouse listener to parent section
    const parentElement = canvas.parentElement
    if (parentElement) {
      parentElement.addEventListener('mousemove', handleMouseMove)
    }

    animate()

    // Cleanup
    return () => {
      window.removeEventListener('resize', resizeCanvas)
      if (parentElement) {
        parentElement.removeEventListener('mousemove', handleMouseMove)
      }
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current)
      }
    }
  }, [])

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 w-full h-full pointer-events-none"
      style={{ opacity: 0.8 }}
    />
  )
}