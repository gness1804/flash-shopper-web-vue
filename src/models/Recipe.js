// @flow
import Item from './Item';

class Recipe {
  id: string | null;
  title: string;
  image: string;
  ingredients: Array<Item>;
  directions: Array<string> | null;

  constructor(title: string, image: string, ingredients: Array<Item>, directions?: Array<string>) {
    this.id = null;
    this.title = title;
    this.image = image;
    this.ingredients = ingredients;
    this.directions = directions || null;
  }
}

export default Recipe;
