import { Nutrients, type Recipe, type Ingredient } from '@/stores/models'

export function nutrientsCalculator(recipe: Recipe | null, perPortion = false) {
  const nutrients = [
    { type: Nutrients.ENERGY, label: 'Energi (kcal)', amount: 0 },
    { type: Nutrients.PROTEIN, label: 'Protein (g)', amount: 0 },
    { type: Nutrients.FAT, label: 'Fett (g)', amount: 0 },
    { type: Nutrients.CARBOHYDRATES, label: 'Kolhydrater (g)', amount: 0 },
  ]

  recipe?.ingredients?.forEach((ingredient: Ingredient) => {
    if (!ingredient.weight) return

    const amount = parseInt(`${ingredient?.weight ?? 0}`) / 100
    // @ts-ignore
    nutrients[0].amount += ingredient['Energi (kcal)'] * amount
    // @ts-ignore
    nutrients[1].amount += ingredient['Protein (g)'] * amount
    // @ts-ignore
    nutrients[2].amount += ingredient['Fett, totalt (g)'] * amount
    // @ts-ignore
    nutrients[3].amount += ingredient['Kolhydrater, tillgängliga (g)'] * amount
  })

  return nutrients.map((n) => {
    // @ts-ignore
    n.amount = Math.round(n.amount / (perPortion ? recipe.portions : 1) * 10) / 10
    return n
  })
}
