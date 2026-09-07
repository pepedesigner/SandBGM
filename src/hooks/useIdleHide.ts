import { useEffect, useState } from 'react'

const EVENTS = ['pointermove', 'pointerdown', 'keydown', 'touchstart', 'wheel'] as const

export function useIdleHide(delayMs = 3_000, paused = false) {
  const [idle, setIdle] = useState(false)

  useEffect(() => {
    if (paused) {
      setIdle(false)
      return
    }

    let timeout = window.setTimeout(() => setIdle(true), delayMs)

    const bump = () => {
      setIdle(false)
      window.clearTimeout(timeout)
      timeout = window.setTimeout(() => setIdle(true), delayMs)
    }

    for (const event of EVENTS) {
      window.addEventListener(event, bump, { passive: true })
    }

    return () => {
      window.clearTimeout(timeout)
      for (const event of EVENTS) {
        window.removeEventListener(event, bump)
      }
    }
  }, [delayMs, paused])

  return idle
}
