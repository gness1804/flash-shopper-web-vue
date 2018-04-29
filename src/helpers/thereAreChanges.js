// @flow

interface OptionsInt {
  name: string,
  aisle?: string,
  note?: string,
  quantity?: string,
  initName: string,
  initAisle?: string,
  initNote?: string,
  initQty?: string,
}

const thereAreChanges = (options: OptionsInt): boolean => {
  const { name, aisle, note, quantity, initName, initAisle, initNote, initQty } = options;
  if (name !== initName || aisle !== initAisle || note !== initNote || quantity !== initQty) {
    return true;
  }
  return false;
};

export default thereAreChanges;
