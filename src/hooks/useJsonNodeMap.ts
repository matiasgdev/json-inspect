import {useMemo} from 'react'
import {useJsonStore} from '../stores/json-store'
import {TypeOf, type} from '../utils/type'

export interface JsonProperties {
  key: string
  value: JsonProperties[] | TypeOf
  typeofValue: TypeOf
  nodeIndex: number
  parentKey?: string
  parentTypeOf?: TypeOf
  shouldFilter?: boolean
}

function flatJsonProperties(
  json: object | null,
  cacheProps: JsonProperties[] = [],
  parentKey = '',
): JsonProperties[] | null {
  if (json === null) return json

  let properties: JsonProperties[] = [
    ...(parentKey
      ? []
      : [
          {
            key: 'root',
            nodeIndex: 0,
            typeofValue: type(json),
            value: json as never,
          },
        ]),
    ...cacheProps,
  ]

  for (const key of Object.keys(json)) {
    const value = json[key as keyof typeof json]
    const deeperKey = parentKey ? `${parentKey}.${key}` : key
    const typeofValue = type(value)
    const newValue: JsonProperties = {
      key: deeperKey,
      value,
      typeofValue,
      nodeIndex: properties.length,
    }

    if (parentKey) {
      newValue.parentKey = parentKey
      const parent = properties.find(node => node.key === parentKey)!
      newValue.parentTypeOf = parent?.typeofValue
    }

    properties.push(newValue)

    const shouldFlat = typeofValue === 'array' || typeofValue === 'object'

    if (shouldFlat) {
      properties = flatJsonProperties(value, properties, deeperKey)!
    }
  }

  return properties
}

export function useJsonNodeMap() {
  const json = useJsonStore(s => s.json)
  return useMemo(() => flatJsonProperties(json), [json])
}
