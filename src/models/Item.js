class Item {
  constructor(name, aisle, note, quantity, inCart) {
    this.id = null;
    this.name = name;
    this.aisle = aisle;
    this.note = note;
    this.quantity = quantity;
    this.inCart = inCart || false;
  }
}

export default Item;
