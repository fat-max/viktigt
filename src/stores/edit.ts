import { defineStore } from 'pinia'
import { ref, computed } from 'vue'
import { useSettingsStore } from './settings'
import type { Ingredient } from './models'

export const useEditStore = defineStore('edit', () => {
  const list = ref<Ingredient[]>([])
  const { settings } = useSettingsStore()

  function addIngredient(ingredient: Ingredient) {
    if (list.value.some((l) => l.Livsmedelsnummer == ingredient.Livsmedelsnummer)) return

    list.value.push({ ...ingredient, ...{ weight: settings.weight } })
  }

  const reset = () => {
    list.value = []
  }

  const ingredients = computed(() => list.value)

  return { ingredients, addIngredient, reset }
})
