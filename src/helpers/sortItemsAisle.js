// @flow
import Item from '../models/Item';

const sortItemsAisle = (items: Array<Item>): Array<Item> => {
  if (!items || items.length === 0) {
    return [];
  }
  return items.sort((a: Item, b: Item) => {
    let parsedA = parseInt(a.aisle, 10);
    let parsedB = parseInt(b.aisle, 10);
    if (isNaN(parsedA)) {
      parsedA = 0;
    }
    if (isNaN(parsedB)) {
      parsedB = 0;
    }
    return parsedA - parsedB;
  });
};

export default sortItemsAisle;
