import { assert } from 'chai';
import flattenArr from '../../../src/helpers/flattenArr';
import items from '../helpers/FakePantryShortItems';

describe('flattenArr', () => {
  it('should be a function', () => {
    assert.isFunction(flattenArr);
  });

  it('should return a string of names with proper data inputted', () => {
    assert.deepEqual(flattenArr(items), ['Bread', 'Sausage', 'Milk', 'Frozen onions']);
  });
});
