// @flow

const containsDirString = (dir: string, name: string): boolean => {
  let result = false;
  const lcName = name.toLowerCase().replace('.', '');
  const lcDir = dir.toLowerCase().replace('.', '');
  const nameArr = lcName.split(' ');
  const dirArr = lcDir.split(' ');
  for (let i = 0; i < nameArr.length; i++) {
    for (let j = 0; j < dirArr.length; j++) {
      if (nameArr[i] === dirArr[j]) {
        result = true;
      }
    }
  }
  return result;
};

export default containsDirString;
