<script setup lang="ts">
import { computed, useTemplateRef } from 'vue'

type Type = 'info' | 'success' | 'error' | 'warning' | 'default'

interface Props {
  type?: Type
}

const { type = 'default' } = defineProps<Props>()

const cls = computed(() => `alert-${type}`)
</script>

<template>
  <div class="toast toast-center">
    <div class="alert" :class="cls">
      <span>
        <slot></slot>
      </span>
    </div>
  </div>
</template>
