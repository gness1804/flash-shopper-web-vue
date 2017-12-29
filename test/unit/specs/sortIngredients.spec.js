import { assert } from 'chai';
import sortIngredients from '../../../src/helpers/sortIngredients';
import ingredients from '../helpers/FakeIngredientsArray';

describe('sortIngredients', () => {
  it('should be a function', () => {
    assert.isFunction(sortIngredients);
  });

  it('should return an empty array if no ingredients', () => {
    assert.deepEqual(sortIngredients(null), []);
  });

  it('should return an empty array if ingredients is empty', () => {
    assert.deepEqual(sortIngredients([]), []);
  });

  it('should return a properly sorted array for valid ingredients', () => {
    const result = sortIngredients(ingredients);
    assert.strictEqual(result[0].name, 'Ground beef');
    assert.strictEqual(result[1].name, 'Salsa');
    assert.strictEqual(result[2].name, 'Tortillas');
  });
});
