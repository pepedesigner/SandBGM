export {}

declare global {
  interface Window {
    YT: typeof YT
    onYouTubeIframeAPIReady?: () => void
  }

  namespace YT {
    class Player {
      constructor(el: string | HTMLElement, options: PlayerOptions)
      playVideo(): void
      pauseVideo(): void
      loadVideoById(id: string): void
      cueVideoById(id: string): void
      getPlayerState(): number
      getCurrentTime(): number
      getDuration(): number
      seekTo(seconds: number, allowSeekAhead: boolean): void
      destroy(): void
    }

    interface PlayerOptions {
      width?: number
      height?: number
      videoId?: string
      playerVars?: Record<string, string | number>
      events?: {
        onReady?: (e: { target: Player }) => void
        onStateChange?: (e: { data: number; target: Player }) => void
      }
    }

    const PlayerState: {
      UNSTARTED: number
      ENDED: number
      PLAYING: number
      PAUSED: number
      BUFFERING: number
      CUED: number
    }
  }
}
