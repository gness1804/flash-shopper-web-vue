// @flow

const thereAreItemsInCart = (items: Array<Object>): boolean => {
  if (items.length === 0) {
    return false;
  }
  const test = items.filter((item: Object) => {
    return item.inCart === true;
  });
  if (test.length > 0) {
    return true;
  }
  return false;
};

export default thereAreItemsInCart;
