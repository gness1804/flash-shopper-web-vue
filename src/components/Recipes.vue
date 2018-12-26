<template>
  <div id="recipes">
    <app-header
      v-bind:isUser="isUser"
      v-bind:userEmail="userEmail"
      v-on:logOut="logOut"
    >
    </app-header>
    <h2 class="recipes-headline">Recipes</h2>
    <div v-if="isUser" class="recipes-main">
      <div class="add-recipe-container">
        <h3 class="add-recipe-text">Add Recipe</h3>
        <img
          class="recipe-image-main"
          alt="recipe image"
          v-bind:src="image"
          v-bind:title="
            title &&
            image !== 'https://d30y9cdsu7xlg0.cloudfront.net/png/82540-200.png'
              ? title
              : 'Recipe Image'
          "
        />
        <p class="recipe-title-text">Title: {{ title }}</p>
        <input
          type="text"
          placeholder="Title"
          @input="makeErrorFalse"
          v-model="title"
          class="text-input-field"
        />
        <input
          type="text"
          placeholder="Source"
          @input="makeErrorFalse"
          v-model="source"
          class="text-input-field add-source-input"
          v-on:blur="verifySource"
        />
        <div class="image-container">
          <p>Add/Replace Image</p>
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
            {{ removeImageString }}
          </button>
        </div>
        <div class="add-ingredient-container">
          <button class="button add-ingredient-button" v-on:click="openModal">
            {{ addIngredientString }}
          </button>
        </div>
        <div class="ingredients-container" v-if="ingredients.length > 0">
          <h4>Ingredients:</h4>
          <ingredient
            v-for="ingredient of ingredients"
            v-bind:ingredient="ingredient"
            v-bind:key="ingredient.id"
            v-on:removeIngredient="removeIngredient"
            v-on:transferIngredient="transferIngredient"
          >
          </ingredient>
        </div>
        <p v-else class="no-ingredients-text">
          No ingredients yet. Add one now!
        </p>
        <div class="directions-input-container">
          <button class="button add-direction-button" v-on:click="addDirection">
            {{ addDirectionString }}
          </button>
        </div>
      </div>
      <div class="directions-container" v-if="directions.length > 0">
        <h4>Directions:</h4>
        <ol class="directions-list">
          <li
            class="direction-li"
            v-for="direction of directions"
            v-bind:key="direction.id"
          >
            <div>{{ direction.details }}</div>
            <img
              class="icon delete-direction-button"
              src="../assets/cancel-circle.png"
              v-on:click="deleteDirection(direction)"
              title="Delete Direction"
            />
            <img
              class="icon edit-direction-button"
              src="../assets/pencil.png"
              v-on:click="editDirection(direction)"
              title="Edit Direction"
            />
          </li>
        </ol>
      </div>
      <p v-else>No directions yet. Add one now!</p>
      <div class="note-container">
        <textarea v-model="note" class="note-input" placeholder="Add a note...">
        </textarea>
        <img
          class="clear-notes-button"
          src="../assets/cancel-circle.png"
          v-on:click="clearNotes"
          title="Clear Notes"
          alt="Red X signifying clear notes action."
        />
      </div>
      <div class="categories-selector-container">
        <p>Categories:</p>
        <div class="categories">
          <div
            class="categories-selector-each-category"
            v-for="category of defaultCategories"
          >
            <label :for="category">
              <input type="checkbox" :id="category" :value="category" />
              {{ category }}
            </label>
          </div>
        </div>
      </div>
      <button class="button add-recipe-button" v-on:click="addRecipe">
        {{ addRecipeString }}
      </button>
      <div class="bottom-buttons-container">
        <button class="button sort-alpha-button" v-on:click="sortAlpha">
          {{ sortAlphaString }}
        </button>
        <button
          class="button sort-times-made-button"
          v-on:click="sortByTimesMade"
        >
          {{ sortTimesMadeString }}
        </button>
      </div>
      <p class="recipe-count">You have {{ recipes.length }} recipe(s).</p>
      <div class="recipe-display-section" v-if="recipes.length > 0">
        <h3>Your Recipes:</h3>
        <each-recipe
          v-for="recipe of recipes"
          v-bind:key="recipe.id"
          v-bind:recipe="recipe"
          v-on:removeRecipe="removeRecipe"
        >
        </each-recipe>
      </div>
      <div class="no-recipes-message" v-else>
        <p>It looks like you do not have any recipes yet. Add one now!</p>
      </div>
    </div>
    <!-- end of logged in section -->
    <p v-else>
      Oops, you are not logged in. Please click the Go Home button to log in.
    </p>
    <toast v-if="viewToast" v-bind:message="toastMessage"> </toast>
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
import firebaseApp from '../../firebaseConfig'; // eslint-disable-line
import Toast from './Toast';
import Ingredient from './Ingredient';
import EachRecipe from './EachRecipe';
import AddIngredientModal from './AddIngredientModal';
import AppHeader from './AppHeader';
import cleanUpUserEmail from '../helpers/cleanUpUserEmail';
import buttonStrings from '../helpers/buttonStrings';
import sequentialize from '../helpers/sequentialize';
import logOut from '../helpers/logOut';
import sortItems from '../helpers/sortItems';
import sortByTimesMadeHelper from '../helpers/sortByTimesMadeHelper';
import display from '../helpers/displayVars';
import httpValidate from '../helpers/httpValidate';
import Recipe from '../models/Recipe';
import Item from '../models/Item';
import Direction from '../models/Direction';
import { RecipesInt } from '../types/interfaces/Recipes';
import { recipeCategories } from '../types/enums/RecipeCategory';

export default {
  name: 'Recipes',
  components: {
    Toast,
    Ingredient,
    AddIngredientModal,
    Direction,
    EachRecipe,
    AppHeader,
  },
  data(): RecipesInt {
    return {
      isUser: false,
      itemsRef: {},
      userEmail: '',
      userId: null,
      recipes: [],
      title: '',
      image: 'https://d30y9cdsu7xlg0.cloudfront.net/png/82540-200.png',
      ingredients: [],
      directions: [],
      note: '',
      source: '',
      selectedCategories: [],
      defaultCategories: Object.keys(recipeCategories),
      error: false,
      errorMssg: '',
      reader: new FileReader(),
      viewToast: false,
      toastMessage: '',
      showModal: false,
      removeImageString: buttonStrings.removeImage,
      addIngredientString: buttonStrings.addIngredient,
      addDirectionString: buttonStrings.addDirection,
      addRecipeString: buttonStrings.addRecipe,
      sortAlphaString: buttonStrings.sortAlpha,
      sortTimesMadeString: buttonStrings.sortByTimesMade,
      howManyDirections: null,
    };
  },
  methods: {
    addDirection: function(): void {
      const input = prompt('Enter a new direction.');
      if (input) {
        const dir = new Direction(input, this.countDirections + 1);
        this.directions = this.directions.concat(dir);
        this.showToast('Direction added.');
      }
    },
    addIngredient: function(ingredient: Item): void {
      const modifiedIng = { ...ingredient, ingredientId: Date.now() };
      this.ingredients = this.ingredients.concat(modifiedIng);
      this.closeModal();
      this.showToast('Ingredient added.');
    },
    addRecipe: function(): void {
      const { title, image, ingredients, directions, note, source } = this;
      if (!title || ingredients.length === 0) {
        alert(
          'Oops, you must enter at least a title and one ingredient. Please try again.',
        );
        return;
      }
      if (source && !httpValidate(source)) {
        alert('Oops, your source must be a valid URL. Please try again.');
        return;
      }
      this.resetInputFields();
      const recipe = new Recipe({
        title,
        image,
        ingredients,
        directions,
        note,
        source,
        timesMade: 0,
      });
      this.itemsRef.push(recipe);
      this.showToast(`${recipe.title} successfully added.`);
    },
    clearNotes: function(): void {
      const warning = confirm('Clear notes: are you sure?');
      if (warning) {
        this.note = '';
      }
    },
    closeModal: function(): void {
      this.showModal = false;
    },
    deleteDirection: function(dir: Direction): void {
      const warning = confirm(
        'Are you sure you want to delete this direction?',
      );
      if (warning) {
        this.directions = this.directions.filter((d: Direction) => {
          return d.id !== dir.id;
        });
        this.reorderDirections();
        this.showToast('Direction removed.');
      }
    },
    editDirection: function(dir: Direction): void {
      const ind = this.directions.indexOf(dir);
      const newText = prompt('Enter the new direction text.', dir.details);
      if (newText) {
        const newDir = { ...dir, details: newText, id: Date.now().toString() };
        this.directions.splice(ind, 0, newDir);
        this.directions = this.directions.filter((d: Direction) => {
          return d.id !== dir.id;
        });
      }
    },
    getImage: function(e: Event): void {
      this.reader.readAsDataURL(e.target.files[0]);
      setTimeout(() => {
        try {
          this.image = this.reader.result;
          this.showToast('Image successfully uploaded.');
        } catch (error) {
          alert(error);
        }
      }, display.timerStandard);
    },
    initializeApp: function(): void {
      firebase.auth().onAuthStateChanged((user: firebase.User) => {
        if (user) {
          this.isUser = true;
          const email = cleanUpUserEmail(user.email);
          this.userEmail = user.email;
          this.userId = user.uid;
          this.itemsRef = firebase.database().ref(email + '/recipes'); //eslint-disable-line
          this.listenForItems(this.itemsRef);
        } else {
          this.isUser = false;
        }
      });
    },
    listenForItems: function(itemsRef: firebase.database.Reference): void {
      itemsRef.on('value', (snapshot: firebase.database.DataSnapshot) => {
        const newArr: Recipe[] = [];
        snapshot.forEach((recipe: firebase.database.DataSnapshot) => {
          newArr.push({
            title: recipe.val().title,
            image: recipe.val().image,
            ingredients: recipe.val().ingredients,
            directions: recipe.val().directions,
            note: recipe.val().note,
            source: recipe.val().source,
            timesMade: recipe.val().timesMade || 0,
            id: recipe.key,
          });
        });
        this.recipes = sortItems(newArr);
      });
    },
    logOut: function(): void {
      logOut();
    },
    makeErrorFalse: function(): void {
      this.error = false;
      this.errorMssg = '';
    },
    openModal: function(): void {
      this.showModal = true;
    },
    removeImage: function(): void {
      const warning = confirm('Remove image: are you sure?');
      if (warning) {
        this.image = 'https://d30y9cdsu7xlg0.cloudfront.net/png/82540-200.png';
        this.showToast('Image removed.');
      }
    },
    removeIngredient: function(ingredient: Item): void {
      this.ingredients = this.ingredients.filter((i: Item) => {
        return i.ingredientId !== ingredient.ingredientId;
      });
      this.showToast('Ingredient removed.');
    },
    removeRecipe: function(rec: Recipe): void {
      this.itemsRef.child(rec.id).remove();
      this.showToast(`${rec.title} deleted.`);
    },
    reorderDirections: function(): void {
      this.directions = sequentialize(this.directions);
    },
    resetInputFields: function(): void {
      this.title = '';
      this.image = 'https://d30y9cdsu7xlg0.cloudfront.net/png/82540-200.png';
      this.ingredients = [];
      this.directions = [];
      this.note = '';
    },
    sortAlpha: function(): void {
      this.recipes = sortItems(this.recipes);
    },
    sortByTimesMade: function(): void {
      this.recipes = sortByTimesMadeHelper(this.recipes);
    },
    showToast: function(message: string): void {
      this.toastMessage = message;
      this.viewToast = true;
      setTimeout(() => {
        this.viewToast = false;
        this.toastMessage = '';
      }, display.timerStandard);
    },
    transferIngredient: function(ing: Item): void {
      const email = cleanUpUserEmail(this.userEmail);
      /* eslint-disable prefer-template */
      firebase
        .database()
        .ref(email + '/main')
        .push(ing);
      this.showToast(`${ing.name} added to main list.`);
      /* eslint-enable prefer-template */
    },
    triggerErrorState: function(message: string): void {
      this.error = true;
      this.errorMssg = message;
    },
    verifySource: function(): void {
      if (!this.source) {
        return;
      }
      if (!httpValidate(this.source)) {
        alert('Oops! Your source must be a valid url.');
      } else {
        this.showToast('Cool! URL checks out.');
      }
    },
  },
  computed: {
    countDirections: function(): number {
      return this.directions.length;
    },
  },
  mounted: function(): void {
    this.initializeApp();
  },
};
</script>

<style scoped>
.recipes-headline {
  font-size: 36px;
}

.add-recipe-text {
  margin-top: 50px;
}

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

.add-recipe-button {
  border-radius: 10px;
  display: block;
  font-size: 24px;
  margin: 60px auto;
  padding: 10px;
}

.categories-selector-container {
  background-color: #fff;
  border: 1px solid #000;
  margin: 0 auto;
  padding: 10px;
  width: 60vw;
}

.categories-selector-container p {
  font-weight: 700;
}

.categories-selector-container .categories {
  align-items: center;
  display: flex;
  flex-direction: row;
  justify-content: center;
}

.categories-selector-each-category {
  margin-right: 20px;
}

.categories-selector-each-category label:hover,
.categories-selector-each-category input:hover {
  cursor: pointer;
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

.image-container,
.add-ingredient-container,
.directions-input-container {
  background-color: #ffffff;
  border: 1px solid #000000;
  margin: 40px auto;
  padding-bottom: 20px;
  width: 60vw;
}

.add-ingredient-container,
.directions-input-container {
  align-items: center;
  display: flex;
  justify-content: center;
  padding: 30px;
}

.no-ingredients-text,
.ingredients-container,
.directions-container {
  padding-bottom: 30px;
}

.note-container {
  border: 1px solid #000;
  margin: 50px auto;
  width: 60vw;
}

.note-input {
  height: 100px;
  margin: 40px auto 20px;
  width: 60vw;
}

.clear-notes-button {
  display: block;
  margin: 10px auto;
}

.clear-notes-button:hover {
  cursor: pointer;
}

.add-source-input {
  display: block;
  margin: 0 auto;
}
</style>
