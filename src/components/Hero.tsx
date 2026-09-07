type HeroProps = {
  onBrowse: () => void
  onSurprise: () => void
}

export function Hero({ onBrowse, onSurprise }: HeroProps) {
  return (
    <div className="relative z-10 flex h-full flex-col items-center px-4 pt-20 text-center sm:px-6 sm:pt-28 md:pt-32">
      <div
        className="liquid-glass animate-fade-up delay-1 mb-5 w-fit rounded-lg px-4 py-1.5 text-xs text-white sm:mb-6 sm:text-sm"
        style={{ background: 'rgba(255, 255, 255, 0.16)' }}
      >
        Station 01 · Lofi Girl
      </div>

      <h1 className="animate-fade-up delay-2 max-w-xl text-[1.75rem] leading-[1.3] tracking-[0.01em] text-white sm:text-3xl md:text-4xl">
        Background music
        <br />
        for a quieter desk.
      </h1>

      <p className="animate-fade-up delay-3 mt-5 max-w-md text-sm leading-relaxed text-white/90 sm:mt-6 sm:text-base">
        Study sessions, rainy radios, and late-night mixes from Lofi Girl. Press play, then leave it
        on while you work.
      </p>

      <div className="animate-fade-up delay-4 mt-8 flex w-full max-w-md flex-col items-center justify-center gap-3 sm:flex-row">
        <button
          type="button"
          onClick={onBrowse}
          className="rounded-xl bg-white px-7 py-2.5 text-sm text-gray-900 transition-transform duration-200 hover:scale-105 active:scale-95"
        >
          Browse Library
        </button>
        <button
          type="button"
          onClick={onSurprise}
          className="liquid-glass rounded-xl px-7 py-2.5 text-sm text-white transition-transform duration-200 hover:scale-105 active:scale-95"
        >
          Surprise me
        </button>
      </div>
    </div>
  )
}
