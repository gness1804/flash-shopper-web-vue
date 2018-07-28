// @flow

interface OptionsInt {
  name: string,
  aisle?: string,
  note?: string,
  quantity?: string,
  link?: string,
  initName: string,
  initAisle?: string,
  initNote?: string,
  initQty?: string,
  initLink?: string,
}

const thereAreChanges = (options: OptionsInt): boolean => {
  const { name, aisle, note, quantity, link, initName, initAisle, initNote, initQty, initLink } = options;
  if (name !== initName || aisle !== initAisle || note !== initNote || quantity !== initQty || link !== initLink) {
    return true;
  }
  return false;
};

export default thereAreChanges;
