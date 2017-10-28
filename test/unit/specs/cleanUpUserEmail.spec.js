import { assert } from 'chai';
import cleanUpUserEmail from '../../../src/helpers/cleanUpUserEmail';

describe('cleanUpUserEmail', () => {
  const email = 'foo@foobar.com';
  it('should be a function', () => {
    assert.isFunction(cleanUpUserEmail);
  });

  it('should return the expected value', () => {
    assert.strictEqual(cleanUpUserEmail(email), 'foo@foobarcom');
  });
});
