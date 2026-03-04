<script setup lang="ts">
import { ref } from 'vue'
import { useRecipesStore } from '@/stores/recipes'
import { useEditStore } from '@/stores/edit'

const { addRecipe } = useRecipesStore()
const { ingredients, reset } = useEditStore()

const emit = defineEmits(['saved'])

const name = ref<string | null>(null)
const tags = ref<string | null>(null)

// @todo: real validate
function save() {
  if (!name.value) return

  const recipe = {
    name: name.value,
    tags: tags.value?.toLowerCase()?.split(/[\s,]+/),
    ingredients: ingredients,
    portions: 1,
  }

  addRecipe(recipe)
  reset()
  emit('saved', name.value)
}
</script>

<template>
  <fieldset class="fieldset">
    <label class="label">Namn*</label>
    <input type="text" class="input w-full" placeholder="Flygande jacob" v-model="name" />

    <label class="label">Taggar</label>
    <input type="text " class="input w-full" placeholder="Lunch, LCHF" v-model="tags" />

    <button class="btn btn-neutral mt-4" @click="save">Spara</button>
  </fieldset>
</template>
