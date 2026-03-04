<script setup lang="ts">
import { useRecipesStore } from '@/stores/recipes'
import { nutrientsCalculator } from '@/helpers/recipe-helper'

const { recipes } = useRecipesStore()
const nutrients = nutrientsCalculator([])
</script>

<template>
  <div class="overflow-x-auto">
    <table class="table table-sm">
      <thead>
        <tr>
          <th>Namn</th>
          <th>Portioner</th>
          <th v-for="nutrient in nutrients" :key="nutrient.type">{{ nutrient.label }}</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="recipe in recipes" :key="recipe.name" class="hover:bg-base-300">
          <td>{{ recipe.name }}</td>
          <td>{{ recipe.portions }}</td>
          <td v-for="type in nutrientsCalculator(recipe.ingredients)">{{ type.amount }}</td>
        </tr>
      </tbody>
    </table>
  </div>
</template>
