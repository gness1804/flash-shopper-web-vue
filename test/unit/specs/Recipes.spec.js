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

  it('clicking the add ingredient button should trigger the addIngredient method', () => {
    const component = mount(Recipes);
    const addIngredient = sinon.stub();
    component.setMethods({ addIngredient });
    component.setData({ isUser: true });
    const button = component.find('.add-ingredient-button')[0];
    button.trigger('click');
    expect(addIngredient.calledOnce).to.equal(true);
  });
});
