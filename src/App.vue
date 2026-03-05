<script setup lang="ts">
import { ref, useTemplateRef, reactive } from 'vue'
import { useEditStore } from './stores/edit'
import FoodSearch from './components/IngredientSearch.vue'
import FabMenu from './components/FabMenu.vue'
import DishSummary from './components/DishSummary.vue'
import DefaultModal from './components/common/DefaultModal.vue'
import DefaultToast, { type ToastType } from './components/common/DefaultToast.vue'
import LazyComponents, { type Component } from './components/common/LazyComponents.vue'
import { Actions, type Recipe } from './stores/models'
import { IconCarrot } from './components/icons'
// import DaisySelect from '@/components/common/DaisySelect.vue'

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
        size: 'lg',
        onClick: (recipe: Recipe) => {
          setRecipe(recipe)
          modal.value?.ref?.close()
        },
      })
      break
  }
}

function save() {
  openModal(
    'DishForm',
    null,
    { size: 'md' },
    {
      dishSaved: (name: string) => {
        modal.value?.ref?.close()
        toast(`Receptet "${name}" sparat`, 'success')
      },
    },
  )
}

const openModal = (
  comp: Component,
  title: string | null = null,
  props: Object = {},
  emits: Object = {},
) => {
  // console.log(props)
  modalData.title = title
  modalData.component = comp
  modalData.props = props
  modalData.emits = emits

  modal.value?.ref?.showModal()
}

function toast(message: string, type: ToastType = null) {
  toastMessage.value = message
  toastType.value = type
}

// const users = [
//   { value: 1, label: "Alice" },
//   { value: 2, label: "Bob" },
//   { value: 3, label: "Charlie" }
// ]

// const selectedUsers = ref<any[]>([])
</script>

<template>
  <!-- <div class="p-6 max-w-md">
    <DaisySelect v-model="selectedUsers" multiple :options="users" label-key="name" value-key="id"
      placeholder="Select users" />
    <p class="mt-4">Selected: {{selectedUsers.map(u => u.name).join(', ')}}</p>
  </div> -->

  <header>
    <h1 class="text-4xl font-extrabold text-center sm:text-6xl text-accent">
      <IconCarrot class="size-10 sm:size-16 inline-block" /> viktigare
    </h1>
    <FoodSearch @selected="addIngredient" />
  </header>

  <main>
    <DishSummary :reset="reset" :save="save" />

    <DefaultModal ref="modal" :title="modalData.title">
      <LazyComponents
        :component="modalData.component"
        :props-to-pass="modalData.props"
        :emits-to-pass="modalData.emits"
      />
    </DefaultModal>
  </main>

  <FabMenu @action="fabHandler" />
  <DefaultToast :type="toastType" :message="toastMessage" />
  <IconCarrot class="fixed bottom-4 left-4 w-48 opacity-40" />
</template>
