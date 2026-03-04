import { defineStore } from 'pinia'
import { ref, computed } from 'vue'
import { useSettingsStore } from './settings'
import type { Recipe, Ingredient } from './models'

export const useEditStore = defineStore('edit', () => {
  const { settings } = useSettingsStore()
  const defaultRecipe = {name: '', portions: settings.portions, ingredients: []}
  const recipeRef = ref<Recipe>(defaultRecipe)

  function addIngredient(ingredient: Ingredient) {
    if (recipeRef.value.ingredients.some((l) => l.Livsmedelsnummer == ingredient.Livsmedelsnummer)) return

    recipeRef.value.ingredients.push({ ...ingredient, ...{ weight: settings.weight } })
  }

  function setRecipe(recipe: Recipe) {
    recipeRef.value = recipe
  }

  const reset = () => {
    recipeRef.value = defaultRecipe
  }

  const ingredients = computed(() => recipeRef.value.ingredients)

  return { ingredients, addIngredient, setRecipe, reset }
})
