<script setup lang="ts">
import { computed, useTemplateRef } from 'vue'
import { useModal } from '@/composables/useModal'

const ref = useTemplateRef('modal')
const { title, component, size, props } = useModal(ref)

const sizeClass = computed(() => {
  if (size.value == 'lg') return 'max-w-full'
  if (size.value == 'sm') return 'sm:max-w-96'
  if (size.value == 'xs') return 'sm:max-w-72'

  return ''
})
</script>

<template>
  <dialog ref="modal" class="modal modal-bottom sm:modal-middle">
    <div class="modal-box" :class="sizeClass">
      <h3 v-if="title" class="text-lg font-bold">{{ title }}</h3>
      <component :is="component" v-bind="props" />
    </div>

    <form method="dialog" class="modal-backdrop">
      <button>close</button>
    </form>
  </dialog>
</template>
