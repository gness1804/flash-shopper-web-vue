//

const filterOutDuplicateNames = names => {
  if (!names || !names.length === 0) {
    return [];
  }
  const newArr = [];
  for (let i = 0; i < names.length; i++) {
    if (newArr.indexOf(names[i]) === -1) {
      newArr.push(names[i]);
    }
  }
  return newArr.sort();
};

const filteroutDuplicateRecentItems = (name, items) => {
  if (!items || items.length === 0) {
    return [];
  }
  return items.filter(i => i.name.toLowerCase() !== name.toLowerCase());
};

export { filterOutDuplicateNames, filteroutDuplicateRecentItems };
