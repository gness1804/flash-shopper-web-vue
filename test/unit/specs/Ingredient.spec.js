import { mount } from 'avoriaz';
import Ingredient from '@/components/Ingredient';
import ingredient from '../helpers/FakeItem';

describe('Ingredient.vue', () => {
  const propsData = {
    ingredient,
  };

  it('renders correctly', () => {
    const component = mount(Ingredient, { propsData });
    const header = component.find('h4')[0];
    expect(header.text()).to.equal('Foo bread');
  });
});
