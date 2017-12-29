// @flow
import Item from '../models/Item';

const sortIngredients = (ingredients: Array<Item>): Array<Item> => {
  if (ingredients.length === 0) {
    return [];
  }
  return ingredients.sort((a: Item, b: Item) => {
    const first = a.name.toLowerCase();
    const second = b.name.toLowerCase();
    if (first < second) {
      return -1;
    }
    if (first > second) {
      return 1;
    }
    return 0;
  });
};

export default sortIngredients;
