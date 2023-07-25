import {useMemo} from 'react'
import {useJsonStore} from '../stores/json-store'
import {flatten} from 'flat'

export interface JsonProperties {
  key: string
  deeperKey: string
  value: JsonProperties[] | string | number | boolean | Date
}

function buildJsonProperties(
  json: object | null,
  parentKey = '',
): {props: JsonProperties[]; flattenObj: object} | null {
  if (json === null) return json

  const props: JsonProperties[] = []

  for (const key of Object.keys(json)) {
    const value = json[key as keyof typeof json]
    const deeperKey = parentKey ? `${parentKey}.${key}` : key

    props.push({
      key: key,
      deeperKey,
      value:
        typeof value === 'object'
          ? buildJsonProperties(value, deeperKey)!.props
          : value,
    })
  }
  return {props, flattenObj: flatten(json)}
}

export function useJsonProperties() {
  const json = useJsonStore(s => s.json)
  return useMemo(() => buildJsonProperties(json), [json])
}
