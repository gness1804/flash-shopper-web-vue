//

class Item {
  constructor(opt) {
    this.id = null;
    this.name = opt.name;
    this.aisle = opt.aisle || '';
    this.note = opt.note || '';
    this.quantity = opt.quantity || '';
    this.inCart = opt.inCart || false;
    this.ingredientId = null;
    this.dateCompleted = opt.dateCompleted || null;
    this.link = opt.link || null;
    this.isHidden = opt.isHidden || false;
  }
}

export default Item;
