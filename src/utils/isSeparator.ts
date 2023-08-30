import {BRACKETS_LIST} from './configuration'
import {ObjectIdentity} from './getValues'

export function isSeparator(
  value: ObjectIdentity | [ObjectIdentity, ObjectIdentity],
) {
  return BRACKETS_LIST.some(
    bracket =>
      bracket ===
      (Array.isArray(value) ? value[0].entity.trim() : value.entity.trim()),
  )
}

export function isOpenBracket(
  value: ObjectIdentity | [ObjectIdentity, ObjectIdentity],
) {
  return Array.isArray(value)
    ? value[0].entity.trim() === '{'
    : value.entity.trim() === '{'
}
