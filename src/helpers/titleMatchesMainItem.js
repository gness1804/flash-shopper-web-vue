// @flow

const titleMatchesMainItem = (name: string, stuffFromMain: Array<Object>): boolean => {
  let result = false;
  stuffFromMain.forEach((thing: Object) => {
    if (thing.name.toLowerCase() === name.toLowerCase()) {
      result = true;
    }
  });
  return result;
};

export default titleMatchesMainItem;
