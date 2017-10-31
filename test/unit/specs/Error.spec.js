import { mount } from 'avoriaz';
import Error from '@/components/Error';

describe('Error.vue', () => {
  it('renders correctly', () => {
    const component = mount(Error);
    const headline = component.find('.headline')[0];
    expect(headline.text()).to.equal('Error: 404, or Some Such');
  });

  it('triggers the goHome method on click of the go home button', () => {
    const component = mount(Error);
    const goHome = sinon.stub();
    component.setMethods({ goHome });
    const button = component.find('.go-home-button')[0];
    button.trigger('click');
    expect(goHome.calledOnce).to.equal(true);
  });
});
