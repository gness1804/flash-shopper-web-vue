<template>
  <div id="completed">
    <app-header
      v-bind:isUser="isUser"
      v-bind:userEmail="userEmail"
      v-on:logOut="logOut"
    >
    </app-header>
    <h2>
      Completed Items
    </h2>
    <button
      v-if="items.length > 0"
      class="button warn-button delete-all-items-button"
      v-on:click="deleteAllItems"
    >
      {{deleteAllString}}
    </button>
    <button
      v-if="items.length > 0"
      class="button sort-items-button"
      v-on:click="sortByDate"
    >
      Sort by Date
    </button>
    <div
    class="items"
    v-if="items.length > 0"
    >
      <each-completed-item
        v-for="item of items"
        v-bind:key="item.id"
        v-bind:item="item"
        v-on:restoreItemToMain="restoreItemToMain"
        v-on:deleteItem="deleteItem"
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
import sortByDateH from '../helpers/sortByDateH';
import buttonStrings from '../helpers/buttonStrings';
import Item from '../models/Item';
import { CompletedInt } from '../types/interfaces/Completed';

export default {
  name: 'completed',
  components: {
    AppHeader,
    EachCompletedItem,
  },
  data(): CompletedInt {
    return {
      isUser: false,
      userEmail: '',
      userId: '',
      itemsRef: {},
      items: [],
      toastMessage: '',
      viewToast: false,
      deleteAllString: buttonStrings.deleteAllItems,
    };
  },
  methods: {
    deleteAllItems: function (): void {
      const warn = confirm('Are you sure you want to delete all items?');
      if (warn) {
        this.itemsRef.set([]);
        this.showToast('Deleted all items.');
      }
    },
    deleteItem: function (_item: Item): void {
      const warn = confirm('Are you sure you want to delete this item?');
      if (warn) {
        this.itemsRef.child(_item.id).remove();
        this.showToast('Item deleted.');
      }
    },
    initializeApp: function (): void {
      firebase.auth().onAuthStateChanged((user: firebase.User) => {
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
    listenForItems: function (itemsRef: firebase.database.Reference): void {
      itemsRef.on('value', (snapshot: firebase.database.DataSnapshot) => {
        const newArr = [];
        snapshot.forEach((item: firebase.database.DataSnapshot) => {
          newArr.push({
            name: item.val().name,
            aisle: item.val().aisle,
            quantity: item.val().quantity,
            note: item.val().note,
            inCart: item.val().inCart || false,
            dateCompleted: item.val().dateCompleted || null,
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
    sortByDate: function (): void {
      this.items = sortByDateH(this.items);
    },
  },
  mounted: function (): void {
    this.initializeApp();
  },
};
</script>


<style scoped>
  .delete-all-items-button {
    margin: 20px auto;
  }
</style>


