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
      v-on:deleteAllInCart="deleteAllInCart"
      v-on:toggleInCart="toggleInCart"
      v-on:addToAPN="addToAPN"
      v-on:addToInstacart="addToInstacart"
      v-on:showToast="showToast"
      v-on:addToHEB="addToHEB"
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
import firebaseApp from '../firebaseConfig';  // eslint-disable-line
import PreAuth from './components/PreAuth';
import AuthedMain from './components/AuthedMain';
import Toast from './components/Toast';
import AppHeader from './components/AppHeader';
import cleanUpUserEmail from './helpers/cleanUpUserEmail';
import sortItems from './helpers/sortItems';
import logOut from './helpers/logOut';
import Item from './models/Item';

export default {
  name: 'app',
  components: {
    PreAuth,
    AuthedMain,
    Toast,
    AppHeader,
  },
  data(): {
    isUser: boolean,
    itemsRef: Object,
    userEmail?: string,
    userId: string | null,
    items: Array<Item>,
    toastMessage?: string,
    viewToast: boolean,
    pantryShortItems: Array<Item>,
    pantryRef: {},
  } {
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
      this.replaceItem(_item);
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
    deleteAllInCart: function (): void {
      const newItems = this.items.filter((item: Item) => {
        return !item.inCart;
      });
      this.itemsRef.set(newItems);
      this.showToast('Removed all items in cart.');
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
      }, 3000);
    },
    toggleInCart: function (_item: Item): void {
      const newItem = { ..._item, inCart: !_item.inCart };
      this.itemsRef.child(_item.id).remove();
      this.itemsRef.push(newItem);
    },
  },
  mounted: function (): void {
    this.initializeApp();
  },
};
</script>

<style>
#app-wrapper {
  text-align: center;
}
</style>
