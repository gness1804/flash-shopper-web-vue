import { assert } from 'chai';
import validate from '../../../src/helpers/httpValidate';

describe('validate', () => {
  it('should be a function', () => {
    assert.isFunction(validate);
  });

  it('should return true for a valid URL', () => {
    assert.strictEqual(
      validate(
        'https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String/match',
      ),
      true,
    );
    assert.strictEqual(
      validate('https://www.tasteofhome.com/recipes/chili-con-carne'),
      true,
    );
    assert.strictEqual(
      validate(
        'http://money.cnn.com/2018/03/16/news/economy/financial-crisis-10-years/index.html',
      ),
      true,
    );
  });

  it('should return false for an invalid URL', () => {
    assert.strictEqual(validate('www.google.com'), false);
    assert.strictEqual(validate('foo'), false);
    assert.strictEqual(validate('https://www.oopsbadurl'), false);
  });
});
