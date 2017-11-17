import { mount } from 'avoriaz';
import RecipeView from '@/components/RecipeView';
import recipe from '../helpers/FakeRecipe';

describe('RecipeView.vue', () => {
  it('should render correctly', () => {
    const component = mount(RecipeView);
    component.setData({ isUser: true });
    component.setData({ title: recipe.title });
    const el = component.find('.recipe-view-headline')[0];
    expect(el.text()).to.equal('Pumpkin pie');
  });
});
