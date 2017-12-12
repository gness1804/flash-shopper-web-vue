// @flow
import Direction from '../models/Direction';

const orderIsValid = (order: number, dirs: Array<Direction>): boolean => {
  if (typeof order === 'number' && order > 0 && order <= dirs.length) {
    return true;
  }
  return false;
};

export default orderIsValid;
