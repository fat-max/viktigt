import { defineStore } from 'pinia'
import { ref, computed } from 'vue'
import { useLocalStorage } from '@vueuse/core'
import { useSettingsStore } from './settings'

export const useEditStore = defineStore('edit', () => {
  const list = ref([])
  const { settings } = useSettingsStore()

  function addIngredient(ingredient) {
    if (list.value.some(l => l.Livsmedelsnummer == ingredient.Livsmedelsnummer)) return;

    list.value.push({...ingredient, ...{weight: settings.weight}})
  }

  const reset = () => {
    list.value = []
  }

  const ingredients = computed(() => list )

  return { ingredients, addIngredient, reset }
})
