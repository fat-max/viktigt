<script setup>
import FoodSearch from './components/FoodSearch.vue'
import FabMenu from './components/FabMenu.vue'
import DishSummary from './components/DishSummary.vue'
import { computed, reactive } from 'vue'
import { useSettingsStore } from './stores/settings'

const list = reactive([])
const renderList = computed(() => list.length ? list : null)
const { settings } = useSettingsStore();

function add(food) {
  list.push({ ...food, ...{ weight: settings.weight } })
}
</script>

<template>
  <header>
    <h1 class="text-4xl font-extrabold pb-2 text-center sm:text-6xl sm:pb-3">
      <span class="text-accent">viktigt</span>.fat<span class="text-secondary">max</span>.se
    </h1>
    <FoodSearch @add-food="add" />
  </header>

  <main>
    <DishSummary :list="renderList" />

    <button class="btn" onclick="info_modal.showModal()">open modal</button>
    <dialog id="info_modal" class="modal modal-bottom sm:modal-middle">
      <div class="modal-box">
        <h3 class="text-lg font-bold">Hello!</h3>
        <p class="py-4">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vivamus pulvinar lacinia risus.
          Vestibulum auctor id dolor sit amet molestie. Maecenas vel orci tellus. Pellentesque vel urna ornare, accumsan
          sem at, ornare lorem. Nam turpis purus, sollicitudin nec lacinia in, lacinia ac justo. Praesent sodales
          aliquet nibh eget volutpat. Praesent venenatis mi vel lacus cursus, eu finibus mi pharetra. Suspendisse eu
          fermentum mauris, non cursus odio.</p>
        <p class="py-4">Vestibulum facilisis leo sit amet elit ultrices pulvinar. Donec sed consectetur risus. Proin
          cursus ex elementum ipsum hendrerit, sed hendrerit eros fringilla. Donec non faucibus neque. Pellentesque sit
          amet molestie quam, eu dapibus augue. Proin cursus, turpis sit amet ultricies luctus, lacus felis euismod
          massa, dignissim cursus risus ipsum eu orci. Morbi consequat sodales lectus, eu tincidunt ligula commodo id.
          Nullam id dui sit amet dui ultricies tincidunt. Proin lacinia malesuada leo, non pretium leo egestas sit amet.
          Phasellus at finibus nulla, vel consectetur sem. Fusce sit amet dui vitae neque aliquam dapibus. Fusce
          consectetur luctus dictum. Proin luctus nulla enim, sit amet posuere arcu cursus a.</p>
        <p class="py-4">Vestibulum sed mollis lacus. Vestibulum sed augue ut diam laoreet ullamcorper. Nam a molestie
          lorem. Vestibulum lobortis orci quis varius laoreet. Morbi ullamcorper aliquam neque, a tempor dolor euismod
          in. Nulla non nunc rhoncus, mattis lacus vitae, vehicula enim. Proin rutrum nisi lacus, vel dignissim enim
          ullamcorper sit amet. Sed ac varius purus. Nunc non imperdiet purus. Maecenas semper lobortis risus non
          tempor. Phasellus mauris mauris, congue a eros eu, eleifend dapibus elit. Vivamus iaculis porttitor pulvinar.
          Vestibulum interdum fringilla lacus in efficitur. Donec viverra eu arcu ac suscipit.</p>
      </div>
      <form method="dialog" class="modal-backdrop">
        <button>close</button>
      </form>
    </dialog>
  </main>
  <FabMenu />
</template>
