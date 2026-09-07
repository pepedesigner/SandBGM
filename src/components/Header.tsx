function LogoMark() {
  return (
    <svg width="20" height="20" viewBox="0 0 256 256" fill="white" aria-hidden>
      <path d="M 256 256 L 128 256 C 198.692 256 256 198.692 256 128 C 256 57.308 198.692 0 128 0 C 57.308 0 0 57.308 0 128 C 0 198.692 57.308 256 128 256 L 0 256 L 0 0 L 256 0 Z M 128 104 C 141.255 104 152 114.745 152 128 C 152 141.255 141.255 152 128 152 C 114.745 152 104 141.255 104 128 C 104 114.745 114.745 104 128 104 Z" />
    </svg>
  )
}

export function Header() {
  return (
    <header className="absolute top-0 z-20 w-full">
      <div className="flex items-center px-4 py-4 sm:px-6 md:px-8">
        <a href="/" className="flex items-center gap-2">
          <LogoMark />
          <span className="text-base tracking-[0.06em] text-white">SandBGM</span>
        </a>
      </div>
    </header>
  )
}
