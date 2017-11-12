import { mount } from 'avoriaz';
import Recipes from '@/components/Recipes';
import directions from '../helpers/FakeDirections';
import ingredients from '../helpers/FakeIngredientsArray';
import newIngredient from '../helpers/FakeIngredient';

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
    component.setData({ isUser: true });
    const button = component.find('.go-home-button')[0];
    button.trigger('click');
    expect(goHome.calledOnce).to.equal(true);
  });

  it('uploading a photo should trigger to getImage method', () => {
    const component = mount(Recipes);
    const getImage = sinon.stub();
    component.setMethods({ getImage });
    component.setData({ isUser: true });
    const button = component.find('.recipe-image-input')[0];
    button.trigger('change');
    expect(getImage.calledOnce).to.equal(true);
  });

  it('clicking the remove image button should trigger the removeImage method', () => {
    const component = mount(Recipes);
    const removeImage = sinon.stub();
    component.setMethods({ removeImage });
    component.setData({ isUser: true });
    const button = component.find('.remove-image-button')[0];
    button.trigger('click');
    expect(removeImage.calledOnce).to.equal(true);
  });

  it('clicking the add ingredient button should trigger the openModal method', () => {
    const component = mount(Recipes);
    const openModal = sinon.stub();
    component.setMethods({ openModal });
    component.setData({ isUser: true });
    const button = component.find('.add-ingredient-button')[0];
    button.trigger('click');
    expect(openModal.calledOnce).to.equal(true);
  });

  it('clicking the add ingredient button should add an ingredient', () => {
    const component = mount(Recipes);
    const showToast = sinon.stub();
    const closeModal = sinon.stub();
    component.setMethods({ showToast });
    component.setMethods({ closeModal });
    component.setData({ ingredients });
    component.setData({ isUser: true });
    component.vm.addIngredient(newIngredient);
    expect(component.data().ingredients.length).to.equal(4);
    expect(showToast.calledOnce).to.equal(true);
    expect(closeModal.calledOnce).to.equal(true);
    expect(component.data().ingredients[3].name).to.equal('Green pepper');
  });

  it('clicking the add direction button should trigger the addDirection method', () => {
    const component = mount(Recipes);
    const addDirection = sinon.stub();
    component.setMethods({ addDirection });
    component.setData({ isUser: true });
    const button = component.find('.add-direction-button')[0];
    button.trigger('click');
    expect(addDirection.calledOnce).to.equal(true);
  });

  it('clicking the add direction button should add a direction', () => {
    const component = mount(Recipes);
    const showToast = sinon.stub();
    component.setMethods({ showToast });
    component.setData({ directions });
    component.setData({ isUser: true });
    component.setData({ directionInput: 'Cook until water is absorbed adequately' });
    const button = component.find('.add-direction-button')[0];
    button.trigger('click');
    expect(component.data().directions.length).to.equal(4);
    expect(showToast.calledOnce).to.equal(true);
    expect(component.data().directions[3].details).to.equal('Cook until water is absorbed adequately');
  });

  it('clicking the add direction button without a valid directionInput should trigger an error', () => {
    const component = mount(Recipes);
    component.setData({ directions: [] });
    const showToast = sinon.stub();
    const triggerErrorState = sinon.stub();
    component.setMethods({ showToast });
    component.setMethods({ triggerErrorState });
    component.setData({ isUser: true });
    component.setData({ directions });
    const button = component.find('.add-direction-button')[0];
    button.trigger('click');
    expect(component.data().directions.length).to.equal(3);
    expect(showToast.calledOnce).to.equal(false);
    expect(triggerErrorState.calledOnce).to.equal(true);
  });

  it('clicking on the remove direction button should decrement the number of directions by one', () => {
    const component = mount(Recipes);
    const showToast = sinon.stub();
    component.setMethods({ showToast });
    component.setData({ isUser: true });
    component.setData({ directions });
    const button = component.find('.delete-direction-button')[0];
    button.trigger('click');
    expect(component.data().directions.length).to.equal(2);
    expect(showToast.calledOnce).to.equal(true);
  });

  it('clicking the close modal button should call the close modal method', () => {
    const component = mount(Recipes);
    const closeModal = sinon.stub();
    component.setMethods({ closeModal });
    component.setData({ isUser: true });
    component.setData({ showModal: true });
    const button = component.find('.close-modal-button')[0];
    button.trigger('click');
    expect(closeModal.calledOnce).to.equal(true);
  });

  it('clicking the close modal button should close the modal', () => {
    const component = mount(Recipes);
    component.setData({ isUser: true });
    component.setData({ showModal: true });
    const button = component.find('.close-modal-button')[0];
    button.trigger('click');
    expect(component.data().showModal).to.equal(false);
  });
});
