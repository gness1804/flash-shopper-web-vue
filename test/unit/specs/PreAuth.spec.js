import Vue from 'vue';
import { mount } from 'avoriaz';
import PreAuth from '@/components/PreAuth';

describe('PreAuth.vue', () => {
  const Constructor = Vue.extend(PreAuth);
  const fakeEmail = 'foo@bar.com';
  const fakePassword = 'foobar';

  it('should render correct contents', () => {
    const vm = new Constructor().$mount();
    expect(vm.$el.querySelector('.pre-auth .headline').textContent)
      .to.equal('Sign Up or Sign In');
    expect(vm.$el.querySelector('.pre-auth .email-field').placeholder)
      .to.equal('Enter Your Email Address');
    expect(vm.$el.querySelector('.pre-auth .password-field').placeholder)
      .to.equal('Enter Your Password');
  });

  it('clicking the sign up button should call the sign up method', () => {
    const component = mount(PreAuth);
    const email = component.find('.email-field')[0];
    email.value = fakeEmail;
    const password = component.find('.password-field')[0];
    password.value = fakePassword;
    const signUp = sinon.stub();
    component.setMethods({ signUp });
    const button = component.find('.sign-up-button')[0];
    button.trigger('click');
    expect(signUp.calledOnce).to.equal(true);
  });
});
