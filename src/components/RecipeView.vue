<template>
  <div class="recipe-view">
    <div
      class="logged-in-container"
      v-if="isUser"
    >
    <h2 class="recipe-view-headline">{{title}}</h2>
    <img
      class="recipe-view-image"
      v-bind:src="image"
    />
    <div
      class="ingredients-container"
      v-if="ingredients.length > 0"
    >
      <h3>Ingredients:</h3>
      <ingredient
        v-for="ingredient of ingredients"
        v-bind:key="ingredient.id"
        v-bind:ingredient="ingredient"
        v-on:removeIngredient="removeIngredient"
        v-on:transferIngredient="transferIngredient"
      >
      </ingredient>
    </div>
    <div
      class="no-ingredients-container"
      v-else
    >
      <p>You do not have any ingredients! Add some now.</p>
    </div>
    <div
        class="directions-container"
        v-if="directions.length > 0"
      >
      <h4>Directions:</h4>
      <ol class="directions-list">
        <li
          class="direction-li"
          v-for="direction of directions"
          v-bind:key="direction.id"
        >
          <div>{{direction.details}}</div>
          <img
            class="icon delete-direction-button"
            src="../assets/cancel-circle.png"
            v-on:click="deleteDirection(direction)"
            title="Delete Direction"
          />
        </li>
      </ol>
      </div>
      <toast
        v-if="viewToast"
        v-bind:message="toastMessage"
      >
      </toast>
    </div>
    <!-- end of logged in section -->
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
import Ingredient from './Ingredient';
import Toast from './Toast';
import Item from '../models/Item';
import Direction from '../models/Direction';
import Recipe from '../models/Recipe';
import cleanUpUserEmail from '../helpers/cleanUpUserEmail';

export default {
  name: 'recipeView',
  components: {
    Ingredient,
    Toast,
  },
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
    toastMessage: string,
    viewToast: boolean,
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
      toastMessage: '',
      viewToast: false,
    };
  },
  methods: {
    deleteDirection: function (dir: Direction): void {
      this.directions = this.directions.filter((d: Direction) => {
        return d.id !== dir.id;
      });
      this.showToast('Direction removed.');
    },
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
    removeIngredient: function (ingredient: Item): void {
      this.ingredients = this.ingredients.filter((i: Item) => {
        return i.ingredientId !== ingredient.ingredientId;
      });
      this.showToast('Ingredient removed.');
    },
    showToast: function (message: string): void {
      this.toastMessage = message;
      this.viewToast = true;
      setTimeout(() => {
        this.viewToast = false;
        this.toastMessage = '';
      }, 3000);
    },
    transferIngredient: function (ing: Item): void {
      const email = cleanUpUserEmail(this.userEmail);
      /* eslint-disable prefer-template */
      firebase.database().ref(email + '/main').push(ing);
      this.showToast(`${ing.name} added to main list.`);
       /* eslint-enable prefer-template */
    },
  },
  mounted: function (): void {
    this.id = this.$route.params.id;
    this.initializeApp();
  },
};
</script>

<style scoped>
  .recipe-view-image {
    background-color: #fff;
    border-radius: 50%;
    display: block;
    margin: 60px auto;
    width: 30vw;
  }
</style>


