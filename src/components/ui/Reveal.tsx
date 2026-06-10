'use client'

import { useEffect, useRef, useState, type ReactNode, type ElementType } from 'react'

type RevealProps = {
  children: ReactNode
  /** Stagger delay in ms applied to the reveal transition. */
  delay?: number
  /** Render as a different element (default: div). */
  as?: ElementType
  className?: string
}

/**
 * Reveals its children once they scroll into view. Uses a single
 * IntersectionObserver per instance and disconnects after the first reveal,
 * so it never re-triggers. Honors prefers-reduced-motion via globals.css.
 */
export default function Reveal({ children, delay = 0, as: Tag = 'div', className = '' }: RevealProps) {
  const ref = useRef<HTMLElement>(null)
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    const el = ref.current
    if (!el) return

    // Reveal immediately if it's already on screen at mount (above the fold) —
    // don't wait for the observer to tick, or in-view content can stay hidden.
    const inView = () => {
      const r = el.getBoundingClientRect()
      return r.top < (window.innerHeight || 0) && r.bottom > 0
    }
    if (inView()) {
      setVisible(true)
      return
    }

    const obs = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          setVisible(true)
          obs.disconnect()
        }
      },
      { threshold: 0.12, rootMargin: '0px 0px -40px 0px' }
    )
    obs.observe(el)
    return () => obs.disconnect()
  }, [])

  return (
    <Tag
      ref={ref}
      className={`reveal ${visible ? 'is-visible' : ''} ${className}`}
      style={{ ['--reveal-delay' as string]: `${delay}ms` }}
    >
      {children}
    </Tag>
  )
}
