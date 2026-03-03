<script setup lang="ts">
import { IconInfo, IconCogs, IconProfile, IconDots } from './icons'
</script>

<template>
  <div class="fab">
    <div tabindex="0" role="button" class="btn btn-circle btn-lg btn-accent">
      <IconDots />
    </div>

    <!-- Main Action button replaces the original button when FAB is open -->
    <button class="fab-main-action btn btn-circle btn-lg">
      <IconProfile />
    </button>

    <!--!Font Awesome Free v7.2.0 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license/free Copyright 2026 Fonticons, Inc.-->
    <button class="btn btn-circle btn-lg">
      <IconProfile />
    </button>
    <button class="btn btn-circle btn-lg">
      <IconCogs />
    </button>
    <button class="btn btn-circle btn-lg">
      <IconInfo />
    </button>
  </div>
</template>
