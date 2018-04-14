<template>
  <div id="app-wrapper">
    <app-header
      v-bind:isUser="isUser"
      v-bind:userEmail="userEmail"
      v-on:logOut="logOut"
    >
    </app-header>
    <authed-main
      v-if="isUser"
      v-bind:items="items"
      v-bind:itemsRef="itemsRef"
      v-bind:pantryShortItems="pantryShortItems"
      v-on:addItem="addItem"
      v-on:removeItem="removeItem"
      v-on:deleteAllItems="deleteAllItems"
      v-on:completeAllInCart="completeAllInCart"
      v-on:toggleInCart="toggleInCart"
      v-on:addToAPN="addToAPN"
      v-on:addToInstacart="addToInstacart"
      v-on:showToast="showToast"
      v-on:addToHEB="addToHEB"
      v-on:sortAlpha="sortAlpha"
      v-on:sortAisle="sortAisle"
      v-on:transferToDone="transferToDone"
    >
    </authed-main>

    <pre-auth
      v-else
    >
    </pre-auth>
    <toast
      v-if="isUser && viewToast"
      v-bind:message="toastMessage"
    >
    </toast>
  </div>
</template>

<script>
// @flow

import * as firebase from 'firebase';
import moment from 'moment';
import firebaseApp from '../firebaseConfig';  // eslint-disable-line
import PreAuth from './components/PreAuth';
import AuthedMain from './components/AuthedMain';
import Toast from './components/Toast';
import AppHeader from './components/AppHeader';
import cleanUpUserEmail from './helpers/cleanUpUserEmail';
import sortItems from './helpers/sortItems';
import sortItemsAisle from './helpers/sortItemsAisle';
import logOut from './helpers/logOut';
import display from './helpers/displayVars';
import Item from './models/Item';
import { AppInt } from './types/interfaces/App';

export default {
  name: 'app',
  components: {
    PreAuth,
    AuthedMain,
    Toast,
    AppHeader,
  },
  data(): AppInt {
    return {
      isUser: false,
      itemsRef: {},
      userEmail: '',
      userId: null,
      items: [],
      toastMessage: '',
      viewToast: false,
      pantryShortItems: [],
      pantryRef: {},
      sortPref: 'alpha',
    };
  },
  methods: {
    addItem: function (_item: Item): void {
      try {
        this.itemsRef.push(_item);
        this.showToast(`${_item.name} added to your list.`);
      } catch (error) {
        alert('Something went wrong. Please try again.');
      }
    },
    addToAPN: function (_item: Item): void {
      this.replaceItem(_item);
      window.open(
        `https://primenow.amazon.com/search?k=${_item.name}`,
        '_blank',
      );
    },
    addToHEB: function (_item: Item): void {
      window.open(
        `https://www.heb.com/search/?q=${_item.name}`,
        '_blank',
      );
    },
    addToInstacart: function (_item: Item): void {
      this.replaceItem(_item);
      window.open(
        `https://www.instacart.com/store/h-e-b/search_v3/${_item.name}`,
        '_blank',
      );
    },
    completeAllInCart: function (): void {
      for (const item of this.items) {
        if (item.inCart) {
          const newItem: Item = { ...item, dateCompleted: moment().format('MMM Do YY') };
          this.transferToDone(newItem);
        }
      }
    },
    deleteAllItems: function (): void {
      this.itemsRef.set([]);
      this.showToast('Deleted all items.');
    },
    getPantryShortItems: function (pantryRef: Object): void {
      pantryRef.on('value', (snapshot: Array<Object>) => {
        const newArr = [];
        snapshot.forEach((item: Object) => {
          newArr.push({
            name: item.val().name,
            id: item.key,
          });
        });
        this.pantryShortItems = newArr;
      });
    },
    initializeApp: function (): void {
      firebase.auth().onAuthStateChanged((user: Object) => {
        if (user) {
          this.isUser = true;
          const email = cleanUpUserEmail(user.email);
          this.userEmail = user.email;
          this.userId = user.uid;
          this.itemsRef = firebase.database().ref(email + '/main') //eslint-disable-line
          this.pantryRef = firebase.database().ref(email + '/pantry') //eslint-disable-line
          this.listenForItems(this.itemsRef);
          this.getPantryShortItems(this.pantryRef);
        } else {
          this.isUser = false;
        }
      });
    },
    listenForItems: async function (itemsRef: Object): void {
      itemsRef.on('value', async (snapshot: Array<Object>) => {
        const newArr: Item[] = [];
        snapshot.forEach((item: Object) => {
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
        if (this.sortPref === 'alpha') {
          this.items = sortItems(newArr);
        } else if (this.sortPref === 'aisle') {
          this.items = sortItemsAisle(newArr);
        } else {
          this.items = sortItems(newArr);
        }
      });
    },
    logOut: function (): void {
      logOut();
    },
    removeItem: function (_item: Item): void {
      this.itemsRef.child(_item.id).remove();
      this.showToast(`Removed ${_item.name} from your list.`);
    },
    replaceItem: function (_item: Item): void {
      const newItem = { ..._item, inCart: true };
      this.itemsRef.child(_item.id).remove();
      this.itemsRef.push(newItem);
    },
    showToast: function (message: string): void {
      this.toastMessage = message;
      this.viewToast = true;
      setTimeout(() => {
        this.viewToast = false;
        this.toastMessage = '';
      }, display.timerStandard);
    },
    sortAisle: function (): void {
      this.items = sortItemsAisle(this.items);
      localStorage.setItem('fsSortPref', 'aisle');
    },
    sortAlpha: function (): void {
      this.items = sortItems(this.items);
      localStorage.setItem('fsSortPref', 'alpha');
    },
    toggleInCart: function (_item: Item): void {
      const newItem = { ..._item, inCart: !_item.inCart };
      this.itemsRef.child(_item.id).remove();
      this.itemsRef.push(newItem);
    },
    transferToDone: async function (_item: Item): void {
      const email = cleanUpUserEmail(this.userEmail);
      this.itemsRef.child(_item.id).remove();
      /* eslint-disable prefer-template */
      firebase.database().ref(email + '/completed').push(_item);
      this.showToast(`${_item.name} completed.`);
       /* eslint-enable prefer-template */
    },
  },
  mounted: function (): void {
    if (localStorage.getItem('fsSortPref')) {
      this.sortPref = localStorage.getItem('fsSortPref');
    } else {
      this.sortPref = 'alpha';
    }
    this.initializeApp();
  },
};
</script>

<style>
#app-wrapper {
  text-align: center;
}
</style>
