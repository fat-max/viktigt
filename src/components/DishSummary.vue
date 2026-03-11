<script setup lang="ts">
import { computed } from 'vue'
import { storeToRefs } from 'pinia'
import { nutrientsCalculator } from '@/helpers/recipe-helper'
import { IconEnergy, IconDrop, IconWheat, IconDrumstick } from './icons'
import { Nutrients } from '@/stores/models'
import { v4 as uuidv4 } from 'uuid'
import DaisySelect from './common/DaisySelect.vue'
import { useEditStore, useRecipesStore, useSettingsStore, useTagStore } from '@/stores'

const { updateRecipes } = useRecipesStore()
const { recipe } = storeToRefs(useEditStore())
const { removeIngredient, reset } = useEditStore()
const { tags } = storeToRefs(useTagStore())
const { settings } = useSettingsStore()

const emit = defineEmits(['remove'])

// interface Props {
//   // save?: () => void
//   reset?: () => void
// }

// const props = withDefaults(defineProps<Props>(), { save: () => { }, reset: () => { } })

const nutrients = computed(() => nutrientsCalculator(recipe.value.ingredients))

function color(type: string) {
  if (type == Nutrients.ENERGY) return 'text-warning'
  if (type == Nutrients.CARBOHYDRATES) return 'text-error'
  if (type == Nutrients.PROTEIN) return 'text-success'

  return 'text-primary'
}

function save() {
  if (!recipe.value.name) return

  console.log('save')
  updateRecipes({
    id: recipe.value.id ?? uuidv4(),
    name: recipe.value.name,
    tags: recipe.value.tags,
    portions: recipe.value.portions ?? settings.portions,
    ingredients: recipe.value.ingredients,
  })

  reset()
}
</script>

<template>
  <div class="flex flex-col">
    <div class="grid grid-cols-4 gap-2 my-4">
      <div v-for="n in nutrients" :key="n.type" class="flex flex-col gap-2 cursor-default">
        <div class="stat-title">{{ n.label }}</div>
        <div
          class="flex gap-2 w-full font-semibold text-3xl items-center justify-center"
          :class="color(n.type)"
        >
          {{ n.amount }}
          <IconEnergy v-if="n.type == Nutrients.ENERGY" class="inline-block h-8 w-8" />
          <IconDrop v-if="n.type == Nutrients.FAT" class="inline-block h-8 w-8" />
          <IconDrumstick v-if="n.type == Nutrients.PROTEIN" class="inline-block h-8 w-8" />
          <IconWheat v-if="n.type == Nutrients.CARBOHYDRATES" class="inline-block h-8 w-8" />
        </div>
      </div>
    </div>

    <div class="overflow-x-auto" v-if="recipe.ingredients.length">
      <table class="table table-zebra table-sm">
        <thead>
          <tr>
            <th>Livsmedel</th>
            <th>Vikt (g)</th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          <tr
            v-for="ingredient in recipe.ingredients"
            :key="ingredient.Livsmedelsnamn"
            class="hover:bg-base-300"
          >
            <td>{{ ingredient.Livsmedelsnamn }}</td>
            <td>
              <input
                type="number"
                v-model="ingredient.weight"
                class="input input-xs w-16"
                placeholder="Gram (g)"
              />
            </td>
            <td>
              <button
                class="btn btn-xs btn-error btn-ghost btn-circle"
                @click="removeIngredient(ingredient)"
              >
                X
              </button>
            </td>
          </tr>
        </tbody>
      </table>
    </div>

    <fieldset class="fieldset flex gap-2" v-if="recipe.ingredients.length">
      <div>
        <label class="label">Namn*</label>
        <input
          type="text"
          class="input w-full input-sm"
          placeholder="Flygande jacob"
          v-model="recipe.name"
        />
      </div>
      <div class="flex-0">
        <label class="label">Portioner*</label>
        <input type="number" class="input input-sm w-16" v-model="recipe.portions" />
      </div>
      <div class="flex-1">
        <label class="label">Taggar</label>
        <DaisySelect
          v-model="recipe.tags"
          multiple
          :options="tags"
          class="input input-sm w-full"
          placeholder="Lunch, LCHF"
        />
      </div>
    </fieldset>

    <div class="flex justify-end gap-2 my-4" v-if="recipe.ingredients.length">
      <button class="btn btn-xs btn-error" @click="reset">
        {{ recipe.id ? 'Ta bort recept' : 'Töm' }}
      </button>
      <button class="btn btn-xs btn-primary" @click="save">
        {{ recipe.id ? 'Updatera' : 'Spara' }}
      </button>
    </div>
  </div>
</template>
