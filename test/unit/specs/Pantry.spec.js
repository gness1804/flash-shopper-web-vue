// import Vue from 'vue';
import { mount } from 'avoriaz';
import Pantry from '@/components/Pantry';
import items from '../helpers/FakeItemsArray';
import item from '../helpers/FakeItem';
import display from '../../../src/helpers/displayVars';

describe('Pantry', () => {
  const name = 'Bagels';
  const itemsRef = {
    push: sinon.spy(),
    child: {
      remove: sinon.spy(),
    },
  };

  it('should render the correct data', () => {
    const component = mount(Pantry);
    component.setData({ items });
    component.setData({ itemsRef });
    const header = component.find('h2')[0];
    expect(header.text()).to.equal('Pantry');
  });

  it('should render the correct data from buttonStrings', () => {
    const component = mount(Pantry);
    component.setData({ items });
    component.setData({ isUser: true });
    const el1 = component.find('.delete-all-in-pantry-button')[0];
    expect(el1.text().trim()).to.equal('Delete ALL Items');
    const el2 = component.find('.add-item-to-pantry-button')[0];
    expect(el2.text().trim()).to.equal('Add Item');
  });

  it('should fire the initializeApp method on mount', () => {
    const component = mount(Pantry);
    const initializeApp = sinon.stub();
    component.setData({ items });
    component.setData({ isUser: true });
    component.setMethods({ initializeApp });
    setTimeout(() => {
      expect(initializeApp.calledOnce).to.equal(true);
    }, display.timerStandard);
  });

  it('should trigger the delete all items method if user clicks on the delete all items button', () => {
    const component = mount(Pantry);
    component.setData({ items });
    const deleteAllItems = sinon.stub();
    component.setMethods({ deleteAllItems });
    component.setData({ isUser: true });
    component.setData({ itemsRef });
    const button = component.find('.delete-all-in-pantry-button')[0];
    button.trigger('click');
    expect(deleteAllItems.calledOnce).to.equal(true);
  });

  it('should trigger an error if the user clicks the add items button without a valid name input', () => {
    const component = mount(Pantry);
    component.setData({ items });
    const triggerErrorState = sinon.stub();
    component.setMethods({ triggerErrorState });
    component.setData({ isUser: true });
    component.setData({ itemsRef });
    const button = component.find('.add-item-to-pantry-button')[0];
    button.trigger('click');
    expect(triggerErrorState.calledOnce).to.equal(true);
  });

  it.skip('should trigger the add item method if the user clicks on the add item button with valid data', () => {
    const expectedResult = {
      id: null,
      name: 'Bagels',
      aisle: '22',
      note: 'Do not get store brand',
      isHidden: false,
      quantity: '2 bags',
      inCart: false,
      ingredientId: null,
      dateCompleted: null,
      link:
        'https://www.heb.com/product-detail/h-e-b-sushiya-san-antonio-roll/1477048',
      timesTakenToMake: [],
    };
    const component = mount(Pantry);
    component.setData({ items });
    component.setData({ name });
    component.setData({ aisle: '22' });
    component.setData({ note: 'Do not get store brand' });
    component.setData({ quantity: '2 bags' });
    component.setData({
      link:
        'https://www.heb.com/product-detail/h-e-b-sushiya-san-antonio-roll/1477048',
    });
    component.setData({ itemsRef });
    const triggerErrorState = sinon.stub();
    component.setMethods({ triggerErrorState });
    component.setData({ isUser: true });
    const button = component.find('.add-item-to-pantry-button')[0];
    button.trigger('click');
    expect(triggerErrorState.calledOnce).to.equal(false);
    sinon.assert.calledWith(component.data().itemsRef.push, expectedResult);
  });

  it('should show a toast when the user clicks the add item to pantry button', () => {
    const component = mount(Pantry);
    component.setData({ items });
    component.setData({ itemsRef });
    component.setData({ name });
    component.setData({ isUser: true });
    const showToast = sinon.stub();
    component.setMethods({ showToast });
    const button = component.find('.add-item-to-pantry-button')[0];
    button.trigger('click');
    expect(showToast.calledWith('Bagels added to pantry.'));
  });

  it.skip('should trigger show toast when the deleteItem method is called', () => {
    const component = mount(Pantry);
    component.setData({ items });
    component.setData({ isUser: true });
    component.setData({ name });
    component.setData({ itemsRef });
    const showToast = sinon.stub();
    component.setMethods({ showToast });
    component.vm.deleteItem(item);
    expect(showToast.calledWith('Bagels removed from pantry.'));
  });
});
