// @flow
import Item from './Item';

class Recipe {
  id: string | null;
  title: string;
  image: string;
  ingredients: Array<Item>;
  directions: Array<string> | null;
  note: string;

  constructor(title: string, image: string, ingredients: Array<Item>, directions?: Array<string>, note: string) {
    this.id = null;
    this.title = title;
    this.image = image;
    this.ingredients = ingredients;
    this.directions = directions || null;
    this.note = note || '';
  }
}

export default Recipe;
