// @flow
import Recipe from '../models/Recipe';

const sortByTimesMadeHelper = (recipes: Recipe[]): Recipe[] => {
  if (!recipes || recipes.length === 0) {
    return [];
  }
  return recipes.sort((a: Recipe, b: Recipe) => {
    const first = a.timesMade || 0;
    const second = b.timesMade || 0;
    return second - first;
  });
};

export default sortByTimesMadeHelper;
