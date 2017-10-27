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
});
