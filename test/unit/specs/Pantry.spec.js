// import Vue from 'vue';
import { mount } from 'avoriaz';
import Pantry from '@/components/Pantry';
// need to add fake items array later, and put it into propsData

describe('Pantry', () => {
  it('should trigger the go home method if user clicks on the go home button', () => {
    const component = mount(Pantry);
    const goHome = sinon.stub();
    component.setMethods({ goHome });
    const button = component.find('.go-home-button')[0];
    button.trigger('click');
    expect(goHome.calledOnce).to.equal(true);
  });
});
