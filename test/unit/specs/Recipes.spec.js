import { mount } from 'avoriaz';
import Recipes from '@/components/Recipes';

describe('Recipes.vue', () => {
  it('should render correctly', () => {
    const component = mount(Recipes);
    const header = component.find('h2')[0];
    expect(header.text()).to.equal('Recipes');
  });

  it('clicking the go home button should trigger the goHome method', () => {
    const component = mount(Recipes);
    const goHome = sinon.stub();
    component.setMethods({ goHome });
    const button = component.find('.go-home-button')[0];
    button.trigger('click');
    expect(goHome.calledOnce).to.equal(true);
  });
});
