// @flow

const containsDirString = (dir: string, name: string): boolean => {
  if (dir.includes(name)) {
    return true;
  }
  return false;
};

export default containsDirString;
