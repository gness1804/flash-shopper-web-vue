// @flow

const containsDirString = (dir: string, name: string): boolean => {
  if (dir.toLowerCase().includes(name.toLowerCase())) {
    return true;
  }
  return false;
};

export default containsDirString;
