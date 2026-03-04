export interface Ingredient {
  Livsmedelsnamn: string
  Livsmedelsnummer: Number
  weight: Number
}

export interface Recipe {
  name: string
  portions: Number
  tags?: string[]
  ingredients: Ingredient[]
}
