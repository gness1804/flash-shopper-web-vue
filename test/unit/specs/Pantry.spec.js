// import Vue from 'vue';
import { mount } from 'avoriaz';
import Pantry from '@/components/Pantry';
// import items from '../helpers/FakePantryArray';

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
    const goHome = sinon.stub();
    component.setMethods({ goHome });
    const button = component.find('.go-home-button')[0];
    button.trigger('click');
    expect(goHome.calledOnce).to.equal(true);
  });
});
