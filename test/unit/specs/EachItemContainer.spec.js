import Vue from 'vue';
import { mount } from 'avoriaz';
import EachItemContainer from '@/components/EachItemContainer';
import item from '../helpers/FakeItem';

describe('EachItemContainer.vue', () => {
  const Constructor = Vue.extend(EachItemContainer);
  const propsData = {
    item,
  };

  it('should render correct contents', () => {
    const vm = new Constructor({ propsData }).$mount();
    expect(vm.$el.querySelector('.each-item-container .each-item-name').textContent.trim())
      .to.equal('Foo bread');
    expect(vm.$el.querySelector('.each-item-container .each-item-aisle').textContent.replace(/\s/g, ''))
      .to.equal('Aisle:10');
    expect(vm.$el.querySelector('.each-item-container .each-item-note').textContent)
      .to.equal('\n    Note:\n    \n    Please do not get stale bread\n  ');
  });

  it('should not display the inCart styling by default', () => {
    const component = mount(EachItemContainer, { propsData });
    const el = component.find('.each-item-name');
    expect(el.length).to.equal(1);
    const el2 = component.find('.each-item-name.strike');
    expect(el2.length).to.equal(0);
  });

  it('should call the removeItem method when user clicks the remove item button', () => {
    const component = mount(EachItemContainer, { propsData });
    const removeItem = sinon.stub();
    component.setMethods({ removeItem });
    const button = component.find('.remove-item-button')[0];
    button.trigger('click');
    expect(removeItem.calledOnce).to.equal(true);
  });

  it('should call the toggleInCart method when user clicks the toggle in cart button', () => {
    const component = mount(EachItemContainer, { propsData });
    const toggleInCart = sinon.stub();
    component.setMethods({ toggleInCart });
    const button = component.find('.toggle-in-cart-button')[0];
    button.trigger('click');
    expect(toggleInCart.calledOnce).to.equal(true);
  });

  it('should call the AddToAPN method when user clicks the add to Amazon Prime Now button', () => {
    const component = mount(EachItemContainer, { propsData });
    const addToAPN = sinon.stub();
    component.setMethods({ addToAPN });
    const button = component.find('.add-to-apn-button')[0];
    button.trigger('click');
    expect(addToAPN.calledOnce).to.equal(true);
  });
});
