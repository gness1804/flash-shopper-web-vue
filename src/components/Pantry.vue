<template>
  <div id="pantry">
    <h2>Pantry</h2>
    <p
      v-if="isUser && error"
      class="error-message"
    >
      {{errorMssg}}
    </p>
    <button
      class="button go-home-button"
      v-on:click="goHome"
    >
      {{goHomeString}}
    </button>
    <button
      class="button go-to-recipes-button"
      v-on:click="goToRecipes"
    >
      {{goToRecipesString}}
    </button>
    <button
      class="button warn-button delete-all-in-pantry-button"
      v-if="isUser && items.length > 0"
      v-on:click="deleteAllItems"
    >
      {{deleteAllItemsString}}
    </button>
    <div
      class="item-input-container"
      v-if="isUser"
    >
      <input
        type="text"
        placeholder="Name"
        @input="makeErrorFalse"
        v-model="name"
        class="text-input-field"
      />
      <input
        type="text"
        placeholder="Aisle"
        @input="makeErrorFalse"
        v-model="aisle"
        class="text-input-field"
      />
      <input
        type="text"
        placeholder="Note"
        @input="makeErrorFalse"
        v-model="note"
        class="text-input-field"
      />
      <input
        type="text"
        placeholder="Quantity"
        @input="makeErrorFalse"
        v-model="quantity"
        class="text-input-field"
      />
    </div>
    <button
        class="button add-item-to-pantry-button"
        v-on:click="addItem"
        v-if="isUser"
      >
      {{addItemString}}
      </button>
    <div
      class="pantry-main-container"
      v-if="isUser"
      v-bind:class="{ noBorder: items.length === 0}"
    >
      <div
        class="items"
        v-if="items.length > 0"
      >
      <each-pantry-item
        v-for="item of items"
        v-bind:key="item.id"
        v-bind:item="item"
        v-on:transferItemToMainList="transferItemToMainList"
        v-on:deleteItem="deleteItem"
      >
      </each-pantry-item>
    </div>
    <p
      v-else
    >
      There are no items in your pantry. Add one now.
    </p>
    </div>
    <p
      v-else
    >
    Oops, you are not logged in. Please click the Go Home button above to log in.
    </p>
  <toast
    v-if="viewToast"
    v-bind:message="toastMessage"
  >
  </toast>
  </div>
</template>

<script>
// @flow

import * as firebase from 'firebase';
import firebaseApp from '../../firebaseConfig';  // eslint-disable-line
import EachPantryItem from './EachPantryItem';
import Toast from './Toast';
import cleanUpUserEmail from '../helpers/cleanUpUserEmail';
import buttonStrings from '../helpers/buttonStrings';
import Item from '../models/Item';

export default {
  name: 'Pantry',
  components: {
    EachPantryItem,
    Toast,
  },
  data(): {
      isUser: boolean,
      itemsRef: Object,
      userEmail?: string,
      userId: string | null,
      items: Array<Item>,
      name?: string,
      aisle?: string,
      note?: string,
      quantity?: string,
      error: boolean,
      errorMssg?: string,
      toastMessage?: string,
      viewToast: boolean,
      goHomeString: string,
      goToRecipesString: string,
      deleteAllItemsString: string,
      addItemString: string,
  } {
    return {
      isUser: false,
      itemsRef: {},
      userEmail: '',
      userId: null,
      items: [],
      name: '',
      aisle: '',
      note: '',
      quantity: '',
      error: false,
      errorMssg: '',
      toastMessage: '',
      viewToast: false,
      goHomeString: buttonStrings.goHome,
      goToRecipesString: buttonStrings.goToRecipes,
      deleteAllItemsString: buttonStrings.deleteAllItems,
      addItemString: buttonStrings.addItem,
    };
  },
  methods: {
    addItem: function (): void {
      const { name, aisle, note, quantity } = this;
      if (!name) {
        this.triggerErrorState('Oops, you must enter at least a name. Please try again.');
        return;
      }
      this.resetInputFields();
      const item = new Item(name, aisle, note, quantity);
      try {
        this.itemsRef.push(item);
        this.showToast(`${item.name} added to pantry.`);
      } catch (error) {
        alert('Something went wrong. Please try again.');
      }
    },
    deleteAllItems: function (): void {
      const warning = confirm('Are you sure you want to delete ALL items? This cannot be undone!');
      if (warning) {
        this.itemsRef.set([]);
      }
    },
    deleteItem: function (item: Item): void {
      if (this.itemsRef.length > 0) {
        this.itemsRef.child(item.id).remove();
      }
      this.showToast(`${item.name} removed from pantry.`);
    },
    goHome: function (): void {
      this.$router.push('/');
    },
    goToRecipes: function (): void {
      this.$router.push('/recipes');
    },
    initializeApp: function (): void {
      firebase.auth().onAuthStateChanged((user: Object) => {
        if (user) {
          this.isUser = true;
          const email = cleanUpUserEmail(user.email);
          this.userEmail = user.email;
          this.userId = user.uid;
          this.itemsRef = firebase.database().ref(email + '/pantry') //eslint-disable-line
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
        this.sortItems(newArr);
      });
    },
    makeErrorFalse: function (): void {
      this.error = false;
      this.errorMssg = '';
    },
    resetInputFields: function (): void {
      this.name = '';
      this.aisle = '';
      this.note = '';
      this.quantity = '';
    },
    showToast: function (message: string): void {
      this.toastMessage = message;
      this.viewToast = true;
      setTimeout(() => {
        this.viewToast = false;
        this.toastMessage = '';
      }, 3000);
    },
    sortItems: function (_items: Array<Item>): void {
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
    transferItemToMainList: function (item: Item): void {
      const email = cleanUpUserEmail(this.userEmail);
      /* eslint-disable prefer-template */
      firebase.database().ref(email + '/main').push(item);
      this.showToast(`${item.name} added to main list.`);
       /* eslint-enable prefer-template */
    },
    triggerErrorState: function (message: string): void {
      this.error = true;
      this.errorMssg = message;
    },
  },
  mounted: function (): void {
    this.initializeApp();
  },
};
</script>

<style scoped>
  #pantry {
    position: relative;
  }

  .pantry-main-container {
    border: 1px solid #000;
    border-radius: 5px;
    margin: 60px auto;
    width: 80vw;
  }

  .noBorder {
    border: none;
  }

  .error-message {
    color: #f00;
  }
</style>


