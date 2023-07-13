/* eslint-disable @typescript-eslint/no-explicit-any */

export interface Reader {
  key: string
  value: Reader[] | string | number | boolean | Date
}

function formatJSON(json: string): Reader[]
function formatJSON(json: object): Reader[]
function formatJSON(json: unknown): Reader[] | null {
  if (!json) {
    return null
  }

  json = typeof json === 'string' ? JSON.parse(json) : json

  const readable = []
  const keys = Object.keys(json as object)

  for (const key of keys) {
    const value = (json as object)[key as keyof typeof json]

    readable.push({
      key: key,
      value: Array.isArray(value)
        ? value
        : typeof value === 'object'
        ? formatJSON(value)
        : value,
    })
  }

  return readable
}

export {formatJSON}
