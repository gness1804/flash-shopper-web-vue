import { mount } from 'avoriaz';
import RecipeView from '@/components/RecipeView';
import recipe from '../helpers/FakeRecipe';

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
});
