import { BoomerangVideoBg } from './components/BoomerangVideoBg'
import { Header } from './components/Header'
import { Hero } from './components/Hero'
import { NowPlaying } from './components/NowPlaying'
import { useLofiPlayer } from './hooks/useLofiPlayer'

export default function App() {
  const player = useLofiPlayer()

  return (
    <div className="relative h-screen w-full overflow-hidden">
      <BoomerangVideoBg />
      <Header />
      <Hero onSurprise={player.surprise} />
      <NowPlaying {...player} />
    </div>
  )
}
