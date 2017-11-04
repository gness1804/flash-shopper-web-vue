// @flow
class Item {
  id: number | null;
  name: string;
  aisle: string;
  note: string;
  quantity: string;
  inCart: boolean;

  constructor(name: string, aisle: string, note: string, quantity: string, inCart: boolean) {
    this.id = null;
    this.name = name;
    this.aisle = aisle;
    this.note = note;
    this.quantity = quantity;
    this.inCart = inCart || false;
  }
}

export default Item;
