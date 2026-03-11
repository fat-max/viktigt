<script setup lang="ts">
import { reactive, ref, watch } from 'vue'
import type { Ingredient } from '@/stores/models'
import { IconSearch } from './icons'
import DaisySelect from '@/components/common/DaisySelect.vue'

const nutrients = ref<Ingredient[]>([])
const selected = ref<any[]>([])
const emit = defineEmits(['selected'])
const state = reactive<{ search: string }>({ search: '' })

import('@/data/nutrients.json').then(
  (data) =>
    (nutrients.value = data.default.map((nutrient) => ({ ...nutrient, ...{ weight: 100 } }))),
)

watch(selected, (ingredient: any) => {
  if (!(ingredient as Ingredient)?.Livsmedelsnamn) return

  emit('selected', ingredient)
  selected.value = []
})
</script>

<template>
  <div class="relative">
    <label class="input w-full relative">
      <IconSearch class="h-[1em] opacity-50" />
      <DaisySelect v-model="selected" :options="nutrients" label-key="Livsmedelsnamn"
        :value-key="(option: any) => option" placeholder="Sök livsmedel..." />
    </label>
  </div>
</template>
