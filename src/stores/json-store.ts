import {create} from 'zustand'

interface JSONState {
  json: object | null
  setJson: (json: object) => void
}

export const useJsonStore = create<JSONState>(set => ({
  json: null,
  setJson: json => set({json: json}),
}))
