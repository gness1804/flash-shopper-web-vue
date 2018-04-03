// @flow
import Item from '../models/Item';

const weedOutDones = (items: Item[]): Item[] => {
  return items.filter((it: Item) => {
    return !it.done;
  });
};

export default weedOutDones;

