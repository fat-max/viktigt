<script setup lang="ts">
import { toRefs } from 'vue'
import { useToast, type Toast } from '@/composables/useToast'

const { toasts } = useToast()

const classObj = (toast: Toast) => ({
  'alert-info': toast.type == 'info',
  'alert-success': toast.type == 'success',
  'alert-error': toast.type == 'error',
  'alert-warning': toast.type == 'warning',
})
</script>

<template>
  <div class="toast toast-center">
    <div v-for="toast in toasts" :key="toast.id" class="alert" :class="classObj(toast)">
      <span>
        {{ toast.message }}
      </span>
    </div>
  </div>
</template>
