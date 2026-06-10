'use client'

import { useEffect, useRef, useState } from 'react'

type CountUpProps = {
  /** The target number to count to. */
  end: number
  /** Text rendered after the number, e.g. "+" or "★". */
  suffix?: string
  /** Decimal places to show (used for ratings like 4.9). */
  decimals?: number
  /** Duration of the count animation in ms. */
  duration?: number
  className?: string
}

const prefersReducedMotion = () =>
  typeof window !== 'undefined' &&
  window.matchMedia('(prefers-reduced-motion: reduce)').matches

/**
 * Counts from 0 up to `end` the first time it scrolls into view.
 * Falls back to the final value instantly under reduced-motion.
 */
export default function CountUp({
  end,
  suffix = '',
  decimals = 0,
  duration = 1400,
  className = '',
}: CountUpProps) {
  const ref = useRef<HTMLSpanElement>(null)
  const [value, setValue] = useState(0)
  const started = useRef(false)

  useEffect(() => {
    const el = ref.current
    if (!el) return

    const run = () => {
      if (started.current) return
      started.current = true

      if (prefersReducedMotion()) {
        setValue(end)
        return
      }

      const start = performance.now()
      const tick = (now: number) => {
        const t = Math.min((now - start) / duration, 1)
        // easeOutCubic for a natural settle
        const eased = 1 - Math.pow(1 - t, 3)
        setValue(end * eased)
        if (t < 1) requestAnimationFrame(tick)
        else setValue(end)
      }
      requestAnimationFrame(tick)
    }

    const obs = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          run()
          obs.disconnect()
        }
      },
      { threshold: 0.3 }
    )
    obs.observe(el)
    return () => obs.disconnect()
  }, [end, duration])

  const display = decimals > 0 ? value.toFixed(decimals) : Math.round(value).toLocaleString()

  return (
    <span ref={ref} className={className}>
      {display}
      {suffix}
    </span>
  )
}
