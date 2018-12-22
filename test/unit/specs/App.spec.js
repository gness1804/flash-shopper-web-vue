import { mount } from 'avoriaz';
import App from '@/App';
import items from '../helpers/FakeItemsArray';
import item from '../helpers/FakeItem';
import display from '../../../src/helpers/displayVars';

describe('App.vue', () => {
  const userEmail = 'foo@foo.com';

  it('should fire the initializeApp method on mount', () => {
    const component = mount(App);
    const initializeApp = sinon.stub();
    component.setData({ items });
    component.setData({ isUser: true });
    component.setData({ userEmail });
    component.setData({ items });
    component.setData({ isUser: true });
    component.setMethods({ initializeApp });
    setTimeout(() => {
      expect(initializeApp.calledOnce).to.equal(true);
    }, display.timerStandard);
  });

  it('should trigger show toast when the addItem method is called', () => {
    const component = mount(App);
    component.setData({ items });
    component.setData({ isUser: true });
    component.setData({ userEmail });
    component.setData({
      itemsRef: {
        child: () => {},
        push: sinon.spy(),
      },
    });
    const showToast = sinon.stub();
    component.setMethods({ showToast });
    component.vm.addItem(item);
    expect(showToast.calledWith('Foo bread added to your list'));
    sinon.assert.calledWith(component.data().itemsRef.push, item);
  });

  it('should trigger show toast when the deleteAllItems method is called', () => {
    const component = mount(App);
    component.setData({ items });
    component.setData({ isUser: true });
    component.setData({ userEmail });
    component.setData({
      itemsRef: {
        set: sinon.spy(),
      },
    });
    const showToast = sinon.stub();
    component.setMethods({ showToast });
    component.vm.deleteAllItems();
    expect(showToast.calledWith('Deleted all items.'));
  });
});
