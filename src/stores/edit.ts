import { defineStore } from 'pinia'
import { ref, computed } from 'vue'
import { useSettingsStore } from './settings'
import type { Recipe, Ingredient } from './models'

export const useEditStore = defineStore('edit', () => {
  const { settings } = useSettingsStore()
  const defaultRecipe = { name: '', portions: settings.portions, ingredients: [] }
  const recipe = ref<Recipe>(defaultRecipe)

  function addIngredient(ingredient: Ingredient) {
    if (recipe.value.ingredients.some((l) => l.Livsmedelsnummer == ingredient.Livsmedelsnummer))
      return

    recipe.value.ingredients.push({ ...ingredient, ...{ weight: settings.weight } })
  }

  function setRecipe(update: Recipe) {
    recipe.value = update
  }

  const reset = () => {
    recipe.value = defaultRecipe
  }

  const ingredients = computed(() => recipe.value.ingredients)

  return { recipe, ingredients, addIngredient, setRecipe, reset }
})
