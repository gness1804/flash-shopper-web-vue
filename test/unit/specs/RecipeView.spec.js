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

  it('should render correctly with a note', () => {
    const component = mount(RecipeView);
    component.setData({ isUser: true });
    component.setData({ title: recipe.title });
    component.setData({ note: 'Heat up the oven first' });
    const el = component.find('.note-output')[0];
    expect(el.text().trim()).to.equal('Heat up the oven first');
  });

  it('should render button string data correctly ', () => {
    const component = mount(RecipeView);
    component.setData({ isUser: true });
    component.setData({ showShowHideContainer: true });
    const el1 = component.find('.remove-image-button')[0];
    expect(el1.text().trim()).to.equal('Remove Image');
    const el2 = component.find('.add-ingredient-button')[0];
    expect(el2.text().trim()).to.equal('Add Ingredient');
    const el3 = component.find('.add-direction-button')[0];
    expect(el3.text().trim()).to.equal('Add Direction');
  });

  it('clicking the uncheck all button should mark all directions as not done', () => {
    const component = mount(RecipeView);
    component.setData({ isUser: true });
    component.setData({ showShowHideContainer: true });
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

  it('clicking the show inputs button should show the inputs container', () => {
    const component = mount(RecipeView);
    component.setData({ isUser: true });
    const button = component.find('.show-inputs-button')[0];
    button.trigger('click');
    expect(component.data().showShowHideContainer).to.equal(true);
    const el = component.find('.add-ingredient-button')[0];
    expect(el.text().trim()).to.equal('Add Ingredient');
  });

  it('clicking the reorder button and entering a new order should reorder the directions correctly (no. 1. --> no. 3)', () => {
    Object.assign(window, { prompt: () => 3 });
    const component = mount(RecipeView);
    component.setData({ isUser: true });
    component.setData({ directions });
    component.setData({
      targetRecipe: {
        update: sinon.spy(),
      },
    });
    const el = component.find('.reorder-dirs-button')[0];
    el.trigger('click');
    const resultDirs = component.data().directions;
    expect(resultDirs[0].details).to.equal('Cook the ground beef until browned');
    expect(resultDirs[0].order).to.equal(1);
    expect(resultDirs[1].details).to.equal('Add water and taco seasoning');
    expect(resultDirs[1].order).to.equal(2);
    expect(resultDirs[2].details).to.equal('Heat up the skillet');
    expect(resultDirs[2].order).to.equal(3);
    sinon.assert.calledOnce(component.data().targetRecipe.update);
  });

  it('clicking the reorder button and entering a new order should reorder the directions correctly (no. 2. --> no. 1)', () => {
    Object.assign(window, { prompt: () => 1 });
    const component = mount(RecipeView);
    component.setData({ isUser: true });
    component.setData({ directions });
    component.setData({
      targetRecipe: {
        update: sinon.spy(),
      },
    });
    const el = component.find('.reorder-dirs-button')[1];
    el.trigger('click');
    const resultDirs = component.data().directions;
    expect(resultDirs[0].details).to.equal('Cook the ground beef until browned');
    expect(resultDirs[0].order).to.equal(1);
    expect(resultDirs[1].details).to.equal('Heat up the skillet');
    expect(resultDirs[1].order).to.equal(2);
    expect(resultDirs[2].details).to.equal('Add water and taco seasoning');
    expect(resultDirs[2].order).to.equal(3);
    sinon.assert.calledOnce(component.data().targetRecipe.update);
  });

  it('clicking the reorder button and entering a new order should reorder the directions correctly (no. 3. -- > no. 2)', () => {
    Object.assign(window, { prompt: () => 2 });
    const component = mount(RecipeView);
    component.setData({ isUser: true });
    component.setData({ directions });
    component.setData({
      targetRecipe: {
        update: sinon.spy(),
      },
    });
    const el = component.find('.reorder-dirs-button')[2];
    el.trigger('click');
    const resultDirs = component.data().directions;
    expect(resultDirs[0].details).to.equal('Heat up the skillet');
    expect(resultDirs[0].order).to.equal(1);
    expect(resultDirs[1].details).to.equal('Add water and taco seasoning');
    expect(resultDirs[1].order).to.equal(2);
    expect(resultDirs[2].details).to.equal('Cook the ground beef until browned');
    expect(resultDirs[2].order).to.equal(3);
    sinon.assert.calledOnce(component.data().targetRecipe.update);
  });

  it('clicking the reorder button and entering a new order should reorder the directions correctly (no. 3. -- > no. 1)', () => {
    Object.assign(window, { prompt: () => 1 });
    const component = mount(RecipeView);
    component.setData({ isUser: true });
    component.setData({ directions });
    component.setData({
      targetRecipe: {
        update: sinon.spy(),
      },
    });
    const el = component.find('.reorder-dirs-button')[2];
    el.trigger('click');
    const resultDirs = component.data().directions;
    expect(resultDirs[0].details).to.equal('Add water and taco seasoning');
    expect(resultDirs[0].order).to.equal(1);
    expect(resultDirs[1].details).to.equal('Heat up the skillet');
    expect(resultDirs[1].order).to.equal(2);
    expect(resultDirs[2].details).to.equal('Cook the ground beef until browned');
    expect(resultDirs[2].order).to.equal(3);
    sinon.assert.calledOnce(component.data().targetRecipe.update);
  });

  it('clicking the reorder button and entering a new order should reorder the directions correctly (no. 3. -- > no. 1, then no. 2 --> no. 3)', () => {
    Object.assign(window, { prompt: () => 1 });
    const component = mount(RecipeView);
    component.setData({ isUser: true });
    component.setData({ directions });
    component.setData({
      targetRecipe: {
        update: sinon.spy(),
      },
    });
    const el = component.find('.reorder-dirs-button')[2];
    el.trigger('click');
    const resultDirs = component.data().directions;
    Object.assign(window, { prompt: () => 3 });
    const el2 = component.find('.reorder-dirs-button')[1];
    el2.trigger('click');
    expect(resultDirs[0].details).to.equal('Add water and taco seasoning');
    expect(resultDirs[0].order).to.equal(1);
    expect(resultDirs[1].details).to.equal('Heat up the skillet');
    expect(resultDirs[1].order).to.equal(2);
    expect(resultDirs[2].details).to.equal('Cook the ground beef until browned');
    expect(resultDirs[2].order).to.equal(3);
    sinon.assert.calledTwice(component.data().targetRecipe.update);
  });
});
