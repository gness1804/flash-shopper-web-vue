import { assert } from 'chai';
import browserMatches from '../../../src/helpers/browserMatches';
import browsers from '../helpers/Browsers';

describe('browserMatches', () => {
  it('should be a function', () => {
    assert.isFunction(browserMatches);
  });

  it('should return true for safari', () => {
    assert.strictEqual(browserMatches(browsers.macOS.safari), true);
  });

  it('should return false for firefox', () => {
    assert.strictEqual(browserMatches(browsers.macOS.firefox), false);
  });

  it('should return false for chrome', () => {
    assert.strictEqual(browserMatches(browsers.macOS.chrome), false);
  });
});
