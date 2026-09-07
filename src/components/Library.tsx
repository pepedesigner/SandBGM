import { Heart, Play, X } from 'lucide-react'
import { useEffect } from 'react'
import { TRACKS } from '../tracks'

type LibraryProps = {
  open: boolean
  currentIndex: number
  playing: boolean
  likedIds: string[]
  onClose: () => void
  onPlayAt: (index: number) => void
}

export function Library({
  open,
  currentIndex,
  playing,
  likedIds,
  onClose,
  onPlayAt,
}: LibraryProps) {
  useEffect(() => {
    if (!open) return
    const onKey = (event: KeyboardEvent) => {
      if (event.key === 'Escape') onClose()
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [open, onClose])

  if (!open) return null

  return (
    <div className="absolute inset-0 z-30 flex items-center justify-center px-4 pb-36 pt-20 sm:px-6">
      <button
        type="button"
        className="absolute inset-0 bg-black/35"
        aria-label="Close library"
        onClick={onClose}
      />

      <div
        role="dialog"
        aria-modal="true"
        aria-labelledby="library-title"
        className="animate-fade-up liquid-glass relative flex max-h-[min(70vh,32rem)] w-full max-w-lg flex-col rounded-3xl"
      >
        <div className="flex items-center justify-between gap-4 px-5 py-4">
          <div className="text-left">
            <h2 id="library-title" className="text-lg tracking-wide text-white">
              Library
            </h2>
            <p className="mt-0.5 text-xs text-white/60">{TRACKS.length} mixes · Lofi Girl</p>
          </div>
          <button
            type="button"
            onClick={onClose}
            aria-label="Close"
            className="liquid-glass flex h-9 w-9 items-center justify-center rounded-xl text-white transition-transform duration-200 hover:scale-105 active:scale-95"
          >
            <X size={18} />
          </button>
        </div>

        <ul className="min-h-0 flex-1 overflow-y-auto px-2 pb-3">
          {TRACKS.map((track, i) => {
            const active = i === currentIndex
            const liked = likedIds.includes(track.videoId)
            return (
              <li key={track.videoId}>
                <button
                  type="button"
                  onClick={() => onPlayAt(i)}
                  className={`flex w-full items-center gap-3 rounded-2xl px-3 py-2.5 text-left transition-colors duration-150 ${
                    active ? 'bg-white/12' : 'hover:bg-white/8'
                  }`}
                >
                  <img
                    src={`https://i.ytimg.com/vi/${track.videoId}/mqdefault.jpg`}
                    alt=""
                    className="h-10 w-16 shrink-0 rounded-lg object-cover"
                  />
                  <span className="min-w-0 flex-1">
                    <span className="block truncate text-sm text-white">{track.title}</span>
                    <span className="mt-0.5 block truncate text-xs text-white/55">{track.artist}</span>
                  </span>
                  {liked ? (
                    <Heart size={14} className="shrink-0 fill-white text-white" />
                  ) : null}
                  {active && playing ? (
                    <span className="shrink-0 text-[10px] tracking-wide text-white/70">Now</span>
                  ) : (
                    <Play size={14} className="shrink-0 text-white/40" />
                  )}
                </button>
              </li>
            )
          })}
        </ul>
      </div>
    </div>
  )
}
