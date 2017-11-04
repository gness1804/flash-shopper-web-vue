import { assert } from 'chai';
import Recipe from '../../../src/models/Recipe';
import items from '../helpers/FakeItemsArray';

describe('Recipe', () => {
  const directions = ['Heat up the skillet', 'Cook the ground beef until brown', 'Add water and taco seasoning', 'Cook until not watery', 'Place meat in tortillas'];
  const beefTacos = new Recipe('Beef Tacos', 'my/.image', items, directions);

  it('should be a constructor', () => {
    assert.instanceOf(beefTacos, Recipe);
  });

  it('should create instances with the correct values', () => {
    assert.strictEqual(beefTacos.id, null);
    assert.strictEqual(beefTacos.title, 'Beef Tacos');
    assert.strictEqual(beefTacos.image, 'my/.image');
    assert.strictEqual(beefTacos.ingredients, items);
    assert.strictEqual(beefTacos.directions, directions);
  });
});
