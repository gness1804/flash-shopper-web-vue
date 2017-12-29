// @flow
import Item from '../models/Item';

const sortItems = (items: Array<Item>): Array<Item> => {
  if (!items || items.length === 0) {
    return [];
  }
  return items.sort((a: Item, b: Item) => {
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

export default sortItems;
