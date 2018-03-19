// @flow

interface Options {
  name: string,
  aisle?: string,
  note?: string,
  quantity?: string,
  inCart?: boolean,
  units?: number,
}
class Item {
  id: string | null;
  name: string;
  aisle: string;
  note: string;
  quantity: string;
  inCart: boolean;
  ingredientId: number | null;
  units: number;

  constructor(opt: Options) {
    this.id = null;
    this.name = opt.name;
    this.aisle = opt.aisle || '';
    this.note = opt.note || '';
    this.quantity = opt.quantity || '';
    this.inCart = opt.inCart || false;
    this.ingredientId = null;
    this.units = opt.units || 1;
  }
}

export default Item;
