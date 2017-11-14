import { assert } from 'chai';
import filterOutDuplicates from '../../../src/helpers/filterOutDuplicates';

describe('filterOutDuplicates', () => {
  const names = ['andouille sausage', 'jambalaya rice', 'clams', 'butter', 'clams', 'eggs'];

  it('should be a function', () => {
    assert.isFunction(filterOutDuplicates);
  });

  it('should return the expected value', () => {
    const expectedValue = ['andouille sausage', 'butter', 'clams', 'eggs', 'jambalaya rice'];
    assert.deepEqual(filterOutDuplicates(names), expectedValue);
  });
});
