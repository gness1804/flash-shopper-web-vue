import { mount } from 'avoriaz';
import AppHeader from '@/components/AppHeader';

describe('AppHeader', () => {
  const propsData = {
    isUser: true,
    userEmail: 'foo@foobar.com',
  };

  it('renders the correct data', () => {
    const component = mount(AppHeader, { propsData });
    const headline = component.find('h1')[0];
    // const message = component.find('.user-logged-in-message')[0];
    // const logOutText = component.find('.log-out-button')[0];
    expect(headline.text()).to.equal('Flash Shopper');
    // expect(message.text().trim()).to.equal('Logged in as foo@foo.com');
    // expect(logOutText.text().trim()).to.equal('Log Out');
  });
});

