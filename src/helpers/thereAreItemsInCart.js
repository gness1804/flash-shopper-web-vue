// @flow

import Item from '../models/Item';

const thereAreItemsInCart = (items: Item[]): boolean => {
  if (items.length === 0) {
    return false;
  }
  const test = items.filter((item: Item) => {
    return item.inCart === true;
  });
  if (test.length > 0) {
    return true;
  }
  return false;
};

export default thereAreItemsInCart;
