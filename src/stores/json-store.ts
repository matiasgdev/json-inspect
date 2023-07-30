/* eslint-disable @typescript-eslint/no-explicit-any */
import {create} from 'zustand'
import {flatten, unflatten} from 'flat'

interface JSONState {
  json: object | null
  selectedNodeIndex: string
  setSelectedNodeIndex: (nodeIndex: string) => void
  collapsedKeys: Map<string, any>
  setJson: (json: object) => void
  collapseIndex: (nodeIndex: string, value: [] | object) => void
}

export const useJsonStore = create<JSONState>((set, get) => ({
  json: null,
  selectedNodeIndex: '',

  collapsedKeys: new Map<string, any>(),
  setJson: json => set({json: json}),
  setSelectedNodeIndex: (nodeIndex: string) => {
    set({selectedNodeIndex: nodeIndex})
  },
  collapseIndex: (nodeIndex: string, value: [] | object) => {
    const currentJson = get().json!
    const collapsedKeys = get().collapsedKeys

    const expandOrCollapse = (
      index: string,
      object: object,
      value: any,
    ): object => {
      // eslint-disable-next-line no-prototype-builtins
      if (!object.hasOwnProperty(index)) {
        object = flatten(object, {maxDepth: 2})
        return expandOrCollapse(index, object, value)
      }
      if (collapsedKeys.get(nodeIndex)) {
        collapsedKeys.delete(nodeIndex)
      } else {
        collapsedKeys.set(nodeIndex, object[nodeIndex as keyof typeof object])
      }
      object = {...object, [index]: value}
      return object
    }

    const collapsedJson = expandOrCollapse(
      nodeIndex,
      currentJson,
      collapsedKeys.get(nodeIndex) ? collapsedKeys.get(nodeIndex) : value,
    )

    set({
      json: unflatten(collapsedJson),
      collapsedKeys,
    })
  },
}))
