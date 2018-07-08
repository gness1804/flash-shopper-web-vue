// @flow

const findLastMade = (dates: number[]): number | null => {
  if (!Array.isArray(dates) || dates.length < 1) {
    return null;
  }
  return Math.max(...dates);
};

export default findLastMade;
