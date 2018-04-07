<template>
  <div id="completed">
    <app-header
      v-bind:isUser="isUser"
      v-bind:userEmail="userEmail"
      v-on:logOut="logOut"
    >
    </app-header>
    <div
    class="items"
    v-if="items.length > 0"
    >
      <each-completed-item
        v-for="item of items"
        v-bind:key="item.id"
        v-bind:item="item"
        v-on:restoreItemToMain="restoreItemToMain"
      >
      </each-completed-item>
    </div>
    <p
      v-else
    >
      It looks like you do not have any completed items. When you mark an item as completed, it will show up here.
    </p>
  </div>
</template>

<script>
// @flow
import * as firebase from 'firebase';
import firebaseApp from '../../firebaseConfig';  // eslint-disable-line
import AppHeader from './AppHeader';
import EachCompletedItem from './EachCompletedItem';
import logOut from '../helpers/logOut';
import cleanUpUserEmail from '../helpers/cleanUpUserEmail';
import sortItems from '../helpers/sortItems';
import display from '../helpers/displayVars';
import Item from '../models/Item';

interface Data {
  isUser: boolean,
  userEmail: string,
  userId: string,
  itemsRef: Object,
  items: Item[],
  toastMessage: string,
  viewToast: boolean,
}

export default {
  name: 'completed',
  components: {
    AppHeader,
    EachCompletedItem,
  },
  data(): Data {
    return {
      isUser: false,
      userEmail: '',
      userId: '',
      itemsRef: {},
      items: [],
      toastMessage: '',
      viewToast: false,
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
    restoreItemToMain: function (_item: Item): void {
      const email = cleanUpUserEmail(this.userEmail);
      this.itemsRef.child(_item.id).remove();
      firebase.database().ref(`${email}/main`).push(_item);
      this.showToast(`${_item.name} restored to main list.`);
    },
    showToast: function (message: string): void {
      this.toastMessage = message;
      this.viewToast = true;
      setTimeout(() => {
        this.viewToast = false;
        this.toastMessage = '';
      }, display.timerStandard);
    },
  },
  mounted: function (): void {
    this.initializeApp();
  },
};
</script>


<style scoped>

</style>


