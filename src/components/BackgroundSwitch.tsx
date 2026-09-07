import { ChevronLeft, ChevronRight } from 'lucide-react'

type BackgroundSwitchProps = {
  onPrev: () => void
  onNext: () => void
}

const btn =
  'liquid-glass pointer-events-auto flex h-11 w-11 items-center justify-center rounded-xl text-white transition-transform duration-200 hover:scale-105 active:scale-95'

export function BackgroundSwitch({ onPrev, onNext }: BackgroundSwitchProps) {
  return (
    <>
      <div className="pointer-events-none fixed inset-y-0 left-3 z-20 flex items-center sm:left-5">
        <button
          type="button"
          aria-label="Previous background"
          onClick={onPrev}
          className={btn}
          style={{ background: 'rgba(255, 255, 255, 0.16)' }}
        >
          <ChevronLeft size={22} strokeWidth={1.75} />
        </button>
      </div>
      <div className="pointer-events-none fixed inset-y-0 right-3 z-20 flex items-center sm:right-5">
        <button
          type="button"
          aria-label="Next background"
          onClick={onNext}
          className={btn}
          style={{ background: 'rgba(255, 255, 255, 0.16)' }}
        >
          <ChevronRight size={22} strokeWidth={1.75} />
        </button>
      </div>
    </>
  )
}
