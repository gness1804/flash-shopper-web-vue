// @flow
import Item from '../../models/Item';

export interface ItemModal {
  name: string,
  aisle?: string,
  note?: string,
  quantity?: string,
  error: boolean,
  errorMssg?: string,
}

export interface EditItemModal extends ItemModal {
  targetItem: Item,
  initName: string,
  initAisle: string,
  initNote: string,
  initQty: string,
}
