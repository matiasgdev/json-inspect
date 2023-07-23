import {BRACKETS_LIST} from './configuration'

export function isSeparator(value: string | [string, string]) {
  return BRACKETS_LIST.some(
    bracket =>
      bracket === (Array.isArray(value) ? value[0]?.trim() : value?.trim()),
  )
}
