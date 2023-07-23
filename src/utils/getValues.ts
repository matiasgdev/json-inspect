import {BRACKETS_LIST} from './configuration'

export function getValues(evaluatedString: string): string | [string, string] {
  let key = null
  let value = null

  if (BRACKETS_LIST.some(bracket => bracket === evaluatedString?.trim())) {
    return evaluatedString
  }

  if (evaluatedString?.includes(':')) {
    // eslint-disable-next-line @typescript-eslint/no-extra-semi
    ;[key, value] = evaluatedString.split(':')
  } else {
    value = evaluatedString
  }

  value = value?.replace(',', '')

  return key ? [key, value] : value
}
