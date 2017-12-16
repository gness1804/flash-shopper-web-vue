// @flow

import * as firebase from 'firebase';

const logOut = (): void => {
  const verify = confirm('Are you sure you want to log out?');
  if (verify) {
    firebase.auth().signOut();
  }
};

export default logOut;
