//

import Item from '../models/Item';

const thereAreItemsInCart = items => {
  if (items.length === 0) {
    return false;
  }
  const test = items.filter(item => {
    return item.inCart === true;
  });
  if (test.length > 0) {
    return true;
  }
  return false;
};

export default thereAreItemsInCart;
