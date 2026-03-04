<script setup lang="ts">
import { computed } from 'vue'
import { storeToRefs } from 'pinia'
import { nutrientsCalculator } from '@/helpers/recipe-helper'
import { useEditStore } from '@/stores/edit'

const { recipe, ingredients } = storeToRefs(useEditStore())
const { removeIngredient } = useEditStore()

const emit = defineEmits(['remove'])

interface Props {
  save?: () => void
  reset?: () => void
}

const { save = () => { }, reset = () => { } } = defineProps<Props>()

const nutrients = computed(() => nutrientsCalculator(ingredients))

function color(type: string) {
  if (type == 'energy') return 'text-warning'
  if (type == 'carbs') return 'text-error'
  if (type == 'protein') return 'text-success'

  return 'text-primary'
}
</script>

<template>
  <div class="flex flex-col">
    <div class="grid grid-cols-4 gap-2 my-4">
      <div v-for="n in nutrients" :key="n.type" class="flex flex-col gap-2 cursor-default">
        <div class="stat-title">{{ n.label }}</div>
        <div class="flex gap-2 w-full font-extrabold text-3xl items-center justify-center" :class="color(n.type)">
          {{ n.amount }}
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"
            class="inline-block h-8 w-8 stroke-current">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 10V3L4 14h7v7l9-11h-7z"></path>
          </svg>
        </div>
      </div>
    </div>

    <div class="overflow-x-auto">
      <table class="table table-zebra table-sm">
        <thead>
          <tr>
            <th>Livsmedel</th>
            <th>Vikt (g)</th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="ingredient in ingredients" :key="ingredient.Livsmedelsnamn" class="hover:bg-base-300">
            <td>{{ ingredient.Livsmedelsnamn }}</td>
            <td>
              <input type="number" v-model="ingredient.weight" class="input input-xs w-16" placeholder="Gram (g)" />
            </td>
            <td>
              <div class="tooltip" data-tip="Ta bort">
                <button class="btn btn-xs btn-error btn-ghost btn-circle" @click="removeIngredient(ingredient)">
                  X
                </button>
              </div>
            </td>
          </tr>
        </tbody>
      </table>
    </div>

    <div class="flex justify-end gap-2 my-4">
      <button class="btn btn-xs btn-error" @click="reset">Släng</button>
      <button class="btn btn-xs btn-primary" @click="save">Spara</button>
    </div>
  </div>
</template>
