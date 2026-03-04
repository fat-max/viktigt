export enum Actions {
  RECIPES = 'recipes',
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
