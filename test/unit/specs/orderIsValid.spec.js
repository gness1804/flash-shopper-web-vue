import { assert } from 'chai';
import orderIsValid from '../../../src/helpers/orderIsValid';
import directions from '../helpers/FakeDirections';

describe('orderIsValid', () => {
  it('should be a function', () => {
    assert.isFunction(orderIsValid);
  });

  it('should return true if given a valid input', () => {
    assert.strictEqual(orderIsValid(3, directions), true);
    assert.strictEqual(orderIsValid(2, directions), true);
    assert.strictEqual(orderIsValid(1, directions), true);
  });

  it('should return false if given bad data (a non-number)', () => {
    assert.strictEqual(orderIsValid('w', directions), false);
  });

  it('should return false if given bad data (a negative number)', () => {
    assert.strictEqual(orderIsValid(-2, directions), false);
  });

  it('should return false if given bad data (a non-integer number)', () => {
    assert.strictEqual(orderIsValid(2.5, directions), false);
  });

  it('should return false if given bad data (a number larger than the length of the dirs array) ', () => {
    assert.strictEqual(orderIsValid(5, directions), false);
  });
});
