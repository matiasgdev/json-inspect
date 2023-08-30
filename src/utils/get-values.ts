import {BRACKETS_LIST} from './configuration'

export interface ObjectIdentity {
  entity: string
  separator: string
}

function getTralingSeparator(keyOrValue: string) {
  return keyOrValue.includes(',') ? ',' : keyOrValue.includes(':') ? ':' : ''
}

export function getValues(
  evaluatedString: string,
): ObjectIdentity | [ObjectIdentity, ObjectIdentity] {
  const key = {entity: '', separator: ''}
  const value = {entity: '', separator: ''}

  if (BRACKETS_LIST.some(bracket => bracket === evaluatedString?.trim())) {
    return {
      entity: evaluatedString,
      separator: getTralingSeparator(evaluatedString),
    }
  }

  if (evaluatedString?.includes(':')) {
    // eslint-disable-next-line @typescript-eslint/no-extra-semi
    const [objKey, objValue] = evaluatedString.split(':')
    key.entity = objKey
    key.separator = ':'
    value.entity = objValue
    value.separator = getTralingSeparator(objValue)
  } else {
    value.entity = evaluatedString
  }

  value.separator = getTralingSeparator(value.entity)
  value.entity = value.separator ? value.entity.replace(',', '') : value.entity

  return key.entity ? [key, value] : value
}
