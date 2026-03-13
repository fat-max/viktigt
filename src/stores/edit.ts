import { defineStore, storeToRefs } from 'pinia'
import { ref } from 'vue'
import { usePreferenceStore } from './preference'
import type { Recipe, Ingredient } from './models'

export const useEditStore = defineStore('edit', () => {
  const { preference } = storeToRefs(usePreferenceStore())
  const defaultRecipe = { name: '', portions: preference.value.portions, ingredients: [] }
  const recipe = ref<Recipe>(defaultRecipe)

  function addIngredient(ingredient: Ingredient) {
    if (recipe.value.ingredients.some((l) => l.Livsmedelsnummer == ingredient.Livsmedelsnummer))
      return

    recipe.value.ingredients.push({ ...ingredient, ...{ weight: preference.value.weight } })
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
