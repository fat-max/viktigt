<script setup lang="ts">
import { IconInfo, IconCogs, IconProfile, IconDots, IconRecipes } from './icons'

const emit = defineEmits(['action'])
</script>

<template>
  <div class="fab">
    <div tabindex="0" role="button" class="btn btn-circle btn-lg btn-secondary">
      <IconDots />
    </div>

    <!-- Main Action button replaces the original button when FAB is open -->
    <button class="fab-main-action btn btn-circle btn-lg">
      <IconDots />
    </button>

    <div>
      Recept
      <button class="btn btn-circle btn-lg" @click="emit('action', 'recipes')">
        <IconRecipes />
      </button>
    </div>
    <div>
      Profil
      <button class="btn btn-circle btn-lg" @click="emit('action', 'profile')">
        <IconProfile />
      </button>
    </div>
    <div>
      Inställningar
      <button class="btn btn-circle btn-lg" @click="emit('action', 'settings')">
        <IconCogs />
      </button>
    </div>
    <div>
      Om
      <button class="btn btn-circle btn-lg" @click="emit('action', 'info')">
        <IconInfo />
      </button>
    </div>
  </div>
</template>
