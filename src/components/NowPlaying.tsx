import { Heart, Pause, Play } from 'lucide-react'
import type { MouseEvent } from 'react'
import type { LofiPlayer } from '../hooks/useLofiPlayer'

function formatTime(seconds: number) {
  if (!Number.isFinite(seconds) || seconds < 0) return '0:00'
  const m = Math.floor(seconds / 60)
  const s = Math.floor(seconds % 60)
  return `${m}:${s.toString().padStart(2, '0')}`
}

const glassBtn =
  'liquid-glass text-sm text-white transition-transform duration-200 hover:scale-105 active:scale-95 disabled:opacity-50'

export function NowPlaying({
  ready,
  track,
  playing,
  liked,
  current,
  duration,
  playPause,
  prev,
  next,
  seek,
  toggleLike,
}: LofiPlayer) {
  const live = duration <= 0
  const progress = !live && duration > 0 ? Math.min(1, current / duration) : playing ? 0.3 : 0
  const remaining = live ? 0 : Math.max(0, duration - current)

  const onBarClick = (event: MouseEvent<HTMLButtonElement>) => {
    if (live) return
    const rect = event.currentTarget.getBoundingClientRect()
    seek((event.clientX - rect.left) / rect.width)
  }

  return (
    <div className="animate-fade-up delay-5 absolute right-4 bottom-4 z-40 flex w-full max-w-[270px] flex-col gap-2 sm:right-6 sm:bottom-6 sm:w-72 sm:max-w-none md:right-10 md:bottom-8">
      <div className="liquid-glass flex items-center gap-3 rounded-2xl p-2.5 pr-4">
        <button
          type="button"
          onClick={playPause}
          disabled={!ready}
          aria-label={playing ? 'Pause' : 'Play'}
          className={`${glassBtn} flex h-11 w-11 shrink-0 items-center justify-center rounded-xl`}
        >
          {playing ? (
            <Pause size={18} strokeWidth={2.5} />
          ) : (
            <Play size={18} strokeWidth={2.5} className="translate-x-[1px]" />
          )}
        </button>

        <div className="min-w-0 flex-1">
          <p className="truncate text-sm text-white">
            {track.artist} -- {track.title}
          </p>
          <button
            type="button"
            className="mt-1.5 block h-1 w-full rounded-full bg-white/20"
            onClick={onBarClick}
            aria-label="Seek"
            disabled={live}
          >
            <span
              className="block h-1 rounded-full bg-white/80"
              style={{ width: `${Math.round(progress * 100)}%` }}
            />
          </button>
          <div className="mt-1 flex justify-between text-[10px] text-white/60">
            {live ? (
              <>
                <span>{playing ? 'LIVE' : 'Radio'}</span>
                <span>Lofi Girl</span>
              </>
            ) : (
              <>
                <span>{formatTime(current)}</span>
                <span>-{formatTime(remaining)}</span>
              </>
            )}
          </div>
        </div>
      </div>

      <div className="flex items-center gap-2">
        <button
          type="button"
          onClick={prev}
          disabled={!ready}
          className={`${glassBtn} flex-1 rounded-xl py-2.5`}
        >
          Prev
        </button>
        <button
          type="button"
          onClick={toggleLike}
          aria-label={liked ? 'Unlike' : 'Like'}
          aria-pressed={liked}
          className={`${glassBtn} flex h-10 w-10 items-center justify-center rounded-full hover:scale-110`}
        >
          <Heart size={16} className={liked ? 'fill-white text-white' : 'text-white'} />
        </button>
        <button
          type="button"
          onClick={next}
          disabled={!ready}
          className={`${glassBtn} flex-1 rounded-xl py-2.5`}
        >
          Next
        </button>
      </div>
    </div>
  )
}
