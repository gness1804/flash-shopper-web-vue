// @flow

const thereAreChanges = (options: Object): boolean => {
  const { name, aisle, note, quantity, units, initName, initAisle, initNote, initQty, initUnits } = options;
  if (name !== initName || aisle !== initAisle || note !== initNote || quantity !== initQty || units !== initUnits) {
    return true;
  }
  return false;
};

export default thereAreChanges;
