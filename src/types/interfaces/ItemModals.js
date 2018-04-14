// @flow
import Item from '../../models/Item';

export interface ItemModalInt {
  name: string,
  aisle?: string,
  note?: string,
  quantity?: string,
  error: boolean,
  errorMssg?: string,
}

export interface EditItemModalInt extends ItemModalInt {
  targetItem: Item,
  initName: string,
  initAisle?: string,
  initNote?: string,
  initQty?: string,
}
