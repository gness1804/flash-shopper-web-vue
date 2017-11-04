<template>
  <div id="recipes">
    <h2>Recipes</h2>
    <button
      class="button go-home-button"
      v-on:click="goHome"
    >
      Go Home
    </button>
    <div
      v-if="isUser"
      class="recipes-main"
    >
      <div class="add-recipe-container">
        <h3>Add Recipe</h3>
        <img
          class="recipe-image-main"
          v-bind:src="image"
        />
        <input
          type="text"
          placeholder="Title"
          @input="makeErrorFalse"
          v-model="title"
          class="text-input-field"
        />
        <input
          type="file"
          @input="makeErrorFalse"
          class="file-input-field recipe-image-input"
          accept="image/*"
          v-on:change="getImage"
        />
      </div>
    </div>
    <p
      v-else
    >
    Oops, you are not logged in. Please click the Go Home button to log in.
    </p>
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
      title: '',
      image: '../assets/spoon-knife.png',
      error: false,
      errorMssg: '',
      reader: new FileReader(),
    };
  },
  methods: {
    getImage: function (e) {
      this.reader.readAsDataURL(e.target.files[0]);
      setTimeout(() => {
        this.image = this.reader.result;
      }, 3000);
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
    makeErrorFalse: function () {
      this.error = false;
      this.errorMssg = '';
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


