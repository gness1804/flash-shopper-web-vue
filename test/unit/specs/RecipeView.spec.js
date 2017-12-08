import { mount } from 'avoriaz';
import RecipeView from '@/components/RecipeView';
import recipe from '../helpers/FakeRecipe';
import directions from '../helpers/FakeDirections';

describe('RecipeView.vue', () => {
  it('should render correctly', () => {
    const component = mount(RecipeView);
    component.setData({ isUser: true });
    component.setData({ title: recipe.title });
    const el = component.find('.recipe-view-headline')[0];
    expect(el.text().trim()).to.equal('Pumpkin pie');
  });

  it('should render button string data correctly ', () => {
    const component = mount(RecipeView);
    component.setData({ isUser: true });
    const el1 = component.find('.remove-image-button')[0];
    expect(el1.text().trim()).to.equal('Remove Image');
    const el2 = component.find('.add-ingredient-button')[0];
    expect(el2.text().trim()).to.equal('Add Ingredient');
    const el3 = component.find('.add-direction-button')[0];
    expect(el3.text().trim()).to.equal('Add Direction');
    const el4 = component.find('.go-home-button')[0];
    expect(el4.text().trim()).to.equal('Go Home');
  });

  it('clicking the uncheck all button should mark all directions as not done', () => {
    const component = mount(RecipeView);
    component.setData({ isUser: true });
    component.setData({ directions });
    component.setData({ targetRecipe: {
      update: sinon.spy(),
    } });
    const button = component.find('.uncheck-all-button')[0];
    button.trigger('click');
    const outputDirs = component.data().directions;
    expect(outputDirs[0].done).to.equal(false);
    expect(outputDirs[1].done).to.equal(false);
    expect(outputDirs[2].done).to.equal(false);
    sinon.assert.calledOnce(component.data().targetRecipe.update);
  });

  it('clicking the add source button should show the source modal', () => {
    const component = mount(RecipeView);
    component.setData({ isUser: true });
    const button = component.find('.add-source-button')[0];
    button.trigger('click');
    expect(component.data().showSourceModal).to.equal(true);
  });
});
