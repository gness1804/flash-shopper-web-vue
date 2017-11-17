<template>
  <div class="recipe-view">
    <div
      class="logged-in-container"
      v-if="isUser"
    >
    <h2 class="recipe-view-headline">{{title}}</h2>
    </div>
    <div
      class="not-logged-in-container"
      v-else
    >
      <p>Oops, you are not logged in. Please click on the Go Home button to log in.</p>
    </div>
    <button
      class="button go-home-button"
      v-on:click="goHome"
    >
      Go Home
    </button>
  </div>
</template>

<script>
// @flow

import * as firebase from 'firebase';
import firebaseApp from '../../firebaseConfig';  // eslint-disable-line
import Item from '../models/Item';
import Recipe from '../models/Recipe';
import cleanUpUserEmail from '../helpers/cleanUpUserEmail';

export default {
  name: 'recipeView',
  data(): {
    id: string,
    title: string,
    image: string,
    ingredients: Array<Item>,
    directions: Array<string>,
    isUser: boolean,
    userEmail: string,
    userId: string,
    itemsRef: Object,
  } {
    return {
      id: '',
      title: '',
      image: '',
      ingredients: [],
      directions: [],
      isUser: false,
      userEmail: '',
      userId: '',
      itemsRef: {},
    };
  },
  methods: {
    filterOutTargetRecipe: function (recipes: Array<Recipe>): void {
      const target = recipes.filter((rec: Recipe) => {
        return rec.id === this.id;
      });
      this.title = target[0].title;
      this.image = target[0].image;
      this.ingredients = target[0].ingredients;
      this.directions = target[0].directions;
    },
    goHome: function () {
      this.$router.push('/');
    },
    initializeApp: function (): void {
      firebase.auth().onAuthStateChanged((user: Object) => {
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
    listenForItems: function (itemsRef: Object): void {
      itemsRef.on('value', (snapshot: Array<Object>) => {
        const newArr = [];
        snapshot.forEach((recipe: Object) => {
          newArr.push({
            title: recipe.val().title,
            image: recipe.val().image,
            ingredients: recipe.val().ingredients,
            directions: recipe.val().directions,
            id: recipe.key,
          });
        });
        this.filterOutTargetRecipe(newArr);
      });
    },
  },
  mounted: function (): void {
    this.id = this.$route.params.id;
    this.initializeApp();
  },
};
</script>

<style scoped>

</style>


