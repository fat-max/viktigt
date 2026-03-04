<script setup lang="ts">
import { computed, ref, watch } from 'vue'

export type ToastType = 'info' | 'success' | 'error' | 'warning' | 'default' | null

interface Props {
  message: String
  type?: ToastType
}

const { message, type = 'default' } = defineProps<Props>()
const fadeOut = ref('')

const typeClass = computed(() => {
  switch (type) {
    case 'info':
      return 'alert-info'
    case 'success':
      return 'alert-success'
    case 'error':
      return 'alert-error'
    case 'warning':
      return 'alert-warning'
  }
})

watch(
  () => message,
  () => {
    fadeOut.value = ''

    setTimeout(() => {
      fadeOut.value = 'translate-y-[100px]'
    }, 2000)
  },
)

const fade = computed(() => fadeOut.value)
</script>

<template>
  <div class="toast toast-center">
    <div class="alert transition duration-2500 ease-in-out" :class="`${typeClass} ${fade}`">
      <span>
        {{ message }}
      </span>
    </div>
  </div>
</template>
