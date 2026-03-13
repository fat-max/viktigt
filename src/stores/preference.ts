import { defineStore } from 'pinia'
import { useLocalStorage } from '@vueuse/core'

interface Preference {
  weight: Number
  portions: Number
}

export const usePreferenceStore = defineStore('preference', () => {
  const preference = useLocalStorage<Preference>('preference', { weight: 100, portions: 4 })

  return { preference }
})
