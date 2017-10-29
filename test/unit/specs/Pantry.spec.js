// import Vue from 'vue';
import { mount } from 'avoriaz';
import Pantry from '@/components/Pantry';
import items from '../helpers/FakeItemsArray';

describe('Pantry', () => {
  // it('should render the correct number of items', () => {
  //   const component = mount(Pantry);
  //   component.setData({ items });
  //   component.setData({ isUser: true });
  //   const el = ('#pantry');
  //   expect(el.length).to.equal(2);
  // });
  it('should trigger the go home method if user clicks on the go home button', () => {
    const component = mount(Pantry);
    component.setData({ items });
    const goHome = sinon.stub();
    component.setMethods({ goHome });
    const button = component.find('.go-home-button')[0];
    button.trigger('click');
    expect(goHome.calledOnce).to.equal(true);
  });

  it('should trigger the delete all items method if user clicks on the delete all items button', () => {
    const component = mount(Pantry);
    component.setData({ items });
    const deleteAllItems = sinon.stub();
    component.setMethods({ deleteAllItems });
    component.setData({ isUser: true });
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
    const button = component.find('.add-item-to-pantry-button')[0];
    button.trigger('click');
    expect(triggerErrorState.calledOnce).to.equal(true);
  });

  it('should trigger the add item method if the user clicks on the add item button with valid data', () => {
    const expectedResult = [
      {
        id: null,
        name: 'Bagels',
        aisle: '22',
        note: 'Do not get store brand',
        quantity: '2 bags',
        inCart: false,
      },
    ];
    const component = mount(Pantry);
    component.setData({ items });
    component.setData({ name: 'Bagels' });
    component.setData({ aisle: '22' });
    component.setData({ note: 'Do not get store brand' });
    component.setData({ quantity: '2 bags' });
    component.setData({ itemsRef: [] });
    const triggerErrorState = sinon.stub();
    component.setMethods({ triggerErrorState });
    component.setData({ isUser: true });
    const button = component.find('.add-item-to-pantry-button')[0];
    button.trigger('click');
    expect(triggerErrorState.calledOnce).to.equal(false);
    expect(component.data().itemsRef[0].id).to.equal(expectedResult[0].id);
    expect(component.data().itemsRef[0].name).to.equal(expectedResult[0].name);
    expect(component.data().itemsRef[0].aisle).to.equal(expectedResult[0].aisle);
    expect(component.data().itemsRef[0].note).to.equal(expectedResult[0].note);
    expect(component.data().itemsRef[0].quantity).to.equal(expectedResult[0].quantity);
    expect(component.data().itemsRef[0].inCart).to.equal(expectedResult[0].inCart);
  });
});
