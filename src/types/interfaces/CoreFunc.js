// @flow
import * as firebase from 'firebase';
import Item from '../../models/Item';

export interface AuthInt {
  isUser: boolean;
  userEmail?: string;
  userId: string | null;
}

export interface CoreFBDataInt {
  itemsRef: firebase.database.Reference;
  items: Item[];
}

export interface PreAuthInt {
  email?: string;
  password?: string;
  errorMssg?: string;
  error: boolean;
}
