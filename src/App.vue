<script setup lang="ts">
import { ref, useTemplateRef, reactive } from 'vue'
import { useEditStore } from './stores/edit'
import FoodSearch from './components/IngredientSearch.vue'
import FabMenu from './components/FabMenu.vue'
import DishSummary from './components/DishSummary.vue'
import DefaultModal from './components/common/DefaultModal.vue'
import DefaultToast, { type ToastType } from './components/common/DefaultToast.vue'
import LazyComponents, { type Component } from './components/common/LazyComponents.vue'
import { Actions } from './stores/models'

const { addIngredient, reset, setRecipe } = useEditStore()
const modal = useTemplateRef('modal')
const toastMessage = ref<string>('')
const toastType = ref<ToastType>(null)
const modalData = reactive<{
  component: Component
  title: string | null
  props: Object
  emits: Object
}>({
  component: 'RecipesList',
  title: null,
  props: {},
  emits: {},
})

function fabHandler(action: string) {
  switch (action) {
    case Actions.RECIPES:
      openModal('RecipesList', 'Mina recept', {
        onClick: (recipe) => {
          setRecipe(recipe)
          modal.value?.ref?.close()
        }
      })
      break
  }
}

function save() {
  openModal('DishForm', null, {}, {
    dishSaved: (name) => {
      modal.value?.ref?.close()
      toast(`Receptet "${name}" sparat`, 'success')
    }
  })
}

const openModal = (comp: Component, title: string | null = null, props: Object = {}, emits: Object = {}) => {
  modalData.title = title
  modalData.component = comp
  modalData.props = props
  modalData.emits = emits

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
    <DishSummary :reset="reset" :save="save" />

    <DefaultModal ref="modal" :title="modalData.title">
      <LazyComponents :component="modalData.component" :props-to-pass="modalData.props"
        :emits-to-pass="modalData.emits" />
    </DefaultModal>
  </main>

  <FabMenu @action="fabHandler" />
  <DefaultToast :type="toastType" :message="toastMessage" />
</template>
