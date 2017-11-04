<template>
  <div id="recipes">
    <h2>Recipes</h2>
    <div
      v-if="isUser"
      class="recipes-main"
    >
  <!-- all stuff goes here -->
    </div>
    <p
      v-else
    >
    Oops, you are not logged in. Please click the Go Home button to log in.
    </p>
    <button
      class="button go-home-button"
      v-on:click="goHome"
    >
      Go Home
    </button>
  </div>
</template>

<script>
import * as firebase from 'firebase';
import firebaseApp from '../../firebaseConfig';  // eslint-disable-line
import cleanUpUserEmail from '../helpers/cleanUpUserEmail';

export default {
  name: 'Recipes',
  data() {
    return {
      isUser: false,
      itemsRef: {},
      userEmail: '',
      userId: null,
      recipes: [],
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
          this.itemsRef = firebase.database().ref(email + '/recipes') //eslint-disable-line
          this.listenForItems(this.itemsRef);
        } else {
          this.isUser = false;
        }
      });
    },
    listenForItems: function (itemsRef) {
      itemsRef.on('value', (snapshot) => {
        const newArr = [];
        snapshot.forEach((recipe) => {
          newArr.push({
            title: recipe.val().title,
            image: recipe.val().image,
            ingredients: recipe.val().ingredients,
            directions: recipe.val().directions,
            id: recipe.key,
          });
        });
        this.sortItems(newArr);
      });
    },
    sortItems: function (_items) {
      this.recipes = _items.sort((a, b) => {
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


