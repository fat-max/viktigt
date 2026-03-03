import { defineStore } from 'pinia'
import { useLocalStorage } from '@vueuse/core'
import type { Recipe } from './models'

export const useRecipesStore = defineStore('recipes', () => {
  const recipes = useLocalStorage<Recipe[]>('recipes', [])

  function addRecipe(recipe: Recipe) {
    if (!recipe) return
    recipes.value.push(recipe)
  }

  return { recipes, addRecipe }
})
