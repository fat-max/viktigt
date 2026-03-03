<script setup lang="ts">
import { ref, useTemplateRef, shallowRef } from 'vue'
import FoodSearch from './components/IngredientSearch.vue'
import FabMenu from './components/FabMenu.vue'
import DishSummary from './components/DishSummary.vue'
import { useEditStore } from './stores/edit'
import DefaultModal from './components/default/DefaultModal.vue'
import DefaultToast from './components/default/DefaultToast.vue'
import DishForm from './components/DishForm.vue'

const { ingredients, addIngredient, reset } = useEditStore()
const modal = useTemplateRef('modal')
const modalTitle = ref<string | null>(null)
const component = shallowRef(DishForm)

const save = () => {
  modalTitle.value = null
  component.value = DishForm
  modal.value?.ref?.showModal()
}
</script>

<template>
  <header>
    <h1 class="text-4xl font-extrabold pb-2 text-center sm:text-6xl sm:pb-3 text-secondary">
      viktigt
    </h1>
    <FoodSearch @selected="addIngredient" />
  </header>

  <main>
    <DishSummary :ingredients="ingredients" :reset="reset" :save="save" />

    <DefaultModal ref="modal" :title="modalTitle">
      <component :is="component"></component>
    </DefaultModal>

    <DefaultToast :type="'success'">asdsasd asdsasd asdsasd</DefaultToast>
  </main>
  <FabMenu />
</template>
