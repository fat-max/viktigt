<script setup lang="ts">
import { IconPreference, IconDots, IconRecipes } from './icons'
import { type Recipe } from '@/stores/models'
import { useEditStore } from '@/stores'
import PreferenceForm from './PreferenceForm.vue'
import RecipesList from './RecipesList.vue'
import { useModal } from '@/composables/useModal'

const { open, close } = useModal(null)
const { setRecipe } = useEditStore()
</script>

<template>
  <div class="fab">
    <div tabindex="0" role="button" class="btn btn-circle btn-lg btn-accent">
      <IconDots class="size-6" />
    </div>

    <!-- Main Action button replaces the original button when FAB is open -->
    <button class="fab-main-action btn btn-circle btn-lg">
      <IconDots class="size-6" />
    </button>

    <div>
      Recept
      <button
        class="btn btn-circle btn-lg"
        @click="
          open({
            component: RecipesList,
            title: 'Mina recept',
            props: {
              onClick: (recipe: Recipe) => {
                setRecipe(recipe)
                close()
              },
            },
            size: 'lg',
          })
        "
      >
        <IconRecipes class="size-6" />
      </button>
    </div>
    <div>
      Inställningar
      <button
        class="btn btn-circle btn-lg"
        @click="open({ component: PreferenceForm, title: 'Standardinställningar', size: 'xs' })"
      >
        <IconPreference class="size-6" />
      </button>
    </div>
  </div>
</template>
