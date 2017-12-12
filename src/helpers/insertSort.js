// @flow
import Direction from '../models/Direction';

// const reorder = (dirs: Array<Direction>) => {
//   const newDirs = [];
//   for (let i = 0; i < dirs.length; i++) {
//     const el = dirs[i];
//     newDirs.splice(i, 0, el);
//   }
//   return newDirs;
// };

const insertSort = (dirs: Array<Direction>, newOrder: number, targetDir: Direction) => {
  const newDirs = [];
  if (dirs.length === 0) {
    return [];
  }
  for (let i = 0; i < dirs.length; i++) {
    const el = dirs[i];
    if (el.id === targetDir.id) {
      const newEl = { ...el, order: newOrder };
      newDirs.push(newEl);
    }
  }
  for (let i = 0; i < dirs.length; i++) {
    const el = dirs[i];
    if (el.id !== targetDir.id) {
      if (el.order < newOrder) {
        newDirs.push(el);
      } else if (el.order >= newOrder) {
        const newEl = { ...el, order: el.order + 1 };
        newDirs.push(newEl);
      }
    }
  }
  return newDirs;
};

export default insertSort;
