import { assert } from 'chai';
import App from '../../../src/helpers/weedOutDones';
import items from '../helpers/FakeItemsArray';

describe('weedOutDones', () => {
  it('should be a function', () => {
    assert.isFunction(App);
  });

  it('should return only the done items', () => {
    const result = App(items);
    assert.strictEqual(result.length, 2);
    assert.strictEqual(result[0].name, 'Chicken');
    assert.strictEqual(result[0].inCart, false);
    assert.strictEqual(result[1].name, 'Sushi');
    assert.strictEqual(result[1].note, 'Get the good kind');
  });
});
