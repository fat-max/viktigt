import type { Ingredient } from "@/stores/models"

export function nutrientsCalculator(ingredients: Ingredient[]) {
  const nutrients = [
    { type: 'energy', label: 'Energi (kcal)', amount: 0 },
    { type: 'protein', label: 'Protein (g)', amount: 0 },
    { type: 'fat', label: 'Fett (g)', amount: 0 },
    { type: 'carbs', label: 'Kolhydrater (g)', amount: 0 },
  ]

  ingredients.forEach((ingredient) => {
    if (!ingredient.weight) return

    const amount = ingredient.weight / 100
    // @ts-ignore
    nutrients[0].amount += ingredient['Energi (kcal)'] * amount
    // @ts-ignore
    nutrients[1].amount += ingredient['Protein (g)'] * amount
    // @ts-ignore
    nutrients[2].amount += ingredient['Fett, totalt (g)'] * amount
    // @ts-ignore
    nutrients[3].amount += ingredient['Kolhydrater, tillgängliga (g)'] * amount
  })

  return nutrients
}
