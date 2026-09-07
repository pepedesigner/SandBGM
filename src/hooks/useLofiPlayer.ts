import { useCallback, useEffect, useRef, useState } from 'react'
import { TRACKS, type Track } from '../tracks'

export type LofiPlayer = {
  ready: boolean
  track: Track
  playing: boolean
  liked: boolean
  current: number
  duration: number
  playPause: () => void
  play: () => void
  prev: () => void
  next: () => void
  surprise: () => void
  seek: (ratio: number) => void
  toggleLike: () => void
}

function loadApi(): Promise<void> {
  if (window.YT?.Player) return Promise.resolve()

  return new Promise((resolve) => {
    const prev = window.onYouTubeIframeAPIReady
    window.onYouTubeIframeAPIReady = () => {
      prev?.()
      resolve()
    }

    if (!document.querySelector('script[src="https://www.youtube.com/iframe_api"]')) {
      const script = document.createElement('script')
      script.src = 'https://www.youtube.com/iframe_api'
      document.head.appendChild(script)
    }
  })
}

export function useLofiPlayer(): LofiPlayer {
  const playerRef = useRef<YT.Player | null>(null)
  const indexRef = useRef(0)
  const hasStartedRef = useRef(false)
  const [ready, setReady] = useState(false)
  const [index, setIndex] = useState(0)
  const [playing, setPlaying] = useState(false)
  const [liked, setLiked] = useState(false)
  const [current, setCurrent] = useState(0)
  const [duration, setDuration] = useState(0)

  useEffect(() => {
    indexRef.current = index
  }, [index])

  useEffect(() => {
    let destroyed = false
    let player: YT.Player | null = null
    const host = document.createElement('div')
    host.setAttribute('aria-hidden', 'true')
    host.style.cssText =
      'position:fixed;width:200px;height:200px;left:0;bottom:0;opacity:0.01;pointer-events:none;z-index:-1'
    document.body.appendChild(host)

    const boot = async () => {
      await loadApi()
      if (destroyed) return

      player = new window.YT.Player(host, {
        width: 200,
        height: 200,
        videoId: TRACKS[0].videoId,
        playerVars: {
          autoplay: 1,
          mute: 0,
          controls: 0,
          disablekb: 1,
          fs: 0,
          modestbranding: 1,
          rel: 0,
          playsinline: 1,
          origin: window.location.origin,
        },
        events: {
          onReady: (event) => {
            if (destroyed) return
            playerRef.current = event.target
            try {
              event.target.getIframe().setAttribute('allow', 'autoplay; encrypted-media')
            } catch {
              /* iframe may not be ready */
            }
            setReady(true)
            setDuration(event.target.getDuration() || 0)
            event.target.unMute()
            event.target.setVolume(100)
            event.target.playVideo()
          },
          onStateChange: (event) => {
            if (destroyed) return
            const { PlayerState } = window.YT
            if (event.data === PlayerState.PLAYING) {
              hasStartedRef.current = true
              setPlaying(true)
              setDuration(event.target.getDuration() || 0)
            } else if (event.data === PlayerState.PAUSED) {
              setPlaying(false)
            } else if (event.data === PlayerState.ENDED) {
              const next = (indexRef.current + 1) % TRACKS.length
              indexRef.current = next
              setIndex(next)
              setLiked(false)
              setCurrent(0)
              event.target.loadVideoById(TRACKS[next].videoId)
            }
          },
        },
      })
    }

    void boot()

    return () => {
      destroyed = true
      playerRef.current = null
      try {
        player?.destroy()
      } catch {
        /* player may not be fully constructed */
      }
      host.remove()
    }
  }, [])

  useEffect(() => {
    if (!ready || hasStartedRef.current) return

    const start = () => {
      if (hasStartedRef.current) return
      const p = playerRef.current
      if (!p) return
      p.unMute()
      p.setVolume(100)
      p.playVideo()
    }

    start()
    const id = window.setTimeout(start, 400)
    const onGesture = () => start()
    window.addEventListener('pointerdown', onGesture, true)
    window.addEventListener('keydown', onGesture, true)
    window.addEventListener('touchstart', onGesture, true)

    return () => {
      window.clearTimeout(id)
      window.removeEventListener('pointerdown', onGesture, true)
      window.removeEventListener('keydown', onGesture, true)
      window.removeEventListener('touchstart', onGesture, true)
    }
  }, [ready, playing])

  useEffect(() => {
    if (!playing) return
    const id = window.setInterval(() => {
      const p = playerRef.current
      if (!p) return
      setCurrent(p.getCurrentTime() || 0)
      const d = p.getDuration() || 0
      if (d) setDuration(d)
    }, 250)
    return () => window.clearInterval(id)
  }, [playing])

  const play = useCallback(() => {
    playerRef.current?.playVideo()
  }, [])

  const playPause = useCallback(() => {
    const p = playerRef.current
    if (!p || !window.YT) return
    if (p.getPlayerState() === window.YT.PlayerState.PLAYING) p.pauseVideo()
    else p.playVideo()
  }, [])

  const loadIndex = useCallback((nextIndex: number) => {
    const next = (nextIndex + TRACKS.length) % TRACKS.length
    indexRef.current = next
    setIndex(next)
    setCurrent(0)
    setLiked(false)
    playerRef.current?.loadVideoById(TRACKS[next].videoId)
  }, [])

  const prev = useCallback(() => {
    const p = playerRef.current
    if (p && p.getCurrentTime() > 3) {
      p.seekTo(0, true)
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
    const p = playerRef.current
    const d = p?.getDuration() ?? 0
    if (!p || !d) return
    const t = Math.min(1, Math.max(0, ratio)) * d
    p.seekTo(t, true)
    setCurrent(t)
  }, [])

  const toggleLike = useCallback(() => setLiked((value) => !value), [])

  return {
    ready,
    track: TRACKS[index]!,
    playing,
    liked,
    current,
    duration,
    playPause,
    play,
    prev,
    next,
    surprise,
    seek,
    toggleLike,
  }
}
