import { useEffect, useRef, useState } from 'react'

const MAX_WIDTH = 960
const MAX_FRAMES = 150
const FPS = 30

function captureFrame(video: HTMLVideoElement) {
  if (!video.videoWidth) return null
  const scale = Math.min(1, MAX_WIDTH / video.videoWidth)
  const canvas = document.createElement('canvas')
  canvas.width = Math.round(video.videoWidth * scale)
  canvas.height = Math.round(video.videoHeight * scale)
  const ctx = canvas.getContext('2d')
  ctx?.drawImage(video, 0, 0, canvas.width, canvas.height)
  return canvas
}

export function BoomerangVideoBg({ src }: { src: string }) {
  const videoRef = useRef<HTMLVideoElement>(null)
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const framesRef = useRef<HTMLCanvasElement[]>([])
  const [mode, setMode] = useState<'video' | 'canvas'>('video')

  useEffect(() => {
    const video = videoRef.current
    if (!video) return

    const frames: HTMLCanvasElement[] = []
    let rvfcId = 0
    let rafId = 0
    let stopped = false

    const finish = () => {
      if (stopped) return
      stopped = true
      if ('cancelVideoFrameCallback' in video && rvfcId) {
        video.cancelVideoFrameCallback(rvfcId)
      }
      cancelAnimationFrame(rafId)
      if (frames.length === 0) {
        const last = captureFrame(video)
        if (last) frames.push(last)
      }
      framesRef.current = frames
      setMode('canvas')
    }

    const grab = () => {
      if (frames.length >= MAX_FRAMES) {
        finish()
        return
      }
      const frame = captureFrame(video)
      if (frame) frames.push(frame)
    }

    const onVideoFrame = () => {
      if (stopped) return
      grab()
      if ('requestVideoFrameCallback' in video) {
        rvfcId = video.requestVideoFrameCallback(onVideoFrame)
      }
    }

    const onPlay = () => {
      if ('requestVideoFrameCallback' in video) {
        rvfcId = video.requestVideoFrameCallback(onVideoFrame)
        return
      }
      const loop = () => {
        if (stopped) return
        grab()
        rafId = requestAnimationFrame(loop)
      }
      rafId = requestAnimationFrame(loop)
    }

    const onEnded = () => finish()

    video.addEventListener('play', onPlay)
    video.addEventListener('ended', onEnded)
    video.play().catch(() => {
      /* autoplay can fail; background stays on the first frame */
    })

    return () => {
      stopped = true
      video.removeEventListener('play', onPlay)
      video.removeEventListener('ended', onEnded)
      if ('cancelVideoFrameCallback' in video && rvfcId) {
        video.cancelVideoFrameCallback(rvfcId)
      }
      cancelAnimationFrame(rafId)
    }
  }, [src])

  useEffect(() => {
    if (mode !== 'canvas') return
    const canvas = canvasRef.current
    const frames = framesRef.current
    if (!canvas || frames.length === 0) return

    const ctx = canvas.getContext('2d')
    canvas.width = frames[0].width
    canvas.height = frames[0].height

    let i = 0
    let dir = 1
    let last = performance.now()
    let raf = 0

    const tick = (now: number) => {
      raf = requestAnimationFrame(tick)
      if (now - last < 1000 / FPS) return
      last = now
      const frame = frames[i]
      if (frame) ctx?.drawImage(frame, 0, 0)
      if (frames.length < 2) return
      i += dir
      if (i >= frames.length - 1) dir = -1
      if (i <= 0) dir = 1
    }

    raf = requestAnimationFrame(tick)
    return () => cancelAnimationFrame(raf)
  }, [mode])

  return (
    <div className="absolute inset-0 z-0 origin-center scale-[1.08] overflow-hidden bg-black">
      <video
        ref={videoRef}
        className={`h-full w-full object-cover ${mode === 'canvas' ? 'hidden' : ''}`}
        src={src}
        muted
        playsInline
        crossOrigin="anonymous"
        preload="auto"
      />
      <canvas
        ref={canvasRef}
        className={`h-full w-full object-cover ${mode === 'video' ? 'hidden' : ''}`}
      />
    </div>
  )
}
