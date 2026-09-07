import { useCallback, useEffect, useRef, useState } from 'react'
import { TRACKS, trackSrc, type Track } from '../tracks'

export type LofiPlayer = {
  ready: boolean
  track: Track
  index: number
  playing: boolean
  liked: boolean
  likedIds: string[]
  current: number
  duration: number
  playPause: () => void
  play: () => void
  playAt: (index: number) => void
  prev: () => void
  next: () => void
  surprise: () => void
  seek: (ratio: number) => void
  toggleLike: () => void
}

const LIKED_KEY = 'sandbgm.liked'

function readLikedIds(): string[] {
  try {
    const raw = localStorage.getItem(LIKED_KEY)
    const parsed: unknown = raw ? JSON.parse(raw) : []
    return Array.isArray(parsed) ? parsed.filter((id) => typeof id === 'string') : []
  } catch {
    return []
  }
}

export function useLofiPlayer(): LofiPlayer {
  const audioRef = useRef<HTMLAudioElement | null>(null)
  const indexRef = useRef(0)
  const [ready, setReady] = useState(false)
  const [index, setIndex] = useState(0)
  const [playing, setPlaying] = useState(false)
  const [likedIds, setLikedIds] = useState<string[]>(readLikedIds)
  const [current, setCurrent] = useState(0)
  const [duration, setDuration] = useState(0)

  useEffect(() => {
    indexRef.current = index
  }, [index])

  useEffect(() => {
    const audio = new Audio()
    // Do NOT set crossOrigin: FMA /stream/ uses a 302 redirect chain where
    // the first hop lacks CORS headers — the browser would abort the load.
    // We don't use Web Audio API, so crossOrigin is not needed.
    audio.preload = 'auto'
    audioRef.current = audio

    let autoplayAttempted = false
    const tryAutoplay = () => {
      if (autoplayAttempted) return
      autoplayAttempted = true
      void audio.play().catch(() => {
        /* autoplay blocked — user gesture needed, handled by UI */
      })
    }

    const onCanPlay = () => {
      setReady(true)
      tryAutoplay()
    }
    const onTimeUpdate = () => setCurrent(audio.currentTime)
    const onDurationChange = () => {
      if (Number.isFinite(audio.duration)) setDuration(audio.duration)
    }
    const onPlay = () => setPlaying(true)
    const onPause = () => setPlaying(false)
    const onEnded = () => {
      const next = (indexRef.current + 1) % TRACKS.length
      indexRef.current = next
      setIndex(next)
      setCurrent(0)
      setDuration(0)
      audio.src = trackSrc(TRACKS[next].handle)
      void audio.play()
    }

    audio.addEventListener('canplay', onCanPlay)
    audio.addEventListener('timeupdate', onTimeUpdate)
    audio.addEventListener('durationchange', onDurationChange)
    audio.addEventListener('play', onPlay)
    audio.addEventListener('pause', onPause)
    audio.addEventListener('ended', onEnded)

    audio.src = trackSrc(TRACKS[0].handle)

    return () => {
      audio.removeEventListener('canplay', onCanPlay)
      audio.removeEventListener('timeupdate', onTimeUpdate)
      audio.removeEventListener('durationchange', onDurationChange)
      audio.removeEventListener('play', onPlay)
      audio.removeEventListener('pause', onPause)
      audio.removeEventListener('ended', onEnded)
      audio.pause()
      audio.src = ''
      audioRef.current = null
    }
  }, [])

  const play = useCallback(() => {
    void audioRef.current?.play()
  }, [])

  const playPause = useCallback(() => {
    const audio = audioRef.current
    if (!audio) return
    if (audio.paused) void audio.play()
    else audio.pause()
  }, [])

  const loadIndex = useCallback((nextIndex: number) => {
    const next = (nextIndex + TRACKS.length) % TRACKS.length
    indexRef.current = next
    setIndex(next)
    setCurrent(0)
    setDuration(0)
    const audio = audioRef.current
    if (!audio) return
    audio.src = trackSrc(TRACKS[next].handle)
    // load() resets the element for the new src before play()
    audio.load()
    void audio.play()
  }, [])

  const playAt = useCallback(
    (i: number) => {
      if (i === indexRef.current) {
        void audioRef.current?.play()
        return
      }
      loadIndex(i)
    },
    [loadIndex],
  )

  const prev = useCallback(() => {
    const audio = audioRef.current
    if (audio && audio.currentTime > 3) {
      audio.currentTime = 0
      setCurrent(0)
      return
    }
    loadIndex(indexRef.current - 1)
  }, [loadIndex])

  const next = useCallback(() => loadIndex(indexRef.current + 1), [loadIndex])

  const surprise = useCallback(() => {
    if (TRACKS.length < 2) {
      loadIndex(indexRef.current)
      return
    }
    let pick = indexRef.current
    while (pick === indexRef.current) {
      pick = Math.floor(Math.random() * TRACKS.length)
    }
    loadIndex(pick)
  }, [loadIndex])

  const seek = useCallback((ratio: number) => {
    const audio = audioRef.current
    if (!audio || !Number.isFinite(audio.duration) || audio.duration <= 0) return
    const t = Math.min(1, Math.max(0, ratio)) * audio.duration
    audio.currentTime = t
    setCurrent(t)
  }, [])

  const toggleLike = useCallback(() => {
    const handle = TRACKS[indexRef.current]?.handle
    if (!handle) return
    setLikedIds((prev) => {
      const next = prev.includes(handle) ? prev.filter((item) => item !== handle) : [...prev, handle]
      try {
        localStorage.setItem(LIKED_KEY, JSON.stringify(next))
      } catch {
        /* private mode */
      }
      return next
    })
  }, [])

  const track = TRACKS[index]!

  return {
    ready,
    track,
    index,
    playing,
    liked: likedIds.includes(track.handle),
    likedIds,
    current,
    duration,
    playPause,
    play,
    playAt,
    prev,
    next,
    surprise,
    seek,
    toggleLike,
  }
}
