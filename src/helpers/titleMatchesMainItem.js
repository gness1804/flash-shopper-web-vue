// @flow

const titleMatchesMainItem = (name: string, stuffFromMain: Array<Object>): boolean => {
  let result = false;
  if (!stuffFromMain || stuffFromMain.length === 0) {
    result = false;
    return result;
  }
  stuffFromMain.forEach((thing: Object) => {
    if (typeof thing.name !== 'undefined' && (thing.name.toLowerCase() === name.toLowerCase())) {
      result = true;
    }
  });
  return result;
};

export default titleMatchesMainItem;
