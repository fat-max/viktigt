import { defineStore, storeToRefs } from 'pinia'
import { ref } from 'vue'
import { useSettingsStore } from './settings'
import type { Recipe, Ingredient } from './models'

export const useEditStore = defineStore('edit', () => {
  const { settings } = storeToRefs(useSettingsStore())
  const defaultRecipe = { name: '', portions: settings.value.portions, ingredients: [] }
  const recipe = ref<Recipe>(defaultRecipe)

  function addIngredient(ingredient: Ingredient) {
    if (recipe.value.ingredients.some((l) => l.Livsmedelsnummer == ingredient.Livsmedelsnummer))
      return

    recipe.value.ingredients.push({ ...ingredient, ...{ weight: settings.value.weight } })
  }

  function removeIngredient(ingredient: Ingredient) {
    const index = recipe.value.ingredients.findIndex(
      (l) => l.Livsmedelsnummer == ingredient.Livsmedelsnummer,
    )
    if (index < 0) return

    recipe.value.ingredients.splice(index, 1)
  }

  function setRecipe(update: Recipe) {
    recipe.value = update
  }

  const reset = () => {
    recipe.value = defaultRecipe
  }

  return { recipe, addIngredient, removeIngredient, setRecipe, reset }
})
