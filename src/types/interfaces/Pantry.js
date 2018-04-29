// @flow

import { AuthInt, CoreFBDataInt } from './CoreFunc';
import { ToastInt } from './Toast';
import Item from '../../models/Item';
import ShortItem from '../../models/ShortItem';

export interface PantryInt extends AuthInt, CoreFBDataInt, ToastInt {
  name: string,
  aisle?: string,
  note?: string,
  quantity?: string,
  error: boolean,
  errorMssg?: string,
  goHomeString: string,
  deleteAllItemsString: string,
  addItemString: string,
  viewEdit: boolean,
  itemToEdit: Item,
  mainShortItems: ShortItem[],
}
