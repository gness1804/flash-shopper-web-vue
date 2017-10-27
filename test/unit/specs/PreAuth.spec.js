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

  it('clicking the sign up button should show an error message if the user has not entered both an email and a password', () => {
    const component = mount(PreAuth);
    const triggerErrorState = sinon.stub();
    component.setMethods({ triggerErrorState });
    const button = component.find('.sign-up-button')[0];
    button.trigger('click');
    expect(triggerErrorState.calledOnce).to.equal(true);
  });

  it('clicking the sign up button with proper data should call the sign up method', () => {
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

  it('clicking the log in button should show an error message if the user has not entered both an email and a password', () => {
    const component = mount(PreAuth);
    const triggerErrorState = sinon.stub();
    component.setMethods({ triggerErrorState });
    const button = component.find('.log-in-button')[0];
    button.trigger('click');
    expect(triggerErrorState.calledOnce).to.equal(true);
  });

  it('clicking the log in button with proper data should call the log in method', () => {
    const component = mount(PreAuth);
    const email = component.find('.email-field')[0];
    email.value = fakeEmail;
    const password = component.find('.password-field')[0];
    password.value = fakePassword;
    const logIn = sinon.stub();
    component.setMethods({ logIn });
    const button = component.find('.log-in-button')[0];
    button.trigger('click');
    expect(logIn.calledOnce).to.equal(true);
  });
});
