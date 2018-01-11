// @flow

const containsDirString = (dir: string, name: string): boolean => {
  console.log('dir:', dir);
  if (dir.includes(name)) {
    return true;
  }
  return false;
};

export default containsDirString;
