import { defineStore } from 'pinia'
import { useLocalStorage } from '@vueuse/core'

interface Settings {
  weight: Number
  portions: Number
}

export const useSettingsStore = defineStore('settings', () => {
  const settings = useLocalStorage<Settings>('settings', { weight: 100, portions: 4 })

  return { settings }
})
