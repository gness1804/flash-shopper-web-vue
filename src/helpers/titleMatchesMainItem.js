//
import ShortItem from '../models/ShortItem';

const titleMatchesMainItem = (name, stuffFromMain) => {
  let result = false;
  if (!stuffFromMain || stuffFromMain.length === 0) {
    result = false;
    return result;
  }
  stuffFromMain.forEach(thing => {
    if (
      typeof thing.name !== 'undefined' &&
      thing.name.toLowerCase() === name.toLowerCase()
    ) {
      result = true;
    }
  });
  return result;
};

export default titleMatchesMainItem;
