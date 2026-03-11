export enum Actions {
  RECIPES = 'recipes',
  PREFERENCE = 'preference',
}

export enum Nutrients {
  ENERGY = 'energy',
  PROTEIN = 'protein',
  FAT = 'fat',
  CARBOHYDRATES = 'carbohydrates',
}

export interface Ingredient {
  Livsmedelsnamn: string
  Livsmedelsnummer: Number
  weight: Number
}

export interface Recipe {
  id?: string
  name: string
  portions: Number
  tags?: string[]
  ingredients: Ingredient[]
}
