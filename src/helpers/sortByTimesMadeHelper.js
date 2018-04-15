// @flow
import Recipe from '../models/Recipe';

const sortByTimesMadeHelper = (recipes: Recipe[]): Recipe[] => {
  if (!recipes || recipes.length === 0) {
    return [];
  }
  return recipes.sort((a: Recipe, b: Recipe) => {
    return b.timesMade - a.timesMade;
  });
};

export default sortByTimesMadeHelper;
