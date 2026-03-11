<script setup lang="ts">
import { defineAsyncComponent, computed } from 'vue'

export type Component = 'RecipesList'

const props = defineProps<{
  component: Component
  propsToPass?: Object
  emitsToPass?: Object
}>()

const asyncComponents = {
  // DishForm: defineAsyncComponent(() => import('@/components/DishForm.vue')),
  RecipesList: defineAsyncComponent(() => import('@/components/RecipesList.vue')),
}
const currentComponent = computed(() => asyncComponents[props.component])
</script>

<template>
  <component :is="currentComponent" v-bind="propsToPass" v-on="emitsToPass" />
</template>
