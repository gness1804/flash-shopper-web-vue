// @flow
class Item {
  id: string | null;
  name: string;
  aisle: string;
  note: string;
  quantity: string;
  inCart: boolean;
  ingredientId: number | null;

  constructor(name: string, aisle?: string, note?: string, quantity?: string, inCart?: boolean) {
    this.id = null;
    this.name = name;
    this.aisle = aisle || '';
    this.note = note || '';
    this.quantity = quantity || '';
    this.inCart = inCart || false;
    this.ingredientId = null;
  }
}

export default Item;
