// @flow

import { AuthInt, CoreFBDataInt } from './CoreFunc';
import { ToastInt } from './Toast';
import Item from '../../models/Item';

type SortType ='aisle'|'alpha';

export interface AppInt extends AuthInt, CoreFBDataInt, ToastInt {
  pantryShortItems: Item[],
  pantryRef: Object,
  sortPref: SortType,
}
