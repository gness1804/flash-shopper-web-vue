// @flow
/* global $Keys */

import { AuthInt, CoreFBDataInt } from './CoreFunc';
import { ToastInt } from './Toast';
import Recipe from '../../models/Recipe';
import Item from '../../models/Item';
import Direction from '../../models/Direction';
import { recipeCategories } from '../enums/RecipeCategory';

type RecipeCategory = $Keys<typeof recipeCategories>;

export interface RecipesInt extends AuthInt, CoreFBDataInt, ToastInt {
  recipes: Recipe[];
  title?: string;
  image: string;
  ingredients: Item[];
  directions?: Direction[];
  note?: string;
  source?: string;
  selectedCategories?: RecipeCategory[];
  defaultCategories: RecipeCategory[];
  error: boolean;
  errorMssg?: string;
  reader: FileReader;
  showModal: boolean;
  removeImageString: string;
  addIngredientString: string;
  addDirectionString: string;
  addRecipeString: string;
  sortAlphaString: string;
  sortTimesMadeString: string;
  howManyDirections: number | null;
  categoryToFilter: RecipeCategory;
  v4: string;
}
