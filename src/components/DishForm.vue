<script setup lang="ts">
import { ref } from 'vue'
import { storeToRefs } from 'pinia'
import { useRecipesStore } from '@/stores/recipes'
import { useEditStore } from '@/stores/edit'
import { v4 as uuidv4 } from 'uuid'
import DaisySelect from './common/DaisySelect.vue'
import { useTagStore } from '@/stores/tags'

const { updateRecipes } = useRecipesStore()
const { tags } = storeToRefs(useTagStore())
const { recipe } = storeToRefs(useEditStore())
const { reset } = useEditStore()

const emit = defineEmits(['dishSaved'])
// const name = ref<string>(recipe.name)
// const tags = ref<string[]>(recipe?.tags ?? [])

// @todo: real validate
function save() {
  if (!recipe.value.name) return

  console.log('save')
  updateRecipes({
    id: recipe.value.id ?? uuidv4(),
    name: recipe.value.name,
    tags: recipe.value.tags,
    ingredients: recipe.value.ingredients,
    portions: 1,
  })

  reset()
  emit('dishSaved', recipe.value.name)
}
</script>

<template>
  <fieldset class="fieldset">
    <label class="label">Namn*</label>
    <input type="text" class="input w-full" placeholder="Flygande jacob" v-model="recipe.name" />

    <label class="label">Taggar</label>
    <!-- <input type="text" class="input w-full" placeholder="Lunch, LCHF" v-model="tags" /> -->
    <DaisySelect
      v-model="recipe.tags"
      multiple
      :options="tags"
      class="input w-full"
      placeholder="Lunch, LCHF"
    />

    <button class="btn btn-neutral mt-4" @click="save">Spara</button>
  </fieldset>
</template>
