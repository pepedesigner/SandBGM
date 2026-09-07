export type Track = {
  /** FMA stream path: https://freemusicarchive.org/track/{handle}/stream/ */
  handle: string
  title: string
  artist: string
  license: string
}

/** Lo-fi Hip-Hop & Instrumental tracks from Free Music Archive (CC licensed, no ads). */
export const TRACKS: Track[] = [
  {
    handle: 'sign-it-off',
    title: 'Sign it Off',
    artist: 'Ketsa',
    license: 'CC BY-NC-ND',
  },
  {
    handle: 'if-tides-washed-us',
    title: 'If Tides Washed Us',
    artist: 'Ketsa',
    license: 'CC BY-NC-ND',
  },
  {
    handle: 'driving-soul',
    title: 'Driving Soul',
    artist: 'Ketsa',
    license: 'CC BY-NC-ND',
  },
  {
    handle: 'a-rose-in-the-concrete',
    title: 'A Rose in the Concrete',
    artist: 'Ketsa',
    license: 'CC BY-NC-ND',
  },
  {
    handle: 'new-days-new-minutes',
    title: 'New Days New Minutes',
    artist: 'Ketsa',
    license: 'CC BY-NC-ND',
  },
  {
    handle: 'time-falls-like-autumn-leaves',
    title: 'Time falls like Autumn Leaves',
    artist: 'Ketsa',
    license: 'CC BY-NC-ND',
  },
  {
    handle: 'old-school-swag',
    title: 'Old School Swag',
    artist: 'Pumpupthemind',
    license: 'CC BY',
  },
  {
    handle: 'old-vinyls',
    title: 'Old Vinyls',
    artist: 'Pumpupthemind',
    license: 'CC BY',
  },
  {
    handle: 'alone-in-silence',
    title: 'Alone in Silence',
    artist: 'Joint C Beat Laboratory',
    license: 'CC BY',
  },
  {
    handle: 'fly-away-3',
    title: 'Fly Away',
    artist: 'Joint C Beat Laboratory',
    license: 'CC BY',
  },
]

export function trackSrc(handle: string): string {
  return `https://freemusicarchive.org/track/${handle}/stream/`
}
