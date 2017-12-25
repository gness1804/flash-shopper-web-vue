// @flow

const flattenArr = (arr: Array<Object>): Array<string> => {
  const newArr = [];
  for (const item of arr) {
    if (typeof item === 'object') {
      const keys = Object.keys(item);
      if (keys.indexOf('name') !== -1) {
        newArr.push(item.name);
      }
    }
  }
  return newArr;
};

export default flattenArr;
