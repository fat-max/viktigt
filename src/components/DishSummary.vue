<script setup lang="ts">
import { computed, watch } from 'vue'
import { storeToRefs } from 'pinia'
import { nutrientsCalculator } from '@/helpers/recipe-helper'
import { useEditStore } from '@/stores/edit'
import { IconEnergy, IconDrop, IconWheat, IconDrumstick } from './icons'
import { Nutrients } from '@/stores/models'
const { recipe, ingredients } = storeToRefs(useEditStore())
const { removeIngredient } = useEditStore()

const emit = defineEmits(['remove'])

interface Props {
  save?: () => void
  reset?: () => void
}

const props = withDefaults(defineProps<Props>(), { save: () => { }, reset: () => { } })

const nutrients = computed(() => nutrientsCalculator(ingredients.value))

// watch(recipe, () => {
//   console.log(recipe.value)
// })

function color(type: string) {
  if (type == Nutrients.ENERGY) return 'text-warning'
  if (type == Nutrients.CARBOHYDRATES) return 'text-error'
  if (type == Nutrients.PROTEIN) return 'text-success'

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
          <IconEnergy v-if="n.type == Nutrients.ENERGY" class="inline-block h-8 w-8" />
          <IconDrop v-if="n.type == Nutrients.FAT" class="inline-block h-8 w-8" />
          <IconDrumstick v-if="n.type == Nutrients.PROTEIN" class="inline-block h-8 w-8" />
          <IconWheat v-if="n.type == Nutrients.CARBOHYDRATES" class="inline-block h-8 w-8" />
        </div>
      </div>
    </div>

    <div class="overflow-x-auto" v-if="ingredients.length">
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

    <div class="flex justify-end gap-2 my-4" v-if="ingredients.length">
      <button class="btn btn-xs btn-error" @click="props.reset">
        {{ recipe.id ? 'Ta bort recept' : 'Töm' }}
      </button>
      <button class="btn btn-xs btn-primary" @click="props.save">
        {{ recipe.id ? 'Updatera' : 'Spara' }}
      </button>
    </div>
  </div>
</template>
