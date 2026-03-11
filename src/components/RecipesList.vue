<script setup lang="ts">
import { ref } from 'vue'
import { useRecipesStore } from '@/stores'
import { nutrientsCalculator } from '@/helpers/recipe-helper'
import { IconFilter } from './icons'
import type { Recipe } from '@/stores/models'

const { recipes } = useRecipesStore()
const nutrients = nutrientsCalculator([])
const props = defineProps<{
  onClick?: (recipe: Recipe) => {}
}>()

const filter = ref<string | null>(null)
</script>

<template>
  <div class="flex flex-col items-end">
    <label class="input input-sm w-48">
      <IconFilter class="h-[1.5em] opacity-50" />
      <input type="search" ref="inputRef" class="grow" placeholder="Filtrera på tag" v-model="filter" />
    </label>
    <div class="overflow-x-auto w-full">
      <table class="table table-sm">
        <thead>
          <tr>
            <th>Namn</th>
            <th>Portioner</th>
            <th v-for="nutrient in nutrients" :key="nutrient.type">{{ nutrient.label }}</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="recipe in recipes" :key="recipe.name" class="hover:bg-base-300 cursor-pointer"
            @click="props.onClick?.(recipe)">
            <td>{{ recipe.name }}</td>
            <td>{{ recipe.portions }}</td>
            <td v-for="type in nutrientsCalculator(recipe.ingredients)">{{ type.amount }}</td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>
