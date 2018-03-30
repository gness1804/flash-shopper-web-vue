// @flow

const thereAreChanges = (options: Object): boolean => {
  const { name, aisle, note, quantity, initName, initAisle, initNote, initQty } = options;
  if (name !== initName || aisle !== initAisle || note !== initNote || quantity !== initQty) {
    return true;
  }
  return false;
};

export default thereAreChanges;
