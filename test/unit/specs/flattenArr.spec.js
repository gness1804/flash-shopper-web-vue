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

  it('should return an empty array for bad data (empty array input)', () => {
    assert.deepEqual(flattenArr([]), []);
  });

  it('should return an empty array for bad data (array input does not contain object children)', () => {
    assert.deepEqual(flattenArr(['Milk', 'Sushi']), []);
  });

  it('should return an empty array for bad data (array input does not contain object children with "name" keys)', () => {
    const fakeItemsBadData = [
      {
        id: '1',
        title: 'Ground beef',
      },
      {
        id: '2',
        title: 'Chicken thighs',
      },
    ];
    assert.deepEqual(flattenArr(fakeItemsBadData), []);
  });
});
