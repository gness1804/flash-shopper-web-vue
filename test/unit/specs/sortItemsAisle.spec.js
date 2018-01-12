import { assert } from 'chai';
import sort from '../../../src/helpers/sortItemsAisle';
import items from '../helpers/FakeIngredientsArray';

describe('sortItemsAisle', () => {
  it('should be a function', () => {
    assert.isFunction(sort);
  });

  it('should return an empty array if no items', () => {
    assert.deepEqual(sort(null), []);
  });

  it('should return an empty array if items is empty', () => {
    assert.deepEqual(sort([]), []);
  });

  it('should return a properly sorted array with valid input', () => {
    const result = sort(items);
    assert.strictEqual(result[0].aisle, 'Meat');
    assert.strictEqual(result[1].aisle, '10');
    assert.strictEqual(result[2].aisle, '12');
  });

  it('should return a properly sorted array with valid input including one blank aisle', () => {
    const items2 = [...items, {
      id: '35',
      name: 'Lara bars',
      aisle: '',
      note: '',
      quantity: '2',
      inCart: false,
      ingredientId: 37903803,
    }];
    const result = sort(items2);
    assert.strictEqual(result[0].aisle, 'Meat');
    assert.strictEqual(result[1].aisle, '');
    assert.strictEqual(result[2].aisle, '10');
    assert.strictEqual(result[3].aisle, '12');
  });
});
