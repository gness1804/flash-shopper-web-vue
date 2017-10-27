import Vue from 'vue';
import AuthedMain from '@/components/AuthedMain';
import items from '../helpers/FakeItemsArray';

describe('AuthedMain.vue', () => {
  const Constructor = Vue.extend(AuthedMain);
  const propsData = {
    items,
  };

  it('should render correct contents', () => {
    const vm = new Constructor({ propsData }).$mount();
    expect(vm.$el.querySelector('.authed-main .items-length').textContent)
      .to.equal('3');
    expect(vm.$el.querySelector('.authed-main .items-in-cart-count').textContent)
      .to.equal('1');
  });
});
