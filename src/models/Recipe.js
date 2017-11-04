// @flow
import Item from './Item';

class Recipe {
  id: number | null;
  title: string;
  image: string;
  ingredient: typeof Item = Item;

  constructor(title: string, image: string, ingredient: Object) {
    this.id = null;
    this.title = title;
    this.image = image;
    this.ingredient = ingredient;
  }
}

export default Recipe;
