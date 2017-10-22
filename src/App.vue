<template>
  <div id="app">
    <h1>Flash Shopper</h1>
    <button
      class="button warn-button"
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
    >
    </authed-main>

    <pre-auth
      v-else
    >
    </pre-auth>
  </div>
</template>

<script>
import * as firebase from 'firebase';
import firebaseApp from '../firebaseConfig';  // eslint-disable-line
import PreAuth from './components/PreAuth';
import AuthedMain from './components/AuthedMain';
import cleanUpUserEmail from './helpers/cleanUpUserEmail';

export default {
  name: 'app',
  components: {
    PreAuth,
    AuthedMain,
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
    addItem: function (_item) {
      try {
        this.itemsRef.push(_item);
      } catch (error) {
        alert('Something went wrong. Please try again.');
      }
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

<style>
html {
  background-color: #bcdbf3;
  font-family: 'Open Sans', sans-serif;
}
h1 {
  margin: 40px auto;
}
#app {
  text-align: center;
}
.text-input-field {
  border: 2px solid#d1d3d5;
  box-sizing: border-box;
  margin-bottom: 20px;
  text-align: center;
  width: 40vw;
}
.button {
  background-color: #3c3ce5;
  border: 1px solid #3c3ce5;
  border-radius: 0;
  color: #ffffff;
  padding: 5px;
}
.button:hover {
  background-color:#8787ea;
  border: 1px solid #8787ea;
  cursor: pointer;
}
.warn-button {
  background-color: #f00;
  border: 1px solid #f00;
}
.warn-button:hover {
  background-color:#f5765a;
  border: 1px solid #f5765a;
}
</style>
