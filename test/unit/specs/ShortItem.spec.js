import { assert } from 'chai';
import ShortItem from '../../../src/models/ShortItem';

describe('ShortItem.', () => {
  const item = new ShortItem('1', 'Ground beef', '7.5');

  it('should be a constructor', () => {
    assert.instanceOf(item, ShortItem);
  });

  it('should create instances with the correct values.', () => {
    assert.strictEqual(item.id, '1');
    assert.strictEqual(item.name, 'Ground beef');
    assert.strictEqual(item.aisle, '7.5');
  });
});
