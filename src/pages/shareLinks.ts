export const SUPPORTED_TYPES = ['profile', 'place', 'group', 'event', 'club', 'route', 'post'] as const

export type ShareType = (typeof SUPPORTED_TYPES)[number]

export interface ShareTarget {
  type: ShareType
  id: string
}

export function parseShareTarget(pathname: string): ShareTarget | null {
  const parts = pathname.split('/').filter(Boolean)
  if (parts.length < 3 || parts[0] !== 's') {
    return null
  }

  const [, rawType, ...idParts] = parts
  if (!SUPPORTED_TYPES.includes(rawType as ShareType)) {
    return null
  }

  const id = decodeURIComponent(idParts.join('/')).trim()
  if (!id) {
    return null
  }

  return {
    type: rawType as ShareType,
    id,
  }
}
