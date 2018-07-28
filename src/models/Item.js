// @flow

interface Options {
  name: string,
  aisle?: string,
  note?: string,
  quantity?: string,
  inCart?: boolean,
  dateCompleted?: string | null,
  link?: string | null,
}

class Item {
  id: string | null;
  name: string;
  aisle: string;
  note: string;
  quantity: string;
  inCart: boolean;
  ingredientId: number | null;
  dateCompleted: string | null;
  link: string | null;

  constructor(opt: Options) {
    this.id = null;
    this.name = opt.name;
    this.aisle = opt.aisle || '';
    this.note = opt.note || '';
    this.quantity = opt.quantity || '';
    this.inCart = opt.inCart || false;
    this.ingredientId = null;
    this.dateCompleted = opt.dateCompleted || null;
    this.link = opt.link || null;
  }
}

export default Item;
