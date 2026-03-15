<script setup lang="ts">
import { usePreferenceStore } from '@/stores/preference'
import { storeToRefs } from 'pinia'

const { preference } = storeToRefs(usePreferenceStore())
</script>

<template>
  <fieldset class="fieldset my-4">
    <label class="flex items-center">
      <span class="flex-1">Vikt i gram</span>
      <input
        v-model="preference.weight"
        type="number"
        placeholder="100"
        class="input input-sm w-24 text-right"
        min="0"
      />
    </label>
    <label class="flex items-center">
      <span class="flex-1">Portioner</span>
      <input
        v-model="preference.portions"
        type="number"
        placeholder="4"
        class="input input-sm w-24 text-right"
        min="0"
      />
    </label>
  </fieldset>
</template>
