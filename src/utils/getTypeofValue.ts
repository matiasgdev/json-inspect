import {BRACKETS_LIST} from './configuration'

export function getTypeofValue(evaluatedString: string) {
  let value = null

  if (BRACKETS_LIST.some(bracket => bracket === evaluatedString.trim())) {
    return value
  }

  if (evaluatedString?.includes(':')) {
    // eslint-disable-next-line @typescript-eslint/no-extra-semi
    ;[, value] = evaluatedString.split(':')
  } else {
    value = evaluatedString
  }

  value = value.trim().replace(',', '')

  if (BRACKETS_LIST.includes(value)) {
    return null
  }

  return typeof JSON.parse(value)
}
