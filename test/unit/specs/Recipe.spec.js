import { assert } from 'chai';
import Recipe from '../../../src/models/Recipe';
import ingredients from '../helpers/FakeIngredientsArray';
import directions from '../helpers/FakeDirections';

describe('Recipe', () => {
  const beefTacos = new Recipe({
    title: 'Beef Tacos',
    image: 'my/.image',
    ingredients,
    directions,
    note: 'Defrost ground beef before starting',
    source: 'https://yummy-recipes.com',
  });

  it('should be a constructor', () => {
    assert.instanceOf(beefTacos, Recipe);
  });

  it('should create instances with the correct values', () => {
    assert.strictEqual(beefTacos.id, null);
    assert.strictEqual(beefTacos.title, 'Beef Tacos');
    assert.strictEqual(beefTacos.image, 'my/.image');
    assert.strictEqual(beefTacos.ingredients, ingredients);
    assert.strictEqual(beefTacos.directions, directions);
    assert.strictEqual(beefTacos.note, 'Defrost ground beef before starting');
    assert.strictEqual(beefTacos.source, 'https://yummy-recipes.com');
  });
});
