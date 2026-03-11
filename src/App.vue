<script setup lang="ts">
import { ref, useTemplateRef, reactive } from 'vue'
import { useEditStore } from './stores/edit'
import FoodSearch from './components/IngredientSearch.vue'
import FabMenu from './components/FabMenu.vue'
import DishSummary from './components/DishSummary.vue'
import DefaultModal, { type Size } from './components/common/DefaultModal.vue'
import DefaultToast, { type ToastType } from './components/common/DefaultToast.vue'
import LazyComponents, { type Component } from './components/common/LazyComponents.vue'
import { Actions, type Recipe } from './stores/models'
import { IconCarrot, IconMoon, IconSun } from './components/icons'

const { addIngredient, setRecipe } = useEditStore()
const modal = useTemplateRef('modal')
const toastMessage = ref<string>('')
const toastType = ref<ToastType>(null)
const modalData = reactive<{
  component: Component
  title: string | null
  props: Object
  emits: Object
  size?: Size
}>({
  component: 'RecipesList',
  title: null,
  props: {},
  emits: {},
})

function fabHandler(action: string) {
  switch (action) {
    case Actions.RECIPES:
      openModal(
        'RecipesList',
        'Mina recept',
        {
          onClick: (recipe: Recipe) => {
            setRecipe(recipe)
            modal.value?.ref?.close()
          },
        },
        {},
        'lg',
      )
      break
  }
}

// function save() {
//   openModal(
//     'DishForm',
//     null,
//     {},
//     {
//       dishSaved: (name: string) => {
//         modal.value?.ref?.close()
//         toast(`Receptet "${name}" sparat`, 'success')
//       },
//     },
//   )
// }

const openModal = (
  comp: Component,
  title: string | null = null,
  props: Object = {},
  emits: Object = {},
  size: Size = 'md',
) => {
  modalData.title = title
  modalData.component = comp
  modalData.props = props
  modalData.emits = emits
  modalData.size = size

  modal.value?.ref?.showModal()
}

function toast(message: string, type: ToastType = null) {
  toastMessage.value = message
  toastType.value = type
}
</script>

<template>
  <label class="absolute right-4 top-4 toggle">
    <input type="checkbox" class="theme-controller" value="cupcake" />
    <IconSun aria-label="enabled" />
    <IconMoon aria-label="disabled" />
  </label>

  <header>
    <h1 class="text-4xl font-extrabold text-center sm:text-6xl text-primary">
      <IconCarrot class="size-10 sm:size-16 inline-block" /> viktigare
    </h1>
    <FoodSearch @selected="addIngredient" />
  </header>

  <main>
    <DishSummary />
    <!-- <DishSummary :reset="reset" :save="save" /> -->

    <DefaultModal ref="modal" :title="modalData.title" :size="modalData.size">
      <LazyComponents :component="modalData.component" :props-to-pass="modalData.props"
        :emits-to-pass="modalData.emits" />
    </DefaultModal>
  </main>

  <FabMenu @action="fabHandler" />
  <DefaultToast :type="toastType" :message="toastMessage" />
  <IconCarrot class="fixed -z-10 bottom-4 left-4 w-24 sm:w-48 opacity-40" />
</template>
