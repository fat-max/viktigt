import { defineStore } from 'pinia'
import { ref } from 'vue'
import { useLocalStorage } from '@vueuse/core'

export const useEditStore = defineStore('edit', () => {
  const ingredients = ref([])

  function addIngredient(ingredient) {
    if (list.some(l => l.Livsmedelsnummer == ingredient.Livsmedelsnummer)) return;

    list.push(ingredient)
  }

  function updateWeight(ingredient, weigth) {

  }

  return { ingredients }
})
