import Item from '../models/Item';
import Recipe from '../models/Recipe';

const sortItems = (items: (Array<Item>|Array<Recipe>)):(Array<Item>|Array<Recipe>|[]) => {
  if (!items || items.length === 0) {
    return [];
  }
  return items.sort((a: (Item|Recipe), b: (Item|Recipe)) => {
    let first;
    let second;

    if (a.name) {
      first = a.name.toLowerCase();
    } else if (a.title) {
      first = a.title.toLowerCase();
    }

    if (b.name) {
      second = b.name.toLowerCase();
    } else if (b.title) {
      second = b.title.toLowerCase();
    }

    if (first && second && first < second) {
      return -1;
    }
    if (first && second && first > second) {
      return 1;
    }
    return 0;
  });
};

export default sortItems;
