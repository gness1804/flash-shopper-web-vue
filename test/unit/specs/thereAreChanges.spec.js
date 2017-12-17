import { assert } from 'chai';
import thereAreChanges from '../../../src/helpers/thereAreChanges';

describe('thereAreChanges', () => {
  const options = {
    name: 'Heavy Cream',
    aisle: 'Dairy',
    note: '',
    quantity: '8 oz',
    initName: 'Heavy Cream',
    initAisle: 'Dairy',
    initNote: '',
    initQty: '8 oz',
  };

  it('should be a function', () => {
    assert.isFunction(thereAreChanges);
  });

  it('should return false if there are no changes', () => {
    assert.strictEqual(thereAreChanges(options), false);
  });
});
