import { assert } from 'chai';
import sortItems from '../../../src/helpers/sortItems';
import items from '../helpers/FakeIngredientsArray';
import recipes from '../helpers/FakeRecipesArray';

describe('sortItems', () => {
  it('should be a function', () => {
    assert.isFunction(sortItems);
  });

  it('should return an empty array if no items', () => {
    assert.deepEqual(sortItems(null), []);
  });

  it('should return an empty array if items is empty', () => {
    assert.deepEqual(sortItems([]), []);
  });

  it('should return a properly sorted array for valid items', () => {
    const result = sortItems(items);
    assert.strictEqual(result[0].name, 'Ground beef');
    assert.strictEqual(result[1].name, 'Salsa');
    assert.strictEqual(result[2].name, 'Tortillas');
  });

  it('should return a properly sorted array for valid recipes', () => {
    const result = sortItems(recipes);
    assert.strictEqual(result[0].title, 'Apple pudding');
    assert.strictEqual(result[1].title, 'Chocolate cake');
    assert.strictEqual(result[2].title, 'Pumpkin pie');
  });
});
