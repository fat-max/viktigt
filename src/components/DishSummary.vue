<script setup>
import { watchEffect, computed, ref } from 'vue'

const { list } = defineProps(['list'])

// watchEffect(() => {
//   // runs only once before 3.5
//   // re-runs when the "foo" prop changes in 3.5+
//   console.log(list)
// })

const nutrients = computed(() => {
  if (!list) return null
  const nutrients = [
    { type: 'energy', label: 'Energi (kcal)', amount: 0 },
    { type: 'protein', label: 'Protein (g)', amount: 0 },
    { type: 'fat', label: 'Fett (g)', amount: 0 },
    { type: 'carbs', label: 'Kolhydrater (g)', amount: 0 },
  ]

  list.forEach(element => {
    const amount = element.weight / 100
    nutrients[0].amount += element['Energi (kcal)'] * amount
    nutrients[1].amount += (element['Protein (g)'] * amount)
    nutrients[2].amount += element['Fett, totalt (g)'] * amount
    nutrients[3].amount += element['Kolhydrater, tillgängliga (g)'] * amount
  })

  return nutrients
})

function color(type) {
  if (type == 'energy') return 'text-warning'
  if (type == 'carbs') return 'text-error'
  if (type == 'protein') return 'text-success'

  return 'text-primary'
}
</script>

<template>

  <div class="grid grid-cols-4 gap-2 my-8">
    <div v-for="n in nutrients" :key="n.type" class="flex flex-col gap-2">
      <div class="stat-title">{{ n.label }}</div>
      <div class="flex gap-2 w-full font-extrabold text-3xl items-center justify-center" :class="color(n.type)">
        {{ n.amount }}
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"
          class="inline-block h-8 w-8 stroke-current">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 10V3L4 14h7v7l9-11h-7z"></path>
        </svg>
      </div>
    </div>
  </div>

  <div class="overflow-x-auto" v-if="list">
    <table class="table table-zebra">
      <thead>
        <tr>
          <th>Livsmedel</th>
          <th>Vikt (g)</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="food in list" :key="food.Livsmedelsnamn">
          <td>{{ food.Livsmedelsnamn }}</td>
          <td><input type="number" :value="food.weight" class="input" placeholder="Gram (g)" /></td>
        </tr>
      </tbody>
    </table>
  </div>
</template>
