<template>
  <div
    id="recipes"
  >
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
          alt="recipe image"
          v-bind:src="image"
          v-bind:title="(title && image !== require('../assets/spoon-knife.png')) ? title : 'Recipe Image'"
        />
        <input
          type="text"
          placeholder="Title"
          @input="makeErrorFalse"
          v-model="title"
          class="text-input-field"
        />
        <p
        >
          Add/Replace Image
        </p>
        <input
          type="file"
          @input="makeErrorFalse"
          class="file-input-field recipe-image-input"
          accept="image/*"
          v-on:change="getImage"
        />
        <button
          class="button warn-button remove-image-button"
          v-on:click="removeImage"
        >
        Remove Image
      </button>
      <button
        class="button add-ingredient-button"
        v-on:click="openModal"
      >
        Add Ingredient
      </button>
      <button
        class="button add-direction-button"
        v-on:click="addDirection"
      >
        Add Direction
      </button>
      </div>
      <input
        class="add-direction-input-field"
        type="text"
        placeholder="Enter Direction"
        v-model="directionInput"
      />
      <div
        class="ingredients-container"
        v-if="ingredients.length > 0"
      >
        <h4>Ingredients:</h4>
        <ingredient
          v-for="ingredient of ingredients"
          v-bind:ingredient="ingredient"
          v-bind:key="ingredient.id"
          v-on:removeIngredient="removeIngredient"
        >
        </ingredient>
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
      <button
        class="button add-recipe-button"
        v-on:click="addRecipe"
      >
        Add Recipe
      </button>
      <div
        class="recipe-display-section"
        v-if="recipes.length > 0"
      >
        <h3>Your Recipes:</h3>
        <each-recipe
          v-for="recipe of recipes"
          v-bind:key="recipe.id"
          v-bind:recipe="recipe"
          v-on:removeRecipe="removeRecipe"
        >
        </each-recipe>
      </div>
      <div
        class="no-recipes-message"
        v-else
      >
        <p>It looks like you do not have any recipes yet. Add one now!</p>
      </div>
    </div>
    <!-- end of logged in section -->
    <p
      v-else
    >
    Oops, you are not logged in. Please click the Go Home button to log in.
    </p>
    <toast
    v-if="viewToast"
    v-bind:message="toastMessage"
  >
  </toast>
  <add-ingredient-modal
    v-if="showModal"
    v-on:closeModal="closeModal"
    v-on:addIngredient="addIngredient"
    v-on:showToast="showToast"
  >
  </add-ingredient-modal>
  </div>
</template>

<script>
// @flow

import * as firebase from 'firebase';
import firebaseApp from '../../firebaseConfig';  // eslint-disable-line
import Toast from './Toast';
import Ingredient from './Ingredient';
import EachRecipe from './EachRecipe';
import AddIngredientModal from './AddIngredientModal';
import cleanUpUserEmail from '../helpers/cleanUpUserEmail';
import Recipe from '../models/Recipe';
import Item from '../models/Item';
import Direction from '../models/Direction';

export default {
  name: 'Recipes',
  components: {
    Toast,
    Ingredient,
    AddIngredientModal,
    Direction,
    EachRecipe,
  },
  data(): {
      isUser: boolean,
      itemsRef: Object,
      userEmail?: string,
      userId: string | null,
      recipes: Array<Recipe>,
      title?: string,
      image: string,
      ingredients: Array<Item>,
      directions?: Array<Direction>,
      directionInput?: string,
      error: boolean,
      errorMssg?: string,
      reader: Object,
      viewToast: boolean,
      toastMessage?: string,
      showModal: boolean,
  } {
    return {
      isUser: false,
      itemsRef: {},
      userEmail: '',
      userId: null,
      recipes: [],
      title: '',
      image: require('../assets/spoon-knife.png'),
      ingredients: [],
      directions: [],
      directionInput: '',
      error: false,
      errorMssg: '',
      reader: new FileReader(),
      viewToast: false,
      toastMessage: '',
      showModal: false,
    };
  },
  methods: {
    addDirection: function (): void {
      const { directionInput } = this;
      if (!directionInput) {
        this.triggerErrorState('You must enter a direction into the form field in order to add a direction.');
        return;
      }
      const dir = new Direction(directionInput);
      this.directions = this.directions.concat(dir);
      this.directionInput = '';
      this.showToast('Direction added.');
    },
    addIngredient: function (ingredient: Item): void {
      const modifiedIng = { ...ingredient, ingredientId: Date.now() };
      this.ingredients = this.ingredients.concat(modifiedIng);
      this.closeModal();
      this.showToast('Ingredient added.');
    },
    addRecipe: function (): void {
      const { title, image, ingredients, directions } = this;
      if (!title || ingredients.length === 0) {
        this.triggerErrorState('Oops, you must enter at least a title and one ingredient. Please try again.');
        return;
      }
      this.resetInputFields();
      const recipe = new Recipe(title, image, ingredients, directions);
      this.itemsRef.push(recipe);
      this.showToast(`${recipe.title} successfully added.`);
    },
    closeModal: function (): void {
      this.showModal = false;
    },
    deleteDirection: function (dir: Direction): void {
      this.directions = this.directions.filter((d: Direction) => {
        return d.id !== dir.id;
      });
      this.showToast('Direction removed.');
    },
    getImage: function (e: Object): void {
      this.reader.readAsDataURL(e.target.files[0]);
      setTimeout(() => {
        try {
          this.image = this.reader.result;
          this.showToast('Image successfully uploaded.');
        } catch (error) {
          alert(error);
        }
      }, 3000);
    },
    goHome: function (): void {
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
        this.sortItems(newArr);
      });
    },
    makeErrorFalse: function (): void {
      this.error = false;
      this.errorMssg = '';
    },
    openModal: function (): void {
      this.showModal = true;
    },
    removeImage: function (): void {
      const warning = confirm('Remove image: are you sure?');
      if (warning) {
        this.image = require('../assets/spoon-knife.png');
        this.showToast('Image removed.');
      }
    },
    removeIngredient: function (ingredient: Item): void {
      this.ingredients = this.ingredients.filter((i: Item) => {
        return i.ingredientId !== ingredient.ingredientId;
      });
      this.showToast('Ingredient removed.');
    },
    removeRecipe: function (rec: Recipe): void {
      this.itemsRef.child(rec.id).remove();
      this.showToast(`${rec.title} deleted.`);
    },
    resetInputFields: function (): void {
      this.title = '';
      this.image = require('../assets/spoon-knife.png');
      this.ingredients = [];
      this.directions = [];
    },
    showToast: function (message: string): void {
      this.toastMessage = message;
      this.viewToast = true;
      setTimeout(() => {
        this.viewToast = false;
        this.toastMessage = '';
      }, 3000);
    },
    sortItems: function (recipes: Array<Recipe>): void {
      this.recipes = recipes.sort((a, b) => {
        const first = a.title.toLowerCase();
        const second = b.title.toLowerCase();
        if (first < second) {
          return -1;
        }
        if (first > second) {
          return 1;
        }
        return 0;
      });
    },
    triggerErrorState: function (message: string): void {
      this.error = true;
      this.errorMssg = message;
    },
  },
  mounted: function (): void {
    this.initializeApp();
  },
};
</script>

<style scoped>
  .recipe-image-main {
    background-color: #fff;
    border-radius: 50%;
    display: block;
    margin: 60px auto;
    width: 20vw;
  }

  .add-direction-input-field {
    margin-top: 20px;
  }

  .add-ingredient-button,
  .add-recipe-button {
    display: block;
    margin: 20px auto;
  }

  .directions-list {
    align-items: center;
    display: flex;
    flex-direction: column;
    justify-content: center;
  }

  .delete-direction-button {
    margin-top: 10px;
  }

  .direction-li {
    margin-bottom: 20px;
  }
</style>


