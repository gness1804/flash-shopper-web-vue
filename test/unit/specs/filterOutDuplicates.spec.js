import { assert } from 'chai';
import { filterOutDuplicateNames } from '../../../src/helpers/filterOutDuplicates';

describe('filterOutDuplicates', () => {
  const names = ['andouille sausage', 'jambalaya rice', 'clams', 'butter', 'clams', 'eggs'];

  it('should be a function', () => {
    assert.isFunction(filterOutDuplicateNames);
  });

  it('should return the expected value', () => {
    const expectedValue = ['andouille sausage', 'butter', 'clams', 'eggs', 'jambalaya rice'];
    assert.deepEqual(filterOutDuplicateNames(names), expectedValue);
  });

  it('should return an empty array if the input has no length.', () => {
    const expectedValue = [];
    assert.deepEqual(filterOutDuplicateNames([]), expectedValue);
  });
});
