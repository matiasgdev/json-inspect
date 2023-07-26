import {BRACKETS_LIST} from './configuration'

export function createKeyAccessorMap(list: string[]) {
  const filteredList = list.filter(
    value => !BRACKETS_LIST.includes(value.trim()),
  )

  return (value: string) => {
    return filteredList.indexOf(value)
  }
}
