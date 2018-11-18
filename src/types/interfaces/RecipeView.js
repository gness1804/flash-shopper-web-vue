// @flow

import { AuthInt, CoreFBDataInt } from './CoreFunc';
import { ToastInt } from './Toast';
import Recipe from '../../models/Recipe';
import Item from '../../models/Item';

export interface RecipeViewInt extends AuthInt, CoreFBDataInt, ToastInt {
  id: string,
  title: string,
  image: string,
  ingredients: Item[],
  directions: string[],
  storedIngredients: Item[],
  note: string,
  source: string,
  targetRecipe: Recipe,
  reader: FileReader,
  showModal: boolean,
  removeImageString: string,
  addIngredientString: string,
  addDirectionString: string,
  goHomeString: string,
  showTimerModal: boolean,
  uncheckAllString: string,
  showShowHideContainer: boolean,
  showInputsString: string,
  hideInputsString: string,
  showNoteModal: boolean,
  showEditModal: boolean,
  selectedIngredient: Item,
  ingNames: Item[],
  dirToCheckAgainst: string,
  showAddSourceInput: boolean,
  validateURL: () => boolean,
  timesMade: number,
  datesMade: number[],
  lastMade: number | null,
}
