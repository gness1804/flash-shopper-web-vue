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

  it('should return true if name differs from initName', () => {
    const options2 = { ...options, name: 'Light Cream' };
    assert.strictEqual(thereAreChanges(options2), true);
  });

  it('should return true if aisle differs from initAisle', () => {
    const options2 = { ...options, aisle: '' };
    assert.strictEqual(thereAreChanges(options2), true);
  });

  it('should return true if note differs from initNote', () => {
    const options2 = { ...options, note: 'Avoid off brand.' };
    assert.strictEqual(thereAreChanges(options2), true);
  });

  it('should return true if quantity differs from initQty', () => {
    const options2 = { ...options, quantity: '12 oz' };
    assert.strictEqual(thereAreChanges(options2), true);
  });
});
