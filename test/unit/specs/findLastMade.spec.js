import { assert } from 'chai';
import App from '../../../src/helpers/findLastMade';

describe('findLastMade', () => {
  it('should be a function', () => {
    assert.isFunction(App);
  });

  it('should return null for a non-array', () => {
    assert.strictEqual(App('Not an array'), null);
  });

  it('should return null if there are no dates', () => {
    assert.strictEqual(App([]), null);
  });

  it('should return the largest number for the most recent date', () => {
    const dates = [1531085542232, 1531085530468, 1531085562403, 1531085553538];
    assert.strictEqual(App(dates), 1531085562403);
  });
});
