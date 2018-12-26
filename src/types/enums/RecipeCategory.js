// @flow
/* global $Keys */

const recipeCategories = {
  main: 'main',
  side: 'side',
  dessert: 'dessert',
  holiday: 'holiday',
};

type RecipeCategory = $Keys<typeof recipeCategories>;

export { recipeCategories, RecipeCategory };
