<script setup lang="ts">
import { useTemplateRef, computed, watch } from 'vue'

export type Size = 'xs' | 'sm' | 'md' | 'lg'

interface ModalProps {
  closeBtn?: boolean
  closeOutside?: boolean
  title?: string | null
  size?: Size
}

const props = withDefaults(defineProps<ModalProps>(), {
  closeBtn: true,
  closeOutside: true,
  title: null,
  size: 'md',
})

const ref = useTemplateRef('modal-ref')

const sizeClass = computed(() => {
  if (props.size == 'lg') return 'max-w-full'
  if (props.size == 'sm') return 'sm:max-w-96'
  if (props.size == 'xs') return 'sm:max-w-72'

  return ''
})

defineExpose({
  ref,
})
</script>

<template>
  <dialog id="default_modal" ref="modal-ref" class="modal modal-bottom sm:modal-middle">
    <div class="modal-box" :class="sizeClass">
      <form method="dialog" v-if="closeBtn">
        <button class="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">✕</button>
      </form>
      <h3 v-if="title" class="text-lg font-bold">{{ title }}</h3>

      <slot></slot>
    </div>

    <form v-if="closeOutside" method="dialog" class="modal-backdrop">
      <button>close</button>
    </form>
  </dialog>
</template>
