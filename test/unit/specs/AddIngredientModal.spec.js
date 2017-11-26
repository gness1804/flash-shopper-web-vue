import { mount } from 'avoriaz';
import AddIngredientModal from '@/components/AddIngredientModal';

describe('AddIngredientModal', () => {
  const name = 'Tortillas';
  const quantity = '1 bag';

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

  it('clicking the add ingredient button should show an error message if there is not a name and a quantity', () => {
    const component = mount(AddIngredientModal);
    const triggerErrorState = sinon.stub();
    component.setMethods({ triggerErrorState });
    const button = component.find('.add-ingredient-modal-button')[0];
    button.trigger('click');
    expect(triggerErrorState.calledOnce).to.equal(true);
  });

  it('clicking the add ingredient button should not show an error message if there is a name and a quantity', () => {
    const component = mount(AddIngredientModal);
    const triggerErrorState = sinon.stub();
    component.setMethods({ triggerErrorState });
    component.setData({ name });
    component.setData({ quantity });
    const button = component.find('.add-ingredient-modal-button')[0];
    button.trigger('click');
    expect(triggerErrorState.calledOnce).to.equal(false);
  });

  it('clicking the close modal button should trigger the closeModal method', () => {
    const component = mount(AddIngredientModal);
    const closeModal = sinon.stub();
    component.setMethods({ closeModal });
    component.setData({ name });
    component.setData({ quantity });
    const button = component.find('.close-modal-button')[0];
    button.trigger('click');
    expect(closeModal.calledOnce).to.equal(true);
  });

  it('clicking the close modal button should prompt the user to confirm if there are unsaved changes', () => {
    Object.assign(window, { confirm: sinon.spy() });
    const component = mount(AddIngredientModal);
    component.setData({ name });
    component.setData({ quantity });
    const button = component.find('.close-modal-button')[0];
    button.trigger('click');
    expect(window.confirm.calledOnce).to.equal(true);
  });
});
