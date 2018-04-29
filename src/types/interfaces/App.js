// @flow

import { AuthInt, CoreFBDataInt } from './CoreFunc';
import { ToastInt } from './Toast';

type SortType ='aisle'|'alpha';

export interface AppInt extends AuthInt, CoreFBDataInt, ToastInt {
  pantryShortItems: [{
    name: string,
    id: string,
  }],
  pantryRef: Object,
  sortPref: SortType,
}
