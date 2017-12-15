import { assert } from 'chai';
import logOut from '../../../src/helpers/logOut';

describe('logOut', () => {
  it('should be a function', () => {
    assert.isFunction(logOut);
  });

  it('should hit the confirm method', () => {
    Object.assign(window, { confirm: sinon.stub().returns(false) });
    logOut();
    sinon.assert.calledOnce(window.confirm);
  });
});
