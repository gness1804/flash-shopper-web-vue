// @flow

import { AuthInt, CoreFBDataInt } from './CoreFunc';
import { ToastInt } from './Toast';
import Recipe from '../../models/Recipe';
import Item from '../../models/Item';
import Direction from '../../models/Direction';

export interface RecipesInt extends AuthInt, CoreFBDataInt, ToastInt {
  recipes: Recipe[],
  title?: string,
  image: string,
  ingredients: Item[],
  directions?: Direction[],
  note?: string,
  source?: string,
  error: boolean,
  errorMssg?: string,
  reader: Object,
  showModal: boolean,
  removeImageString: string,
  addIngredientString: string,
  addDirectionString: string,
  addRecipeString: string,
  sortAlphaString: string,
  sortTimesMadeString: string,
  howManyDirections: number | null,
}
