<script setup>
import { computed, reactive } from 'vue'
import food from '@/data/nutrients.json'

const emit = defineEmits(['addFood'])
const state = reactive({ search: '' })

const filtered = computed(() => state.search.length < 3 ? null : food.filter(f => f.Livsmedelsnamn
  .toLowerCase()
  .includes(state.search.toLowerCase())
))

function add(food) {
  emit('addFood', food)
  state.search = ''
}

</script>

<template>
  <div class="relative">
    <label class="input w-full">
      <svg class="h-[1em] opacity-50" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
        <g stroke-linejoin="round" stroke-linecap="round" stroke-width="2.5" fill="none" stroke="currentColor">
          <circle cx="11" cy="11" r="8"></circle>
          <path d="m21 21-4.3-4.3"></path>
        </g>
      </svg>
      <input type="search" class="grow" placeholder="Sök livsmedel..." v-model="state.search" />
    </label>

    <div class="absolute z-10 w-full h-56 overflow-y-scroll" v-if="filtered">
      <ul class="menu menu-sm bg-base-200 rounded-box w-full">
        <li v-for="food in filtered" :key="food.Livsmedelsnamn">
          <a @click="add(food)">{{ food.Livsmedelsnamn }}</a>
        </li>
      </ul>
    </div>
  </div>
</template>
