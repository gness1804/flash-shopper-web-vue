import { mount } from 'avoriaz';
import App from '@/App';
import items from '../helpers/FakeItemsArray';

describe('App.vue', () => {
  const userEmail = 'foo@foo.com';

  it('renders the correct data', () => {
    const component = mount(App);
    component.setData({ items });
    component.setData({ isUser: true });
    component.setData({ userEmail });
    const headline = component.find('h1')[0];
    const message = component.find('.user-logged-in-message')[0];
    expect(headline.text()).to.equal('Flash Shopper');
    expect(message.text().trim()).to.equal('Logged in as foo@foo.com');
  });

  it('should trigger the logOut method when user clicks the log out button', () => {
    const component = mount(App);
    component.setData({ items });
    component.setData({ isUser: true });
    component.setData({ userEmail });
    const logOut = sinon.stub();
    component.setMethods({ logOut });
    const button = component.find('.log-out-button')[0];
    button.trigger('click');
    expect(logOut.calledOnce).to.equal(true);
  });
});
