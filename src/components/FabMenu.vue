<script setup lang="ts">
import { IconInfo, IconCogs, IconProfile, IconDots, IconRecipes } from './icons'
import { Actions } from '@/stores/models'
const emit = defineEmits(['action'])
</script>

<template>
  <div class="fab">
    <div tabindex="0" role="button" class="btn btn-circle btn-lg btn-secondary">
      <IconDots class="size-6" />
    </div>

    <!-- Main Action button replaces the original button when FAB is open -->
    <button class="fab-main-action btn btn-circle btn-lg">
      <IconDots class="size-6" />
    </button>

    <div>
      Recept
      <button class="btn btn-circle btn-lg" @click="emit('action', Actions.RECIPES)">
        <IconRecipes class="size-6" />
      </button>
    </div>
    <!-- <div>
      Profil
      <button class="btn btn-circle btn-lg" @click="emit('action', 'profile')">
        <IconProfile class="size-6" />
      </button>
    </div>
    <div>
      Inställningar
      <button class="btn btn-circle btn-lg" @click="emit('action', 'settings')">
        <IconCogs class="size-6" />
      </button>
    </div>
    <div>
      Om
      <button class="btn btn-circle btn-lg" @click="emit('action', 'info')">
        <IconInfo class="size-6" />
      </button>
    </div> -->
  </div>
</template>
