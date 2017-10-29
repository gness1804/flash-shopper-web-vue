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
      Go Home
    </button>
    <button
      class="button warn-button delete-all-in-pantry-button"
      v-if="isUser && items.length > 0"
      v-on:click="deleteAllItems"
    >
      Delete ALL Items
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
      Add Item
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
  </div>
</template>

<script>
import * as firebase from 'firebase';
import firebaseApp from '../../firebaseConfig';  // eslint-disable-line
import EachPantryItem from './EachPantryItem';
import cleanUpUserEmail from '../helpers/cleanUpUserEmail';
import Item from '../models/Item';

export default {
  name: 'Pantry',
  components: {
    EachPantryItem,
  },
  data() {
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
    };
  },
  methods: {
    addItem: function () {
      const { name, aisle, note, quantity } = this;
      if (!name) {
        this.triggerErrorState('Oops, you must enter at least a name. Please try again.');
        return;
      }
      this.resetInputFields();
      const item = new Item(name, aisle, note, quantity);
      try {
        this.itemsRef.push(item);
      } catch (error) {
        alert('Something went wrong. Please try again.');
      }
    },
    deleteAllItems: function () {
      const warning = confirm('Are you sure you want to delete ALL items? This cannot be undone!');
      if (warning) {
        this.itemsRef.set([]);
      }
    },
    goHome: function () {
      this.$router.push('/');
    },
    initializeApp: function () {
      firebase.auth().onAuthStateChanged((user) => {
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
    makeErrorFalse: function () {
      this.error = false;
      this.errorMssg = '';
    },
    resetInputFields: function () {
      this.name = '';
      this.aisle = '';
      this.note = '';
      this.quantity = '';
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
    transferItemToMainList: function (item) {
      const email = cleanUpUserEmail(this.userEmail);
      /* eslint-disable prefer-template */
      firebase.database().ref(email + '/main').push(item);
       /* eslint-enable prefer-template */
    },
    triggerErrorState: function (message) {
      this.error = true;
      this.errorMssg = message;
    },
  },
  mounted: function () {
    this.initializeApp();
  },
};
</script>

<style scoped>
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


