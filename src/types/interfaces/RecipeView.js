// @flow

import { AuthInt, CoreFBDataInt } from './CoreFunc';
import { ToastInt } from './Toast';
import Recipe from '../../models/Recipe';
import Item from '../../models/Item';
import type { RecipeCategory } from '../enums/RecipeCategory';

export interface RecipeViewInt extends AuthInt, CoreFBDataInt, ToastInt {
  id: string;
  title: string;
  image: string;
  ingredients: Item[];
  directions: string[];
  storedIngredients: Item[];
  note: string;
  source: string;
  targetRecipe: Recipe;
  defaultCategories: RecipeCategory[];
  initCategories: RecipeCategory[];
  selectedCategories: RecipeCategory[];
  reader: FileReader;
  showModal: boolean;
  removeImageString: string;
  addIngredientString: string;
  addDirectionString: string;
  goHomeString: string;
  showTimerModal: boolean;
  uncheckAllString: string;
  showShowHideContainer: boolean;
  showInputsString: string;
  hideInputsString: string;
  showNoteModal: boolean;
  showEditModal: boolean;
  selectedIngredient: Item;
  ingNames: Item[];
  showAddSourceInput: boolean;
  validateURL: () => boolean;
  timesMade: number;
  datesMade: number[];
  lastMade: number | null;
  askToUpdateTimesMade: boolean;
}
