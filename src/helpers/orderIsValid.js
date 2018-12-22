// @flow
import Direction from '../models/Direction';

const orderIsValid = (order: number, dirs: Array<Direction>): boolean => {
  if (
    typeof order === 'number' &&
    order > 0 &&
    order <= dirs.length &&
    Number.isInteger(order)
  ) {
    return true;
  }
  return false;
};

export default orderIsValid;
