<script setup lang="ts">
import { useTemplateRef } from 'vue'

type Size = 'sm' | 'md' | 'lg'

interface ModalProps {
  closeBtn?: boolean
  closeOutside?: boolean
  title?: string | null
  size?: Size
}

const props = withDefaults(defineProps<ModalProps>(), {
  closeBtn: false,
  closeOutside: true,
  title: null,
})

const ref = useTemplateRef('modal-ref')

defineExpose({
  ref,
})
</script>

<template>
  <dialog id="default_modal" ref="modal-ref" class="modal modal-bottom sm:modal-middle">
    <div class="modal-box max-w-full">
      <form method="dialog" v-if="props.closeBtn">
        <button class="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">✕</button>
      </form>
      <h3 v-if="props.title" class="text-lg font-bold">{{ props.title }}</h3>

      <slot></slot>

      <form v-if="props.closeOutside" method="dialog" class="modal-backdrop">
        <button>close</button>
      </form>
    </div>
  </dialog>
</template>
