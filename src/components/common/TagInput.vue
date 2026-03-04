<script setup lang="ts">
import { ref, onMounted } from 'vue'
import Tagify from '@yaireo/tagify'
import IconFilter from '../icons/IconFilter.vue'
import '@yaireo/tagify/dist/tagify.css'

const props = defineProps<{
  modelValue: string
}>()
const emits = defineEmits(['update:modelValue'])

const inputRef = ref(null)
const tagify = ref(null)

function handleChange(e) {
  const str = e.target.value
  if (!str) {
    emits("update:modelValue", [])
    return
  }

  const ans = str.split(',')
  emits("update:modelValue", ans)
}

onMounted(() => {
  tagify.value = new Tagify(inputRef.value, {
    originalInputValueFormat: (valuesArr) =>
      valuesArr.map((item) => item.value).join(','),
  })
  tagify.value.loadOriginalValues(props.modelValue)
})
</script>

<template>
  <label class="S">
    <IconFilter class="h-[1em] opacity-50" />
    <input type="search" ref="inputRef" class="grow" placeholder="Filtrera på taggar" />
  </label>
</template>
