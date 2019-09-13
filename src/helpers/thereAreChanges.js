//

const thereAreChanges = options => {
  const {
    name,
    aisle,
    note,
    quantity,
    link,
    initName,
    initAisle,
    initNote,
    initQty,
    initLink,
  } = options;
  return (
    name !== initName ||
    aisle !== initAisle ||
    note !== initNote ||
    quantity !== initQty ||
    link !== initLink
  );
};

export default thereAreChanges;
