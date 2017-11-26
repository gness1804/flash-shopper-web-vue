import { mount } from 'avoriaz';
import EachRecipe from '@/components/EachRecipe';
import recipe from '../helpers/FakeRecipe';

describe('EachRecipe.vue', () => {
  const propsData = {
    recipe,
  };

  it('renders correctly', () => {
    const component = mount(EachRecipe, { propsData });
    const title = component.find('.recipe-link')[0];
    expect(title.text().trim()).to.equal('Pumpkin pie');
  });
});
