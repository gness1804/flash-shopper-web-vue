<template>
  <div class="recipe-view">
    <div
      class="logged-in-container"
      v-if="isUser"
    >
    <h2
      class="recipe-view-headline"
      contenteditable
      v-on:blur="saveTitle"
    >
    {{title}}
    </h2>
    <img
      class="recipe-view-image"
      v-bind:src="image"
    />
    <p
    >
      Add/Replace Image
    </p>
    <input
      type="file"
      class="file-input-field recipe-image-input"
      accept="image/*"
      v-on:change="getImage"
    />
    <button
      class="button warn-button remove-image-button"
      v-on:click="removeImage"
    >
    {{removeImageString}}
  </button>
    <div
      class="ingredients-container"
      v-if="ingredients && ingredients.length > 0"
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
    <button
      class="button add-ingredient-button"
      v-on:click="openModal"
    >
      {{addIngredientString}}
    </button>
    <input
        class="text-input-field add-direction-input-field"
        type="text"
        placeholder="Enter Direction"
        v-model="directionInput"
      />
      <button
        class="button add-direction-button"
        v-on:click="addDirection"
      >
        {{addDirectionString}}
      </button>
    <div
        class="directions-container"
        v-if="directions && directions.length > 0"
      >
      <h4>Directions:</h4>
      <ol class="directions-list">
        <li
          class="direction-li"
          v-for="direction of directions"
          v-bind:key="direction.id"
        >
          <div
            v-bind:class="{ strike: direction.done }"
          >
            {{direction.details}}
          </div>
          <img
            class="icon check-icon"
            src="../assets/check-square-o.png"
            v-on:click="toggleDone(direction)"
            title="Mark as Done or Not Done"
          />
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
      {{goHomeString}}
    </button>
  </div>
</template>

<script>
// @flow

import * as firebase from 'firebase';
import firebaseApp from '../../firebaseConfig';  // eslint-disable-line
import Ingredient from './Ingredient';
import Toast from './Toast';
import AddIngredientModal from './AddIngredientModal';
import Item from '../models/Item';
import Direction from '../models/Direction';
import Recipe from '../models/Recipe';
import cleanUpUserEmail from '../helpers/cleanUpUserEmail';
import buttonStrings from '../helpers/buttonStrings';
import sequentialize from '../helpers/sequentialize';

export default {
  name: 'recipeView',
  components: {
    Ingredient,
    Toast,
    AddIngredientModal,
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
    targetRecipe: Recipe,
    reader: Object,
    showModal: boolean,
    directionInput: string,
    removeImageString: string,
    addIngredientString: string,
    addDirectionString: string,
    goHomeString: string,
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
      targetRecipe: {},
      reader: new FileReader(),
      showModal: false,
      directionInput: '',
      removeImageString: buttonStrings.removeImage,
      addIngredientString: buttonStrings.addIngredient,
      addDirectionString: buttonStrings.addDirection,
      goHomeString: buttonStrings.goHome,
    };
  },
  methods: {
    addDirection: function (): void {
      if (this.directionInput) {
        const dir = new Direction(this.directionInput, (this.countDirections + 1));
        this.directions.push(dir);
        this.targetRecipe.update({
          directions: this.directions,
        });
        this.directionInput = '';
        this.showToast('Direction added.');
      } else {
        alert('Oops, you need to enter a direction before you can add a direction. Please try again.');
      }
    },
    addIngredient: function (ingredient: Item): void {
      const modifiedIng = { ...ingredient, ingredientId: Date.now() };
      this.ingredients = this.ingredients.concat(modifiedIng);
      this.targetRecipe.update({
        ingredients: this.ingredients,
      });
      this.closeModal();
      this.showToast('Ingredient added.');
    },
    closeModal: function (): void {
      this.showModal = false;
    },
    deleteDirection: function (dir: Direction): void {
      const warning = confirm('Are you sure you want to delete this direction?');
      if (warning) {
        this.directions = this.directions.filter((d: Direction) => {
          return d.id !== dir.id;
        });
        this.reorderDirections();
        this.targetRecipe.update({
          directions: this.directions,
        });
        this.showToast('Direction removed.');
      }
    },
    editDirection: function (dir: Direction): void {
      const ind = this.directions.indexOf(dir);
      const newText = prompt('Enter the new direction text.', dir.details);
      if (newText) {
        const newDir = { ...dir, details: newText, id: Date.now().toString() };
        this.directions.splice(ind, 0, newDir);
        this.directions = this.directions.filter((d: Direction) => {
          return d.id !== dir.id;
        });
        this.targetRecipe.update({
          directions: this.directions,
        });
      }
    },
    filterOutTargetRecipe: function (recipes: Array<Recipe>): void {
      const targetId = this.id;
      const target = recipes.filter((rec: Recipe) => {
        return rec.id === targetId;
      });
      if (target) {
        this.title = target[0].title || '';
        this.image = target[0].image || 'https://d30y9cdsu7xlg0.cloudfront.net/png/82540-200.png';
        this.ingredients = target[0].ingredients || [];
        this.directions = target[0].directions || [];
        this.targetRecipe = this.itemsRef.child(this.id);
      }
    },
    getImage: function (e: Object): void {
      this.reader.readAsDataURL(e.target.files[0]);
      setTimeout(() => {
        try {
          this.image = this.reader.result;
          this.targetRecipe.update({
            image: this.image,
          });
          this.showToast('Image successfully uploaded.');
        } catch (error) {
          alert(error);
        }
      }, 3000);
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
    openModal: function (): void {
      this.showModal = true;
    },
    removeImage: function (): void {
      const warning = confirm('Remove image: are you sure?');
      if (warning) {
        this.image = 'https://d30y9cdsu7xlg0.cloudfront.net/png/82540-200.png';
        this.targetRecipe.update({
          image: this.image,
        });
        this.showToast('Image removed.');
      }
    },
    removeIngredient: function (ingredient: Item): void {
      this.ingredients = this.ingredients.filter((i: Item) => {
        return i.ingredientId !== ingredient.ingredientId;
      });
      this.targetRecipe.update({
        ingredients: this.ingredients,
      });
      this.showToast('Ingredient removed.');
    },
    reorderDirections: function (): void {
      this.directions = sequentialize(this.directions);
    },
    saveTitle: function (): void {
      const text = document.querySelector('.recipe-view-headline').innerText;
      this.title = text;
      this.targetRecipe.update({
        title: this.title,
      });
      this.showToast('Title updated.');
    },
    showToast: function (message: string): void {
      this.toastMessage = message;
      this.viewToast = true;
      setTimeout(() => {
        this.viewToast = false;
        this.toastMessage = '';
      }, 3000);
    },
    toggleDone: function (dir: Direction): void {
      const ind = this.directions.indexOf(dir);
      const newDir = { ...dir, done: !dir.done, id: Date.now().toString() };
      this.directions.splice(ind, 0, newDir);
      this.directions = this.directions.filter((d: Direction) => {
        return d.id !== dir.id;
      });
      this.targetRecipe.update({
        directions: this.directions,
      });
    },
    transferIngredient: function (ing: Item): void {
      const email = cleanUpUserEmail(this.userEmail);
      /* eslint-disable prefer-template */
      firebase.database().ref(email + '/main').push(ing);
      this.showToast(`${ing.name} added to main list.`);
       /* eslint-enable prefer-template */
    },
  },
  computed: {
    countDirections: function (): number {
      return this.directions.length;
    },
  },
  mounted: function (): void {
    if (this.$route) {
      this.id = this.$route.params.id;
      this.initializeApp();
    }
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

  .add-ingredient-button {
    display: block;
    margin: 30px auto;
  }

  .strike {
    color:#9a8c8c;
    text-decoration: line-through;
  }
</style>


