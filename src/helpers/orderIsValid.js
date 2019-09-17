//

const orderIsValid = (order, dirs) => {
  if (
    typeof order === 'number' &&
    order > 0 &&
    order <= dirs.length &&
    Number.isInteger(order)
  ) {
    return true;
  }
  return false;
};

export default orderIsValid;
