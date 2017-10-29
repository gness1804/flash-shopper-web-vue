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
});
