<script setup lang="ts">
import { useTemplateRef } from 'vue'

interface ModalProps {
  closeBtn?: boolean
  closeOutside?: boolean
  title?: string
}

const { closeBtn = false, closeOutside = true, title = null } = defineProps<ModalProps>()

const ref = useTemplateRef('modal-ref')

defineExpose({
  ref,
})
</script>

<template>
  <dialog id="default_modal" ref="modal-ref" class="modal modal-bottom sm:modal-middle">
    <div class="modal-box">
      <form method="dialog" v-if="closeBtn">
        <button class="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">✕</button>
      </form>
      <h3 v-if="title" class="text-lg font-bold">{{ title }}</h3>

      <slot></slot>

      <form v-if="closeOutside" method="dialog" class="modal-backdrop">
        <button>close</button>
      </form>
    </div>
  </dialog>
</template>
