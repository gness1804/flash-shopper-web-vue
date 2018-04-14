// @flow
import Item from '../../models/Item';

export interface AuthInt {
  isUser: boolean,
  userEmail?: string,
  userId: string | null,
}

export interface CoreFBDataInt {
  itemsRef: Object,
  items: Item[],
}
