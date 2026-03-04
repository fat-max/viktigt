import { defineStore } from 'pinia'
import { useLocalStorage } from '@vueuse/core'
import type { Recipe } from './models'

export const useRecipesStore = defineStore('recipes', () => {
  const recipes = useLocalStorage<Recipe[]>('recipes', [])

  function updateRecipes(recipe: Recipe) {
    if (!recipe) return

    const index = recipes.value.findIndex(x => x.id == recipe.id)

    index < 0 ? recipes.value.push(recipe) : recipes.value[index] = recipe
  }

  return { recipes, updateRecipes }
})
