// @flow
import Item from './Item';

interface Opts {
  title: string,
  image: string,
  ingredients: Item[],
  directions?: string[],
  note?: string,
  source?: string,
}
class Recipe {
  id: string | null;
  title: string;
  image: string;
  ingredients: Array<Item>;
  directions: Array<string> | null;
  note: string;
  source: string;

  constructor(opts: Opts) {
    this.id = null;
    this.title = opts.title;
    this.image = opts.image;
    this.ingredients = opts.ingredients;
    this.directions = opts.directions || null;
    this.note = opts.note || '';
    this.source = opts.source || '';
  }
}

export default Recipe;
