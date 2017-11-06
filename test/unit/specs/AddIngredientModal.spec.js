import { mount } from 'avoriaz';
import AddIngredientModal from '@/components/AddIngredientModal';

describe('AddIngredientModal', () => {
  it('should render correctly', () => {
    const component = mount(AddIngredientModal);
    const header = component.find('h2')[0];
    expect(header.text()).to.equal('Add Ingredient');
  });

  it('clicking the add ingredient button should trigger the addIngredient method', () => {
    const component = mount(AddIngredientModal);
    const addIngredient = sinon.stub();
    component.setMethods({ addIngredient });
    const button = component.find('.add-ingredient-modal-button')[0];
    button.trigger('click');
    expect(addIngredient.calledOnce).to.equal(true);
  });
});
