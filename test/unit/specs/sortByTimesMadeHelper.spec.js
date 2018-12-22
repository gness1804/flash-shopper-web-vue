import { assert } from 'chai';
import sort from '../../../src/helpers/sortByTimesMadeHelper';
import recipes from '../helpers/FakeRecipesArray';
import Recipe from '../../../src/models/Recipe';

describe('sortByTimesMadeHelper', () => {
  it('should be a function', () => {
    assert.isFunction(sort);
  });

  it('should return an empty array if no items', () => {
    assert.deepEqual(sort(null), []);
  });

  it('should return an empty array if items is empty', () => {
    assert.deepEqual(sort([]), []);
  });

  it('should properly sort an array of recipes (highest to lower in order of times made)', () => {
    const result = sort(recipes);
    assert.strictEqual(result[0].timesMade, 5);
    assert.strictEqual(result[1].timesMade, 2);
    assert.strictEqual(result[2].timesMade, 0);
  });

  it('should properly sort an array of recipes if one does not have a defined "timesMade" property', () => {
    const recipes2: Recipe[] = [
      ...recipes,
      {
        id: '25',
        title: 'Spaghetti with clam sauce',
        image: 'my/fake.image4',
        ingredients: [
          {
            id: '37293792',
            name: 'minced clams',
            aisle: '4',
            note: '',
            quantity: '3 units',
            inCart: false,
            ingredientId: 379030803,
          },
        ],
        note: '',
      },
    ];
    const result = sort(recipes2);
    assert.strictEqual(result.length, 4);
    assert.strictEqual(result[0].timesMade, 5);
    assert.strictEqual(result[1].timesMade, 2);
    assert.strictEqual(result[2].timesMade, 0);
    assert.strictEqual(result[3].timesMade, undefined);
    assert.strictEqual(result[3].title, 'Spaghetti with clam sauce');
  });
});
