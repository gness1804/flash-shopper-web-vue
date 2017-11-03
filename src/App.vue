<template>
  <div id="app-wrapper">
    <h1>Flash Shopper</h1>
    <p
      v-if="isUser"
      class="user-logged-in-message"
    >
    Logged in as <span class="bold">{{userEmail}}</span>
    </p>
    <button
      class="button warn-button log-out-button"
      v-if="isUser"
      v-on:click="logOut"
    >
    Log Out
    </button>
    <authed-main
      v-if="isUser"
      v-bind:items="items"
      v-on:addItem="addItem"
      v-on:removeItem="removeItem"
      v-on:deleteAllItems="deleteAllItems"
      v-on:deleteAllInCart="deleteAllInCart"
      v-on:updateName="updateName"
      v-on:toggleInCart="toggleInCart"
      v-on:addToAPN="addToAPN"
      v-on:addToInstacart="addToInstacart"
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
import * as firebase from 'firebase';
import firebaseApp from '../firebaseConfig';  // eslint-disable-line
import PreAuth from './components/PreAuth';
import AuthedMain from './components/AuthedMain';
import Toast from './components/Toast';
import cleanUpUserEmail from './helpers/cleanUpUserEmail';

export default {
  name: 'app',
  components: {
    PreAuth,
    AuthedMain,
    Toast,
  },
  data() {
    return {
      isUser: false,
      itemsRef: {},
      userEmail: '',
      userId: null,
      items: [],
      toastMessage: '',
      viewToast: false,
    };
  },
  methods: {
    addItem: function (_item) {
      try {
        this.itemsRef.push(_item);
        this.showToast(`${_item.name} added to your list.`);
      } catch (error) {
        alert('Something went wrong. Please try again.');
      }
    },
    addToAPN: function (_item) {
      const newItem = { ..._item, inCart: true };
      this.itemsRef.child(_item.id).remove();
      this.itemsRef.push(newItem);
      window.open(
        `https://primenow.amazon.com/search?k=${_item.name}`,
        '_blank',
      );
    },
    addToInstacart: function (_item) {
      const newItem = { ..._item, inCart: true };
      this.itemsRef.child(_item.id).remove();
      this.itemsRef.push(newItem);
      window.open(
        `https://www.instacart.com/store/h-e-b/search_v3/${_item.name}`,
        '_blank',
      );
    },
    deleteAllInCart: function () {
      const newItems = this.items.filter((item) => {
        return !item.inCart;
      });
      this.itemsRef.set(newItems);
      this.showToast('Removed all items in cart.');
    },
    deleteAllItems: function () {
      this.itemsRef.set([]);
      this.showToast('Deleted all items.');
    },
    initializeApp: function () {
      firebase.auth().onAuthStateChanged((user) => {
        if (user) {
          this.isUser = true;
          const email = cleanUpUserEmail(user.email);
          this.userEmail = user.email;
          this.userId = user.uid;
          this.itemsRef = firebase.database().ref(email + '/main') //eslint-disable-line
          this.listenForItems(this.itemsRef);
        } else {
          this.isUser = false;
        }
      });
    },
    listenForItems: function (itemsRef) {
      itemsRef.on('value', (snapshot) => {
        const newArr = [];
        snapshot.forEach((item) => {
          newArr.push({
            name: item.val().name,
            aisle: item.val().aisle,
            quantity: item.val().quantity,
            note: item.val().note,
            inCart: item.val().inCart || false,
            id: item.key,
          });
        });
        this.sortItems(newArr);
      });
    },
    logOut: function () {
      const verify = confirm('Are you sure you want to log out?');
      if (verify) {
        firebase.auth().signOut();
      }
    },
    removeItem: function (_item) {
      this.itemsRef.child(_item.id).remove();
      this.showToast(`Removed ${_item.name} from your list.`);
    },
    showToast: function (message) {
      this.toastMessage = message;
      this.viewToast = true;
      setTimeout(() => {
        this.viewToast = false;
        this.toastMessage = '';
      }, 3000);
    },
    sortItems: function (_items) {
      this.items = _items.sort((a, b) => {
        const first = a.name.toLowerCase();
        const second = b.name.toLowerCase();
        if (first < second) {
          return -1;
        }
        if (first > second) {
          return 1;
        }
        return 0;
      });
    },
    toggleInCart: function (_item) {
      const newItem = { ..._item, inCart: !_item.inCart };
      this.itemsRef.child(_item.id).remove();
      this.itemsRef.push(newItem);
    },
    updateName: function (newName, item) {
      const newItem = { ...item, name: newName };
      this.itemsRef.child(item.id).remove();
      this.itemsRef.push(newItem);
    },
  },
  mounted: function () {
    this.initializeApp();
  },
};
</script>

<style>
#app-wrapper {
  text-align: center;
}
</style>
