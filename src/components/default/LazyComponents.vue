<script setup lang="ts">
import { defineAsyncComponent, computed, ref } from 'vue'

export type Component = 'DishForm' | 'RecipesList'

const props = defineProps<{
  component: Component,
  passToProps?: Object
}>()

const asyncComponents = {
  DishForm: defineAsyncComponent(() => import('@/components/DishForm.vue')),
  RecipesList: defineAsyncComponent(() => import('@/components/RecipesList.vue')),
}

const componentToRender = ref<keyof typeof asyncComponents>(props.component)
const currentComponent = computed(() => asyncComponents[componentToRender.value])
</script>

<template>
  <component :is="currentComponent" v-bind="passToProps" />
</template>
