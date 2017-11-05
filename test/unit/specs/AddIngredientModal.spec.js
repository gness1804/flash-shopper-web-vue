import { mount } from 'avoriaz';
import AddIngredientModal from '@/components/AddIngredientModal';

describe('AddIngredientModal', () => {
  it('should render correctly', () => {
    const component = mount(AddIngredientModal);
    const header = component.find('h2')[0];
    expect(header.text()).to.equal('Add Ingredient');
  });
});
