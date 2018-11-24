// @flow

class ShortItem {
  id: string;
  name: string;
  aisle: string;

  constructor(id: string, name: string, aisle: string) {
    this.id = id;
    this.name = name;
    this.aisle = aisle;
  }
}

export default ShortItem;
