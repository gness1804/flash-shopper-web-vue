//

const sequentialize = dirs => {
  const newDirs = [];
  if (dirs.length === 0) {
    return [];
  }
  for (let i = 0; i < dirs.length; i++) {
    const el = dirs[i];
    const newEl = { ...el, order: dirs.indexOf(el) + 1 };
    newDirs.push(newEl);
  }
  return newDirs;
};

export default sequentialize;
