import { assert } from 'chai';
import Recipe from '../../../src/models/Recipe';
import ingredients from '../helpers/FakeIngredientsArray';
import directions from '../helpers/FakeDirections';

describe('Recipe', () => {
  const beefTacos = new Recipe('Beef Tacos', 'my/.image', ingredients, directions);

  it('should be a constructor', () => {
    assert.instanceOf(beefTacos, Recipe);
  });

  it('should create instances with the correct values', () => {
    assert.strictEqual(beefTacos.id, null);
    assert.strictEqual(beefTacos.title, 'Beef Tacos');
    assert.strictEqual(beefTacos.image, 'my/.image');
    assert.strictEqual(beefTacos.ingredients, ingredients);
    assert.strictEqual(beefTacos.directions, directions);
  });
});
