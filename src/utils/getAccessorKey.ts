import {BRACKETS_LIST} from './configuration'

export function createNodeAccessorIndex(list: string[]) {
  const nodeMapIndex = list
    .filter(value => !BRACKETS_LIST.includes(value.trim()))
    .map((_, index) => index)

  return {
    nodeMapIndex,
  }
}
