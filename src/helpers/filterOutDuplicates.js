// @flow

const filterOutDuplicates = (names: Array<string>): Array<string> => {
  const newArr = [];
  for (let i = 0; i < names.length; i++) {
    if (newArr.indexOf(names[i]) === -1) {
      newArr.push(names[i]);
    }
  }
  return newArr;
};

export default filterOutDuplicates;
