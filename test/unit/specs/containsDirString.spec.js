import { assert } from 'chai';
import containsDirString from '../../../src/helpers/containsDirString';

describe('containsDirString', () => {
  it('should be a function', () => {
    assert.isFunction(containsDirString);
  });

  it('should return true if the ingredient name contains a word from the direction', () => {
    const dir = 'Put the beans and the carrots into the soup.';
    const name = 'Black beans';
    assert.strictEqual(containsDirString(dir, name), true);
  });

  it('should return true if the ingredient name contains a word from the direction (casing mismatch and period)', () => {
    const dir = 'Heat up the rice.';
    const name = 'Rice';
    assert.strictEqual(containsDirString(dir, name), true);
  });

  it('should return false if there is not a shared word between the direction and the ingredient name', () => {
    const dir = 'Chop up the green onions.';
    const name = 'Diced tomatoes';
    assert.strictEqual(containsDirString(dir, name), false);
  });
});
