// @flow
import Item from './Item';
import type { RecipeCategory } from '../types/enums/RecipeCategory';

interface Opts {
  title: string;
  image: string;
  ingredients: Item[];
  directions?: string[];
  note?: string;
  source?: string;
  timesMade?: number;
  datesMade: number[];
  categories: RecipeCategory[];
}

class Recipe {
  id: string | null;
  title: string;
  image: string;
  ingredients: Array<Item>;
  directions: Array<string> | null;
  note: string;
  source: string;
  timesMade: number;
  datesMade: number[];
  categories: RecipeCategory[];

  constructor(opts: Opts) {
    this.id = null;
    this.title = opts.title;
    this.image = opts.image;
    this.ingredients = opts.ingredients;
    this.directions = opts.directions || null;
    this.note = opts.note || '';
    this.source = opts.source || '';
    this.timesMade = opts.timesMade || 0;
    this.datesMade = opts.datesMade || [];
    this.categories = opts.categories || [];
  }
}

export default Recipe;
