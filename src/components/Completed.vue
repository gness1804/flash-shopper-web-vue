<template>
  <div id="completed">
    <app-header
      v-bind:isUser="isUser"
      v-bind:userEmail="userEmail"
      v-on:logOut="logOut"
    >
    </app-header>
    <p>I am the completed items.</p>
  </div>
</template>

<script>
// @flow
import * as firebase from 'firebase';
import firebaseApp from '../../firebaseConfig';  // eslint-disable-line
import AppHeader from './AppHeader';
import logOut from '../helpers/logOut';
import cleanUpUserEmail from '../helpers/cleanUpUserEmail';
import sortItems from '../helpers/sortItems';
import Item from '../models/Item';

interface Data {
  isUser: boolean,
  userEmail: string,
  userId: string,
  itemsRef: Object,
  items: Item[],
}

export default {
  name: 'completed',
  components: {
    AppHeader,
  },
  data(): Data {
    return {
      isUser: false,
      userEmail: '',
      userId: '',
      itemsRef: {},
      items: [],
    };
  },
  methods: {
    initializeApp: function (): void {
      firebase.auth().onAuthStateChanged((user: Object) => {
        if (user) {
          this.isUser = true;
          const email = cleanUpUserEmail(user.email);
          this.userEmail = user.email;
          this.userId = user.uid;
          this.itemsRef = firebase.database().ref(`${email}/completed`);
          this.listenForItems(this.itemsRef);
        } else {
          this.isUser = false;
        }
      });
    },
    listenForItems: function (itemsRef: Object): void {
      itemsRef.on('value', (snapshot: Array<Object>) => {
        const newArr = [];
        snapshot.forEach((item: Object) => {
          newArr.push({
            name: item.val().name,
            aisle: item.val().aisle,
            quantity: item.val().quantity,
            note: item.val().note,
            inCart: item.val().inCart || false,
            id: item.key,
          });
        });
        this.items = sortItems(newArr);
      });
    },
    logOut: function (): void {
      logOut();
    },
  },
  mounted: function (): void {
    this.initializeApp();
  },
};
</script>


<style scoped>

</style>


