<script setup lang="ts">
import { IconInfo, IconCogs, IconProfile, IconDots } from './icons'

const emit = defineEmits(['action'])

</script>

<template>
  <div class="fab">
    <div tabindex="0" role="button" class="btn btn-circle btn-lg btn-accent">
      <IconDots />
    </div>

    <!-- Main Action button replaces the original button when FAB is open -->
    <button class="fab-main-action btn btn-circle btn-lg">
      <IconDots />
    </button>

    <button class="btn btn-circle btn-lg" @click="emit('action', 'profile')">
      <IconProfile />
    </button>
    <button class="btn btn-circle btn-lg" @click="emit('action', 'settings')">
      <IconCogs />
    </button>
    <button class="btn btn-circle btn-lg" @click="emit('action', 'info')">
      <IconInfo />
    </button>
  </div>
</template>
