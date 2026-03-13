<script setup lang="ts">
import { useEditStore } from './stores/edit'
import FoodSearch from './components/IngredientSearch.vue'
import FabMenu from './components/FabMenu.vue'
import DishSummary from './components/DishSummary.vue'
import ModalComponent from './components/common/ModalComponent.vue'
import ToastComponent from './components/common/ToastComponent.vue'
import { IconCarrot, IconMoon, IconSun } from './components/icons'

const { addIngredient } = useEditStore()
</script>

<template>
  <label class="swap absolute right-4 top-4 h-6 w-6 text-base-content">
    <input type="checkbox" class="theme-controller" value="cupcake" />
    <IconSun class="swap-off w-full h-full" />
    <IconMoon class="swap-on w-full h-full" />
  </label>

  <header>
    <h1 class="text-4xl font-extrabold text-center sm:text-6xl text-primary">
      <IconCarrot class="size-10 sm:size-16 inline-block" /> viktigare
    </h1>
    <FoodSearch @selected="addIngredient" />
  </header>

  <main>
    <DishSummary />
  </main>

  <FabMenu />
  <ToastComponent />
  <ModalComponent />

  <IconCarrot class="fixed -z-10 bottom-4 left-4 w-24 sm:w-48 opacity-40" />
</template>
