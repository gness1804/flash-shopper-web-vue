import Vue from 'vue';
import { mount } from 'avoriaz';
import AuthedMain from '@/components/AuthedMain';
import items from '../helpers/FakeItemsArray';

describe('AuthedMain.vue', () => {
  const Constructor = Vue.extend(AuthedMain);
  const propsData = {
    items,
  };

  it('should render correct contents', () => {
    const vm = new Constructor({ propsData }).$mount();
    expect(vm.$el.querySelector('.authed-main .headline').textContent)
      .to.equal('Enter New Item:');
    expect(vm.$el.querySelector('.authed-main .items-length').textContent)
      .to.equal('3');
    expect(vm.$el.querySelector('.authed-main .items-in-cart-count').textContent)
      .to.equal('1');
  });

  it('should render error message if add item is clicked and the name field is empty', () => {
    const component = mount(AuthedMain, { propsData });
    const triggerErrorState = sinon.stub();
    component.setMethods({ triggerErrorState });
    const button = component.find('.add-item-button')[0];
    button.trigger('click');
    expect(triggerErrorState.calledOnce).to.equal(true);
  });
});
