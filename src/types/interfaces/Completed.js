// @flow
import { AuthInt, CoreFBDataInt } from './CoreFunc';
import { ToastInt } from './Toast';

export interface CompletedInt extends AuthInt, CoreFBDataInt, ToastInt {
  deleteAllString: string;
}
