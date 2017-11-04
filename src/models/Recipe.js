// @flow
import Item from './Item';

class Recipe {
  id: number | null;
  title: string;
  image: string;
  ingredient: typeof Item = Item;
  directions: Array<string> | null;

  constructor(title: string, image: string, ingredient: Object, directions: Array<string>) {
    this.id = null;
    this.title = title;
    this.image = image;
    this.ingredient = ingredient;
    this.directions = directions || null;
  }
}

export default Recipe;
