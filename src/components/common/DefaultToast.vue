<script setup lang="ts">
import { computed, ref, watch } from 'vue'

export type ToastType = 'info' | 'success' | 'error' | 'warning' | 'default' | null

interface Props {
  message: String
  type?: ToastType
}

const props = withDefaults(defineProps<Props>(), {
  type: 'default'
})
const fadeOut = ref('')

const typeClass = computed(() => {
  switch (props.type) {
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
  () => props.message,
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
        {{ props.message }}
      </span>
    </div>
  </div>
</template>
