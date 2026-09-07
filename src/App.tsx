import { useState } from 'react'
import { BoomerangVideoBg } from './components/BoomerangVideoBg'
import { Header } from './components/Header'
import { Hero } from './components/Hero'
import { Library } from './components/Library'
import { NowPlaying } from './components/NowPlaying'
import { useLofiPlayer } from './hooks/useLofiPlayer'

export default function App() {
  const player = useLofiPlayer()
  const [libraryOpen, setLibraryOpen] = useState(false)

  return (
    <div className="relative h-screen w-full overflow-hidden">
      <BoomerangVideoBg />
      <Header />
      <Hero onBrowse={() => setLibraryOpen(true)} onSurprise={player.surprise} />
      <Library
        open={libraryOpen}
        currentIndex={player.index}
        playing={player.playing}
        likedIds={player.likedIds}
        onClose={() => setLibraryOpen(false)}
        onPlayAt={player.playAt}
      />
      <NowPlaying {...player} />
    </div>
  )
}
