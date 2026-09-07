import { useCallback, useState } from 'react'
import { BACKGROUNDS, readBackgroundIndex, writeBackgroundIndex } from './backgrounds'
import { BackgroundSwitch } from './components/BackgroundSwitch'
import { BoomerangVideoBg } from './components/BoomerangVideoBg'
import { Header } from './components/Header'
import { Hero } from './components/Hero'
import { Library } from './components/Library'
import { NowPlaying } from './components/NowPlaying'
import { useIdleHide } from './hooks/useIdleHide'
import { useLofiPlayer } from './hooks/useLofiPlayer'

export default function App() {
  const player = useLofiPlayer()
  const [libraryOpen, setLibraryOpen] = useState(false)
  const [bgIndex, setBgIndex] = useState(readBackgroundIndex)
  const idle = useIdleHide(3_000, libraryOpen)

  const shiftBackground = useCallback((delta: number) => {
    setBgIndex((current) => {
      const next = (current + delta + BACKGROUNDS.length) % BACKGROUNDS.length
      writeBackgroundIndex(next)
      return next
    })
  }, [])

  return (
    <div
      className={`relative h-screen w-full overflow-hidden ${idle ? 'cursor-none' : ''}`}
    >
      <BoomerangVideoBg key={BACKGROUNDS[bgIndex]} src={BACKGROUNDS[bgIndex]!} />
      <div className="ui-chrome" data-idle={idle ? 'true' : 'false'}>
        <Header />
        <Hero onBrowse={() => setLibraryOpen(true)} onSurprise={player.surprise} />
        {!libraryOpen ? (
          <BackgroundSwitch onPrev={() => shiftBackground(-1)} onNext={() => shiftBackground(1)} />
        ) : null}
        <NowPlaying {...player} />
      </div>
      <Library
        open={libraryOpen}
        currentIndex={player.index}
        playing={player.playing}
        likedIds={player.likedIds}
        onClose={() => setLibraryOpen(false)}
        onPlayAt={player.playAt}
      />
    </div>
  )
}
