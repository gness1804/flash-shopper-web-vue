import { assert } from 'chai';
import titleMatchesMainItem from '../../../src/helpers/titleMatchesMainItem';
import items from '../helpers/FakePantryShortItems';

describe('titleMatchesMainItem', () => {
  it('should be a function', () => {
    assert.isFunction(titleMatchesMainItem);
  });

  it('should return false if the items from main array is null', () => {
    assert.strictEqual(titleMatchesMainItem('milk', null), false);
  });

  it('should return false if the items from main array length is zero', () => {
    assert.strictEqual(titleMatchesMainItem('milk', []), false);
  });

  it('should return false if the items from main array do not have any items with the property of name', () => {
    const items2 = [
      {
        id: '1',
        title: 'Milk',
      },
      {
        id: '2',
        title: 'Bread',
      },
    ];
    assert.strictEqual(titleMatchesMainItem('milk', items2), false);
  });

  it('should return true if at least one of the items from main list match the name of the pantry item', () => {
    assert.strictEqual(titleMatchesMainItem('milk', items), true);
    assert.strictEqual(titleMatchesMainItem('Sausage', items), true);
    assert.strictEqual(titleMatchesMainItem('frozen onions', items), true);
  });

  it('should return false if none of the items from main list match the name of the pantry item', () => {
    assert.strictEqual(titleMatchesMainItem('ice cream', items), false);
    assert.strictEqual(titleMatchesMainItem('milk and cheese', items), false);
  });
});
