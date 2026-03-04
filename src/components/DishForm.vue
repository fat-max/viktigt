<script setup lang="ts">
import { ref } from 'vue'
import { useRecipesStore } from '@/stores/recipes'
import { useEditStore } from '@/stores/edit'
import { v4 as uuidv4 } from 'uuid'

const { updateRecipes } = useRecipesStore()
const { recipe, reset } = useEditStore()

const emit = defineEmits(['dishSaved'])
const name = ref<string>(recipe.name)
const tags = ref<string | null>(recipe?.tags?.join(',') ?? null)

// @todo: real validate
function save() {
  if (!name.value) return

  updateRecipes({
    id: recipe.id ?? uuidv4(),
    name: name.value,
    tags: tags.value?.toLowerCase()?.split(/[\s,]+/),
    ingredients: recipe.ingredients,
    portions: 1,
  })

  reset()
  emit('dishSaved', name.value)
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
