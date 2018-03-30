import { assert } from 'chai';
import Item from '../../../src/models/Item';

describe('Item', () => {
  const item = new Item({
    name: 'Ground beef',
    aisle: 'Meat section',
    note: 'Lean variety',
    quantity: '1 lb',
  });

  it('should be a constructor', () => {
    assert.instanceOf(item, Item);
  });

  it('should create instances with the correct values', () => {
    assert.strictEqual(item.id, null);
    assert.strictEqual(item.name, 'Ground beef');
    assert.strictEqual(item.aisle, 'Meat section');
    assert.strictEqual(item.note, 'Lean variety');
    assert.strictEqual(item.quantity, '1 lb');
    assert.strictEqual(item.inCart, false);
    assert.strictEqual(item.done, false);
  });
});
