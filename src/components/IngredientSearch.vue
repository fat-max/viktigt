<script setup lang="ts">
import { computed, reactive, ref, watch } from 'vue'
import type { Ingredient } from '@/stores/models'
import { IconSearch } from './icons'
// import VueSelect from 'vue3-select-component'
// import 'vue3-select-component/styles'

const nutrients = ref<Ingredient[]>([])
const emit = defineEmits(['selected'])
const state = reactive<{ search: string }>({ search: '' })

import('@/data/nutrients.json').then(
  (data) =>
    (nutrients.value = data.default.map((nutrient) => ({ ...nutrient, ...{ weight: 100 } }))),
)

const filtered = computed(() =>
  state.search.length < 3 || !nutrients.value
    ? []
    : nutrients.value.filter((f: Ingredient) =>
      f.Livsmedelsnamn.toLowerCase().includes(state.search.toLowerCase()),
    ),
)

function select(ingredient: Ingredient) {
  emit('selected', ingredient)
  state.search = ''
}
// watch(state, () => {
//   if (!state.search) return
//   console.log(state.search)
//   // emit('selected', state.search)
//   // state.search = ''
// })
</script>

<template>
  <div class="relative">
    <label class="input w-full">
      <IconSearch class="h-[1em] opacity-50" />
      <!-- <VueSelect v-model="state.search" :options="nutrients" :getOptionLabel="(option) => option.Livsmedelsnamn"
        :getOptionValue="(option) => option" placeholder="Select an option" :classes="{
          control: 'bg-base-100! border-none! placeholder',
          placeholder: 'text-base-content/40!',
          singleValue: 'text-base-content!',
          menuContainer: 'bg-base-100! border-none!',
          menuOption: 'text-base-content! p-1! rounded! hover:bg-accent-content!',
        }" /> -->
      <input type="search" class="grow" placeholder="Sök livsmedel..." v-model="state.search" />
    </label>

    <div class="absolute z-10 w-full h-56 overflow-y-scroll" v-if="filtered.length">
      <ul class="menu menu-sm bg-base-200 rounded-box w-full">
        <li v-for="ingredient in filtered" :key="ingredient.Livsmedelsnamn">
          <a @click="select(ingredient)">{{ ingredient.Livsmedelsnamn }}</a>
        </li>
      </ul>
    </div>
  </div>
</template>

<style></style>
