//

const sortByTimesMadeHelper = recipes => {
  if (!recipes || recipes.length === 0) {
    return [];
  }
  return recipes.sort((a, b) => {
    const first = a.timesMade || 0;
    const second = b.timesMade || 0;
    return second - first;
  });
};

export default sortByTimesMadeHelper;
