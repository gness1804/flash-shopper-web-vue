import { mount } from 'avoriaz';
import Ingredient from '@/components/Ingredient';
import ingredient from '../helpers/FakeIngredient';

describe('Ingredient.vue', () => {
  const propsData = {
    ingredient,
  };

  it('renders correctly', () => {
    const component = mount(Ingredient, { propsData });
    const name = component.find('.ingredient-name')[0];
    const quantity = component.find('.ingredient-quantity')[0];
    expect(name.text()).to.equal('Green pepper');
    expect(quantity.text()).to.equal('1');
  });
});
