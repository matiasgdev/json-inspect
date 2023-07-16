import {create} from 'zustand'

export interface JSON {
  key: string
  value: JSON[] | string | number | boolean | Date
}

interface JSONState {
  json: JSON[] | null
  setJSON: (newjJSON: JSON[]) => void
}

export const useJsonStore = create<JSONState>(set => ({
  json: null,
  setJSON: newjJSON => set({json: newjJSON}),
}))
