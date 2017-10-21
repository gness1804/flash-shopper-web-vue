<template>
  <div id="app">
    <h1>Flash Shopper</h1>
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
  },
  mounted: function () {
    this.initializeApp();
  },
};
</script>

<style>
#app {
  text-align: center;
}
</style>
