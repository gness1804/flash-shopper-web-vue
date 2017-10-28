<template>
  <div id="pantry">
    <h2>Pantry</h2>
    <button
      class="button go-home-button"
      v-on:click="goHome"
    >
      Go Home
    </button>
    <button
      class="button warn-button delete-all-in-pantry-button"
      v-if="isUser"
      v-on:click="deleteAllItems"
    >
      Delete ALL Items
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
    };
  },
  methods: {
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
</style>


