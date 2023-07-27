/* eslint-disable @typescript-eslint/no-explicit-any */
import {create} from 'zustand'
import {flatten, unflatten} from 'flat'

interface JSONState {
  json: object | null
  collapsedKeys: Map<string, any>
  setJson: (json: object) => void
  collapseIndex: (nodeIndex: string, value: [] | object) => void
}

export const useJsonStore = create<JSONState>((set, get) => ({
  json: null,
  collapsedKeys: new Map<string, any>(),
  setJson: json => set({json: json}),
  collapseIndex: (nodeIndex: string, value: [] | object) => {
    const currentJson = get().json
    const collapsedKeys = get().collapsedKeys

    const expand = (index: string, object: object, value: any): object => {
      // eslint-disable-next-line no-prototype-builtins
      if (!object.hasOwnProperty(index)) {
        object = flatten(object, {maxDepth: 2})
        return expand(index, object, value)
      }
      collapsedKeys.delete(nodeIndex)
      object = {...object, [index]: value}
      return object
    }

    const collapse = (index: string, object: object): object => {
      // eslint-disable-next-line no-prototype-builtins
      if (!object.hasOwnProperty(index)) {
        object = flatten(object, {maxDepth: 2})
        return collapse(index, object)
      }
      collapsedKeys.set(nodeIndex, object[nodeIndex as keyof typeof object])
      object = {...object, [index]: value}
      return object
    }

    if (collapsedKeys.get(nodeIndex) && currentJson !== null) {
      const expandedValue = expand(
        nodeIndex,
        currentJson,
        collapsedKeys.get(nodeIndex),
      )
      return set({
        json: unflatten(expandedValue),
      })
    }

    if (currentJson !== null) {
      const collapsedJson = collapse(nodeIndex, currentJson)
      set({
        json: unflatten(collapsedJson),
        collapsedKeys,
      })
    }
  },
}))
