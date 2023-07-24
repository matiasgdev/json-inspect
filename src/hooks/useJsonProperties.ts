import {useMemo} from 'react'
import {useJsonStore} from '../stores/json-store'

export interface JsonProperties {
  key: string
  deeperKey: string
  value: JsonProperties[] | string | number | boolean | Date
}

function buildJsonProperties(
  json: object | null,
  parentKey = '',
): JsonProperties[] | null {
  if (json === null) return json

  const metadataJSON: JsonProperties[] = []

  for (const key of Object.keys(json)) {
    const value = json[key as keyof typeof json]
    const deeperKey = parentKey ? `${parentKey}.${key}` : key

    metadataJSON.push({
      key: key,
      deeperKey,
      value:
        typeof value === 'object'
          ? buildJsonProperties(value, deeperKey)!
          : value,
    })
  }
  return metadataJSON
}

export function useJsonProperties() {
  const json = useJsonStore(s => s.planeJSON)
  return useMemo(() => buildJsonProperties(json), [json])
}
