import {BRACKETS_LIST} from './configuration'

export function createNodeAccessorIndex(list: string[]) {
  const filteredBracketList = BRACKETS_LIST.filter(bracket => bracket !== '{')
  const nodeMapIndex = list
    .filter(value => !filteredBracketList.includes(value.trim()))
    .map((_, index) => index)

  return {
    nodeMapIndex,
  }
}
