import { assert } from 'chai';
import {
  filterOutDuplicateNames,
  filteroutDuplicateRecentItems,
} from '../../../src/helpers/filterOutDuplicates';

describe('filterOutDuplicates', () => {
  const names = ['andouille sausage', 'jambalaya rice', 'clams', 'butter', 'clams', 'eggs'];

  it('should be a function', () => {
    assert.isFunction(filterOutDuplicateNames);
  });

  it('should return the expected value', () => {
    const expectedValue = ['andouille sausage', 'butter', 'clams', 'eggs', 'jambalaya rice'];
    assert.deepEqual(filterOutDuplicateNames(names), expectedValue);
  });

  it('should return an empty array if the input has no length.', () => {
    const expectedValue = [];
    assert.deepEqual(filterOutDuplicateNames([]), expectedValue);
  });
});

describe('filteroutDuplicateRecentItems.', () => {
  const items = [
    {
      id: '1',
      name: 'Hot dogs',
      aisle: '2',
    },
    {
      id: '2',
      name: 'Apples',
      aisle: '0.5',
    },
    {
      id: '3',
      name: 'Bottled water',
      aisle: '10',
    },
  ];

  it('should be a function.', () => {
    assert.isFunction(filteroutDuplicateRecentItems);
  });

  it('should filter out the name of item entered.', () => {
    const expectedValue = [
      {
        id: '1',
        name: 'Hot dogs',
        aisle: '2',
      },
      {
        id: '3',
        name: 'Bottled water',
        aisle: '10',
      },
    ];
    assert.deepEqual(filteroutDuplicateRecentItems('Apples', items), expectedValue);
  });
});
