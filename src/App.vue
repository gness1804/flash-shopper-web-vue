<template>
  <div id="app">
    <h1>Flash Shopper</h1>
    <button
      v-if="isUser"
      v-on:click="logOut"
    >
    Log Out
    </button>
    <authed-main
      v-if="isUser"
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
    };
  },
  methods: {
    initializeApp: function () {
      firebase.auth().onAuthStateChanged((user) => {
        if (user) {
          this.isUser = true;
          // const email = cleanUpUserEmail(user.email)
          // this.setState({ userEmail: user.email })
          // this.setState({ userId: user.uid })
          // this.itemsRef = firebase.database().ref(email + '/main') //eslint-disable-line
          // this.hideAuthScreen()
          // this.listenForItems(this.itemsRef)
        } else {
          this.isUser = false;
        }
      });
    },
    logOut: function () {
      const verify = confirm('Are you sure you want to log out?');
      if (verify) {
        firebase.auth().signOut();
      }
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
</style>
