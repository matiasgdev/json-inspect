/* eslint-disable @typescript-eslint/no-explicit-any */

import type {JSON} from '../stores/json-store'

function formatJSON(json: string): JSON[]
function formatJSON(json: object): JSON[]
function formatJSON(json: unknown): JSON[] | null {
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
