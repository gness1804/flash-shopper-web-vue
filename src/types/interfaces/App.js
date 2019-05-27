// @flow

import * as firebase from 'firebase';
import { AuthInt, CoreFBDataInt } from './CoreFunc';
import { ToastInt } from './Toast';
import ShortItem from '../../models/ShortItem';
import Item from '../../models/Item';

type SortType = 'aisle' | 'alpha';

export interface AppInt extends AuthInt, CoreFBDataInt, ToastInt {
  pantryShortItems: ShortItem[];
  pantryRef: firebase.database.Reference;
  sortPref: SortType;
  lastTransferredItem: Item;
  undoMessage?: String;
}
