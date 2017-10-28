<template>
  <div id="pantry">
    <h2>Pantry</h2>
    <button
      class="button go-home-button"
      v-on:click="goHome"
    >
      Go Home
    </button>
    <div
      class="pantry-main"
      v-if="isUser"
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

</style>


