import {create} from 'zustand'

interface JSONState {
  planeJSON: object | null
  setPlaneJSON: (json: object) => void
}

export const useJsonStore = create<JSONState>(set => ({
  json: null,
  planeJSON: null,
  setPlaneJSON: json => set({planeJSON: json}),
}))
