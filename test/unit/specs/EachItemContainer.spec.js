import Vue from 'vue';
import EachItemContainer from '@/components/EachItemContainer';
import fakeItem from '../helpers/FakeItem';

describe('EachItemContainer.vue', () => {
  const Constructor = Vue.extend(EachItemContainer);
  const propsData = {
    item: fakeItem,
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
});
