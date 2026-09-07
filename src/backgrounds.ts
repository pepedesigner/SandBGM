export const BACKGROUNDS = [
  'https://d8j0ntlcm91z4.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/hf_20260611_183632_c311af08-e4b7-458f-81e7-79847a49b3d3.mp4',
  'https://d8j0ntlcm91z4.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/hf_20260328_115001_bcdaa3b4-03de-47e7-ad63-ae3e392c32d4.mp4',
  'https://d8j0ntlcm91z4.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/hf_20260405_074625_a81f018a-956b-43fb-9aee-4d1508e30e6a.mp4',
] as const

const BG_KEY = 'sandbgm.background'

export function readBackgroundIndex() {
  try {
    const raw = localStorage.getItem(BG_KEY)
    const index = raw ? Number.parseInt(raw, 10) : 0
    if (Number.isInteger(index) && index >= 0 && index < BACKGROUNDS.length) return index
  } catch {
    /* private mode */
  }
  return 0
}

export function writeBackgroundIndex(index: number) {
  try {
    localStorage.setItem(BG_KEY, String(index))
  } catch {
    /* private mode */
  }
}
