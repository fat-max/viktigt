import { defineStore } from 'pinia'
import { ref } from 'vue'
import { useLocalStorage } from '@vueuse/core'

export const useSettingsStore = defineStore('settings', () => {
  const settings =  useLocalStorage('settings', {weight: 100, portions: 4})

  return { settings }
})
