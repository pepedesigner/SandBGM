export type Track = {
  /** FMA stream path: https://freemusicarchive.org/track/{handle}/stream/ */
  handle: string
  title: string
  artist: string
  license: string
}

/** Lofi Beats tracks from Free Music Archive (CC licensed, no ads). */
export const TRACKS: Track[] = [
  {
    handle: 'lofi-chill-hop-20-min-mix',
    title: 'Lofi Chill Hop — 20 min Mix',
    artist: 'Ketsa',
    license: 'CC BY-NC-ND',
  },
  {
    handle: 'lofi-hip-hop-mix-2',
    title: 'Lofi Hip-Hop Mix 2',
    artist: 'Ketsa',
    license: 'CC BY-NC-ND',
  },
  {
    handle: 'lofi-soul-hip-hop-mix-3',
    title: 'Lofi Soul Hip-Hop Mix 3',
    artist: 'Ketsa',
    license: 'CC BY-NC-ND',
  },
  {
    handle: 'lofi-hip-hop-mix-4',
    title: 'Lofi Hip-Hop Mix 4',
    artist: 'Ketsa',
    license: 'CC BY-NC-ND',
  },
  {
    handle: 'coffee-shop-vinyl-hip-hop',
    title: 'Coffee Shop Vinyl Hip-Hop',
    artist: 'BlackTrendMusic',
    license: 'CC BY',
  },
  {
    handle: 'chill-hip-hop-1',
    title: 'Chill Hip-Hop',
    artist: 'BlackTrendMusic',
    license: 'CC BY',
  },
  {
    handle: 'abstract-chill',
    title: 'Abstract Chill',
    artist: 'BlackTrendMusic',
    license: 'CC BY',
  },
  {
    handle: 'lofi-and-coffee',
    title: 'Lofi and Coffee',
    artist: 'Brentin Davis',
    license: 'CC BY',
  },
  {
    handle: 'lofi-late-night',
    title: 'Lofi Late Night',
    artist: 'Brentin Davis',
    license: 'CC BY',
  },
  {
    handle: 'jazzy-lofi-beat-in-dmmp3',
    title: 'Jazzy Lofi Beat in Dm',
    artist: 'ImprovizBackingTrack',
    license: 'CC BY',
  },
]

export function trackSrc(handle: string): string {
  return `https://freemusicarchive.org/track/${handle}/stream/`
}
