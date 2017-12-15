import { mount } from 'avoriaz';
import AppHeader from '@/components/AppHeader';

describe('AppHeader', () => {
  const propsData = {
    isUser: true,
    userEmail: 'foo@foobar.com',
  };

  it('renders the correct data with a user', () => {
    const component = mount(AppHeader, { propsData });
    const headline = component.find('h1')[0];
    const message = component.find('.user-logged-in-message')[0];
    const logOutText = component.find('.log-out-button')[0];
    expect(headline.text()).to.equal('Flash Shopper');
    expect(message.text().trim()).to.equal('Logged in as foo@foobar.com');
    expect(logOutText.text().trim()).to.equal('Log Out');
  });

  it('renders the correct data without a user', () => {
    const propsData2 = {
      isUser: false,
      userEmail: '',
    };
    const component = mount(AppHeader, { propsData: propsData2 });
    const message = component.find('.not-logged-in-message')[0];
    expect(message.text().trim()).to.equal('You are not logged in. Please go home and log in now.');
  });

  it('should trigger the logOut method when user clicks the log out button', () => {
    const component = mount(AppHeader, { propsData });
    const logOut = sinon.stub();
    component.setMethods({ logOut });
    const button = component.find('.log-out-button')[0];
    button.trigger('click');
    expect(logOut.calledOnce).to.equal(true);
  });

  it('should trigger the goHome method when user clicks the go home button', () => {
    const component = mount(AppHeader, { propsData });
    const goHome = sinon.stub();
    component.setMethods({ goHome });
    const button = component.find('.go-home-button')[0];
    button.trigger('click');
    expect(goHome.calledOnce).to.equal(true);
  });

  it('should trigger the go to pantry method if user clicks on the go to pantry button', () => {
    const component = mount(AppHeader, { propsData });
    const goToPantry = sinon.stub();
    component.setMethods({ goToPantry });
    const button = component.find('.go-to-pantry-button')[0];
    button.trigger('click');
    expect(goToPantry.calledOnce).to.equal(true);
  });

  it('should trigger the go to recipes method if user clicks on the go to recipes button', () => {
    const component = mount(AppHeader, { propsData });
    const goToRecipes = sinon.stub();
    component.setMethods({ goToRecipes });
    const button = component.find('.go-to-recipes-button')[0];
    button.trigger('click');
    expect(goToRecipes.calledOnce).to.equal(true);
  });

  it('when the go home button is disabled, clicking on it should not call the goHome method', () => {
    const component = mount(AppHeader, { propsData });
    const goHome = sinon.stub();
    component.setData({ currentRoute: '/' });
    component.setMethods({ goHome });
    const button = component.find('.go-home-button')[0];
    setTimeout(() => {
      button.trigger('click');
    }, 3000);
    expect(goHome.calledOnce).to.equal(false);
  });
});

