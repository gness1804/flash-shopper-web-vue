// @flow

const flattenArr = (arr: Object[]): string[] => {
  const newArr: string[] = [];
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
