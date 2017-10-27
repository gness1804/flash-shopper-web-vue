import Vue from 'vue';
import PreAuth from '@/components/PreAuth';

describe('PreAuth.vue', () => {
  it('should render correct contents', () => {
    const Constructor = Vue.extend(PreAuth);
    const vm = new Constructor().$mount();
    expect(vm.$el.querySelector('.pre-auth .headline').textContent)
      .to.equal('Sign Up or Sign In');
  });
});
