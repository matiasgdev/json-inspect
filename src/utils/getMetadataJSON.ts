import {INDENT_SIZE, colors, colorsTypes} from './configuration'

export interface ObjectMetadata {
  key: string
  value: string
  color: string
}

export function getObjectMetadata(obj: object): ObjectMetadata[] {
  const stringifiedObj = JSON.stringify(obj, null, INDENT_SIZE)
  const mapped = stringifiedObj.split('\n').map((value, index) => ({
    value: value,
    key: `${index}.${value.trim()}`,
    color:
      colors[value as keyof typeof colors] ??
      colorsTypes[typeof value as keyof typeof colorsTypes],
  }))

  return mapped
}
