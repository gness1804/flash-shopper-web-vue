import { assert } from 'chai';
import sequentialize from '../../../src/helpers/sequentialize';
import { input1234, output1234, input124, output124, input234, output234, input134, output134 } from '../helpers/SequentializeArrs';

describe('sequentialize', () => {
  it('should be a function', () => {
    assert.isFunction(sequentialize);
  });

  it('should return an empty array if the input array has length of zero', () => {
    assert.deepEqual(sequentialize([]), []);
  });

  it('should return the same array if the original array is ordered 1234', () => {
    assert.deepEqual(sequentialize(input1234), output1234);
  });

  it('should return a properly ordered array if the original array is ordered 124', () => {
    assert.deepEqual(sequentialize(input124), output124);
  });

  it('should return a properly ordered array if the original array is ordered 234', () => {
    assert.deepEqual(sequentialize(input234), output234);
  });

  it('should return a properly ordered array if the original array is ordered 134', () => {
    assert.deepEqual(sequentialize(input134), output134);
  });
});
