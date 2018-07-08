// @flow

const findLastMade = (dates: number[]): number | null => {
  if (dates.length < 1) {
    return null;
  }
  return Math.max(...dates);
};

export default findLastMade;
