import { assert } from 'chai';
import thereAreItemsInCart from '../../../src/helpers/thereAreItemsInCart';
import inCartItems from '../helpers/FakeItemsArray';

describe('thereAreItemsInCart', () => {
  const noInCartItems = [
    {
      id: '1.5',
      name: 'Candy',
      aisle: '15',
      note: 'No Junior Mints!',
      quantity: '3 boxes',
      inCart: false,
    },
    {
      id: '2.5',
      name: 'Brown rice',
      aisle: '11',
      note: '',
      quantity: '2 boxes',
      inCart: false,
    },
  ];
  const emptyItems = [];

  it('should be a function', () => {
    assert.isFunction(thereAreItemsInCart);
  });

  it('should return true if one or more items is in cart', () => {
    assert.strictEqual(thereAreItemsInCart(inCartItems), true);
  });

  it('should return false if no items are in cart', () => {
    assert.strictEqual(thereAreItemsInCart(noInCartItems), false);
  });

  it('should return false if items is an empty array', () => {
    assert.strictEqual(thereAreItemsInCart(emptyItems), false);
  });
});
