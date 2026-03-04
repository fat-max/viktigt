<script setup lang="ts">
import { ref, useTemplateRef, shallowRef, defineAsyncComponent } from 'vue'
import FoodSearch from './components/IngredientSearch.vue'
import FabMenu from './components/FabMenu.vue'
import DishSummary from './components/DishSummary.vue'
import { useEditStore } from './stores/edit'
import DefaultModal from './components/default/DefaultModal.vue'
import DefaultToast, { type ToastType } from './components/default/DefaultToast.vue'
import LazyComponents, { type Component } from './components/default/LazyComponents.vue'

const { ingredients, addIngredient, reset } = useEditStore()
const modal = useTemplateRef('modal')
const modalTitle = ref<string | null>(null)
const toastMessage = ref<string>('')
const toastType = ref<ToastType>(null)
const component = ref<Component | null>(null)
const propsToPass = ref<Object>({})

function fabHandler(action: string) {
  switch (action) {
    case 'recioes':
      openModal('RecipesList', 'Mina recept')
      break
  }
}

function save() {
  openModal('DishForm')
}

function openModal(comp: Component, title: string | null = null, props: Object = {}) {
  modalTitle.value = title
  component.value = comp
  propsToPass.value = props
  modal.value?.ref?.showModal()
}

function toast(message: string, type = null) {
  toastMessage.value = message
  toastType.value = type
}
</script>

<template>
  <header>
    <h1 class="text-4xl font-extrabold pb-2 text-center sm:text-6xl sm:pb-3 text-secondary">
      viktigare
    </h1>
    <FoodSearch @selected="addIngredient" />
  </header>

  <main>
    <DishSummary v-if="ingredients" :ingredients="ingredients" :reset="reset" :save="save" />

    <DefaultModal ref="modal" :title="modalTitle">
      <LazyComponents v-if="component" :component="component" :pass-to-props="propsToPass" />
    </DefaultModal>
  </main>

  <FabMenu @action="fabHandler" />
  <DefaultToast :type="toastType" :message="toastMessage" />
</template>
