'use client'

import { useEffect, useRef } from 'react'

type ElectricProps = {
  /** Lower = denser sparks. px of width per spark. */
  sparkDensity?: number
  /** Jitter amplitude for bolts (px). Bigger = wilder lightning. */
  boltJitter?: number
  /** [min,max] ms between ambient bolts. */
  boltInterval?: [number, number]
  /** Allow tall diagonal bolts (hero) vs flat ones (bar). */
  tall?: boolean
  /** Overall opacity ceiling. */
  intensity?: number
  /** Track the cursor on window (for fixed full-page layers) instead of parent. */
  trackWindow?: boolean
}

/**
 * Ambient electric background — a revival of the old InteractiveLightning,
 * generalized so it can run subtle in the header bar or cranked up in a hero.
 *
 * Alive on its own (drifting sparks + crackling bolts) and intensifies toward
 * the cursor. Honors prefers-reduced-motion.
 */
export default function HeaderElectric({
  sparkDensity = 45,
  boltJitter = 9,
  boltInterval = [900, 2700],
  tall = false,
  intensity = 1,
  trackWindow = false,
}: ElectricProps = {}) {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const mouse = useRef({ x: -9999, y: 0, t: 0 })
  const raf = useRef<number>(0)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')
    if (!ctx) return

    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    const YELLOW = '#F5C518'
    const dpr = Math.min(window.devicePixelRatio || 1, 2)

    type Spark = { x: number; y: number; vx: number; vy: number; r: number; phase: number }
    let sparks: Spark[] = []

    const resize = () => {
      const w = canvas.offsetWidth
      const h = canvas.offsetHeight
      canvas.width = w * dpr
      canvas.height = h * dpr
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0)
      const count = Math.max(10, Math.round(w / sparkDensity))
      sparks = Array.from({ length: count }, () => ({
        x: Math.random() * w,
        y: Math.random() * h,
        vx: (Math.random() - 0.5) * 0.3,
        vy: (Math.random() - 0.5) * 0.2,
        r: Math.random() * 1.4 + 0.4,
        phase: Math.random() * Math.PI * 2,
      }))
    }

    const bolt = (x1: number, y1: number, x2: number, y2: number, alpha: number, width = 1.2) => {
      const seg = 7
      ctx.save()
      ctx.globalAlpha = Math.min(1, alpha * intensity)
      ctx.strokeStyle = YELLOW
      ctx.lineWidth = width
      ctx.shadowColor = YELLOW
      ctx.shadowBlur = 10
      ctx.beginPath()
      ctx.moveTo(x1, y1)
      for (let i = 1; i <= seg; i++) {
        const p = i / seg
        const jx = (Math.random() - 0.5) * boltJitter
        const jy = (Math.random() - 0.5) * boltJitter
        ctx.lineTo(x1 + (x2 - x1) * p + jx, y1 + (y2 - y1) * p + jy)
        // occasional branch for drama
        if (tall && Math.random() < 0.25) {
          ctx.lineTo(x1 + (x2 - x1) * p + jx + (Math.random() - 0.5) * boltJitter * 2, y1 + (y2 - y1) * p + jy + Math.random() * boltJitter)
          ctx.moveTo(x1 + (x2 - x1) * p + jx, y1 + (y2 - y1) * p + jy)
        }
      }
      ctx.stroke()
      ctx.restore()
    }

    let last = 0
    let boltTimer = 0
    const draw = (now: number) => {
      const w = canvas.offsetWidth
      const h = canvas.offsetHeight
      const dt = Math.min(now - last, 50)
      last = now
      ctx.clearRect(0, 0, w, h)

      const mInf = now - mouse.current.t < 1200 ? Math.max(0, 1 - (now - mouse.current.t) / 1200) : 0

      for (const s of sparks) {
        s.x += s.vx * dt
        s.y += s.vy * dt
        s.phase += 0.04
        if (s.x < 0) s.x = w
        if (s.x > w) s.x = 0
        if (s.y < 0) s.y = h
        if (s.y > h) s.y = 0

        const twinkle = 0.35 + 0.35 * Math.sin(s.phase)
        let near = 0
        if (mInf > 0) {
          const dx = s.x - mouse.current.x
          const dy = s.y - mouse.current.y
          near = Math.max(0, 1 - Math.sqrt(dx * dx + dy * dy) / 150) * mInf
        }
        ctx.save()
        ctx.globalAlpha = Math.min(1, (twinkle * 0.5 + near * 0.9) * intensity)
        ctx.fillStyle = YELLOW
        ctx.shadowColor = YELLOW
        ctx.shadowBlur = 6 + near * 10
        ctx.beginPath()
        ctx.arc(s.x, s.y, s.r + near * 1.4, 0, Math.PI * 2)
        ctx.fill()
        ctx.restore()

        if (near > 0.3 && Math.random() < 0.08) {
          bolt(s.x, s.y, mouse.current.x, mouse.current.y, near * 0.8, 1.4)
        }
      }

      boltTimer -= dt
      if (boltTimer <= 0 && !reduced) {
        boltTimer = boltInterval[0] + Math.random() * (boltInterval[1] - boltInterval[0])
        if (tall) {
          // dramatic diagonal bolt crossing the hero
          const x1 = Math.random() * w
          const x2 = x1 + (Math.random() - 0.5) * w * 0.6
          bolt(x1, -10, x2, h * (0.5 + Math.random() * 0.5), 0.55, 1.6)
        } else {
          const y = Math.random() * h
          const x1 = Math.random() * w * 0.4
          const x2 = x1 + w * (0.25 + Math.random() * 0.35)
          bolt(x1, y, x2, y + (Math.random() - 0.5) * 6, 0.5)
        }
      }

      raf.current = requestAnimationFrame(draw)
    }

    resize()
    window.addEventListener('resize', resize)
    const parent = canvas.parentElement
    const moveTarget: Window | HTMLElement | null = trackWindow ? window : parent
    const onMove = (e: MouseEvent) => {
      const rect = canvas.getBoundingClientRect()
      mouse.current = { x: e.clientX - rect.left, y: e.clientY - rect.top, t: performance.now() }
    }
    moveTarget?.addEventListener('mousemove', onMove as EventListener)

    if (reduced) {
      const w = canvas.offsetWidth, h = canvas.offsetHeight
      ctx.clearRect(0, 0, w, h)
      for (const s of sparks) {
        ctx.globalAlpha = 0.3 * intensity
        ctx.fillStyle = YELLOW
        ctx.beginPath()
        ctx.arc(s.x, s.y, s.r, 0, Math.PI * 2)
        ctx.fill()
      }
    } else {
      raf.current = requestAnimationFrame(draw)
    }

    return () => {
      window.removeEventListener('resize', resize)
      moveTarget?.removeEventListener('mousemove', onMove as EventListener)
      cancelAnimationFrame(raf.current)
    }
  }, [sparkDensity, boltJitter, boltInterval, tall, intensity, trackWindow])

  return <canvas ref={canvasRef} className="pointer-events-none absolute inset-0 h-full w-full" aria-hidden />
}
