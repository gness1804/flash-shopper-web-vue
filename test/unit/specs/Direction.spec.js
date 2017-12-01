import { assert } from 'chai';
import Direction from '../../../src/models/Direction';

describe('Direction', () => {
  const direction = new Direction('Beat eggs for 10 minutes vigorously.');

  it('should be an instance of a constructor', () => {
    assert.instanceOf(direction, Direction);
  });

  it('should create instances with the correct values', () => {
    assert.isString(direction.id);
    assert.strictEqual(direction.details, 'Beat eggs for 10 minutes vigorously.');
    assert.strictEqual(direction.done, false);
  });
});
