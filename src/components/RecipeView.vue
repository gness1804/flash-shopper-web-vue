<template>
  <div class="recipe-view">
    <app-header
      v-bind:isUser="isUser"
      v-bind:userEmail="userEmail"
      v-on:logOut="logOut"
    >
    </app-header>
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
    <div
      class="image-container"
    >
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
    </div>
    <p
      class="note-output"
    >
      {{note}}
    </p>
    <img
      class="delete-note-button"
      src="../assets/cancel-circle.png"
      v-on:click="deleteNote"
      title="Delete Note"
    />
    <img
      class="icon edit-note-button"
      src="../assets/pencil.png"
      v-on:click="editNote"
      title="Edit Note"
    />
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
        v-on:openEditModal="openEditModal"
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
      class="button show-inputs-button"
      v-if="!showShowHideContainer"
      v-on:click="showInputs"
    >
      {{showInputsString}}
    </button>
    <button
      class="button hide-inputs-button"
      v-if="showShowHideContainer"
      v-on:click="hideInputs"
    >
      {{hideInputsString}}
    </button>
    <div
      class="show-hide-container"
      v-if="showShowHideContainer"
    >
      <div
      class="add-ingredient-container"
    >
      <button
        class="button add-ingredient-button"
        v-on:click="openModal"
      >
        {{addIngredientString}}
      </button>
    </div>
     <div class="directions-input-container">
        <button
          class="button add-direction-button"
          v-on:click="addDirection"
        >
          {{addDirectionString}}
        </button>
        </div>
      <div
        class="uncheck-all-container"
      >
        <button
          class="button uncheck-all-button"
          v-on:click="uncheckAll"
        >
          {{uncheckAllString}}
        </button>
      </div>
    </div>
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
            class="direction-details"
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
          <img
            class="icon timer-button"
            src="../assets/alarm.png"
            v-on:click="openTimer"
            title="Open Timer"
          />
          <img
            class="icon reorder-dirs-button"
            src="../assets/reorder.png"
            v-on:click="changeOrderForDir(direction)"
            title="Reorder Direction"
          />
          <img
            class="icon check-matches-button"
            src="../assets/eye.png"
            v-on:click="checkMatches(direction)"
            title="Check Matches"
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
      <timer-modal
        v-if="showTimerModal"
        v-on:closeTimerModal="closeTimerModal"
      >
      </timer-modal>
      <note-modal
        v-if="showNoteModal"
        v-on:closeNoteModal="closeNoteModal"
        v-on:saveNote="saveNote"
        v-bind:note="note"
      >
      </note-modal>
      <edit-item-modal
      v-if="showEditModal"
      v-on:closeModal="closeEditModal"
      v-bind:item="selectedIngredient"
      v-on:showToast="showToast"
      v-bind:isIngredient="true"
      v-on:editIngredient="editIngredient"
    >
    </edit-item-modal>
    </div>
    <!-- end of logged in section -->
    <div
      class="not-logged-in-container"
      v-else
    >
      <p>Oops, you are not logged in. Please click on the Go Home button to log in.</p>
    </div>
  </div>
</template>

<script>
// @flow

import * as firebase from 'firebase';
import firebaseApp from '../../firebaseConfig';  // eslint-disable-line
import Ingredient from './Ingredient';
import Toast from './Toast';
import AddIngredientModal from './AddIngredientModal';
import TimerModal from './TimerModal';
import NoteModal from './NoteModal';
import EditItemModal from './EditItemModal';
import AppHeader from './AppHeader';
import Item from '../models/Item';
import Direction from '../models/Direction';
import Recipe from '../models/Recipe';
import cleanUpUserEmail from '../helpers/cleanUpUserEmail';
import buttonStrings from '../helpers/buttonStrings';
import sequentialize from '../helpers/sequentialize';
import orderIsValid from '../helpers/orderIsValid';
import logOut from '../helpers/logOut';
import flattenArr from '../helpers/flattenArr';
import sortIngredients from '../helpers/sortItems';

export default {
  name: 'recipeView',
  components: {
    Ingredient,
    Toast,
    AddIngredientModal,
    TimerModal,
    AppHeader,
    NoteModal,
    EditItemModal,
  },
  data(): {
    id: string,
    title: string,
    image: string,
    ingredients: Array<Item>,
    directions: Array<string>,
    note: string,
    isUser: boolean,
    userEmail: string,
    userId: string,
    itemsRef: Object,
    toastMessage: string,
    viewToast: boolean,
    targetRecipe: Recipe,
    reader: Object,
    showModal: boolean,
    removeImageString: string,
    addIngredientString: string,
    addDirectionString: string,
    goHomeString: string,
    showTimerModal: boolean,
    uncheckAllString: string,
    showShowHideContainer: boolean,
    showInputsString: string,
    hideInputsString: string,
    showNoteModal: boolean,
    showEditModal: boolean,
    selectedIngredient: Item,
    ingNames: Array<Item>,
  } {
    return {
      id: '',
      title: '',
      image: '',
      ingredients: [],
      directions: [],
      note: 'Add a note...',
      isUser: false,
      userEmail: '',
      userId: '',
      itemsRef: {},
      toastMessage: '',
      viewToast: false,
      targetRecipe: {},
      reader: new FileReader(),
      showModal: false,
      removeImageString: buttonStrings.removeImage,
      addIngredientString: buttonStrings.addIngredient,
      addDirectionString: buttonStrings.addDirection,
      goHomeString: buttonStrings.goHome,
      showTimerModal: false,
      uncheckAllString: buttonStrings.uncheckAll,
      showShowHideContainer: false,
      showInputsString: buttonStrings.showInputs,
      hideInputsString: buttonStrings.hideInputs,
      showNoteModal: false,
      showEditModal: false,
      selectedIngredient: {},
      ingNames: [],
    };
  },
  methods: {
    addDirection: function (): void {
      const input = prompt('Enter a new direction.');
      if (input) {
        const dir = new Direction(input, (this.countDirections + 1));
        this.directions.push(dir);
        this.targetRecipe.update({
          directions: this.directions,
        });
        this.showToast('Direction added.');
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
    changeOrderForDir: function (targetDir: Direction): void {
      const newOrder = prompt('Enter desired new order for this direction.');
      const parsedOrder = parseInt(newOrder, 10);
      if (newOrder && orderIsValid(parsedOrder, this.directions)) {
        this.directions = this.directions.filter((d: Direction) => {
          return d.id !== targetDir.id;
        });
        this.directions.splice((parsedOrder - 1), 0, targetDir);
        this.directions = sequentialize(this.directions);
        this.targetRecipe.update({
          directions: this.directions,
        });
        this.showToast('Direction order changed.');
      } else {
        alert('Bad data. The order value must be a positive number greater than zero but no more than the number of existing directions.');
      }
    },
    checkMatches: function (dir: Direction): void {
      console.log('dir:', dir);
    },
    closeEditModal: function (): void {
      this.showEditModal = false;
    },
    closeModal: function (): void {
      this.showModal = false;
    },
    closeNoteModal: function (): void {
      this.showNoteModal = false;
      this.selectedIngredient = {};
    },
    closeTimerModal: function (): void {
      this.showTimerModal = false;
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
    deleteNote: function (): void {
      const warning = confirm('Are you sure you want to delete this note?');
      if (warning) {
        this.note = '';
        this.targetRecipe.update({
          note: this.note,
        });
        this.showToast('Note deleted.');
        this.note = 'Add a note...';
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
    editIngredient: function (ing: Item): void {
      this.ingredients = this.ingredients.filter((i: Item) => {
        return i.ingredientId !== ing.ingredientId;
      });
      this.ingredients = this.ingredients.concat(ing);
      this.targetRecipe.update({
        ingredients: this.ingredients,
      });
      this.closeEditModal();
      this.showToast('Ingredient edited.');
      this.selectedIngredient = {};
    },
    editNote: function (): void {
      this.showNoteModal = true;
    },
    filterOutTargetRecipe: function (recipes: Array<Recipe>): void {
      const targetId = this.id;
      const target = recipes.filter((rec: Recipe) => {
        return rec.id === targetId;
      });
      if (target) {
        this.title = target[0].title || '';
        this.image = target[0].image || 'https://d30y9cdsu7xlg0.cloudfront.net/png/82540-200.png';
        this.ingredients = sortIngredients(target[0].ingredients) || [];
        this.directions = target[0].directions || [];
        this.note = target[0].note || 'Add a note...';
        this.targetRecipe = this.itemsRef.child(this.id);
      }
      this.getIngredientTitles(this.ingredients);
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
    getIngredientTitles: function (ings: Array<Item>): void {
      const names = flattenArr(ings);
      this.ingNames = names;
    },
    goHome: function () {
      this.$router.push('/');
    },
    hideInputs: function (): void {
      this.showShowHideContainer = false;
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
            note: recipe.val().note,
            id: recipe.key,
          });
        });
        this.filterOutTargetRecipe(newArr);
      });
    },
    logOut: function (): void {
      logOut();
    },
    openEditModal: function (ing: Item): void {
      this.showEditModal = true;
      this.selectedIngredient = ing;
    },
    openModal: function (): void {
      this.showModal = true;
    },
    openTimer: function (): void {
      this.showTimerModal = true;
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
    saveNote: function (_note: string): void {
      this.note = _note;
      this.targetRecipe.update({
        note: this.note,
      });
      this.showToast('Note updated.');
    },
    saveTitle: function (): void {
      const text = document.querySelector('.recipe-view-headline').innerText;
      this.title = text;
      this.targetRecipe.update({
        title: this.title,
      });
      this.showToast('Title updated.');
    },
    showInputs: function (): void {
      this.showShowHideContainer = true;
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
    uncheckAll: function (): void {
      this.directions = this.directions.map((dir: Direction) => {
        return Object.assign(dir, { done: false });
      });
      this.targetRecipe.update({
        directions: this.directions,
      });
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
  .recipe-view-headline {
    font-size: 36px;
  }

  .recipe-view-image {
    background-color: #fff;
    border-radius: 50%;
    display: block;
    margin: 60px auto;
    width: 30vw;
  }

  .hide-inputs-button {
    margin-bottom: 30px;
  }

  .show-hide-container {
    border: 1px solid #000000;
    margin: 0 auto;
    width: 80vw;
  }

  .image-container,
  .directions-input-container,
  .add-ingredient-container,
  .uncheck-all-container {
    background-color: #ffffff;
    border: 1px solid #000000;
    margin: 40px auto;
    padding-bottom: 20px;
    width: 60vw;
  }

  .ingredients-container {
    padding: 30px;
  }

  .add-ingredient-button {
    display: block;
  }

  .directions-container {
    margin: 30px auto;
  }

  .directions-input-container,
  .add-ingredient-container,
  .uncheck-all-container {
    align-items: center;
    display: flex;
    justify-content: center;
    padding: 30px;
  }

  .direction-li {
    border: 1px solid black;
    margin: 30px auto;
    padding: 10px;
    width: 60vw;
  }

  .direction-details {
    margin-bottom: 15px;
  }

  .strike {
    color:#9a8c8c;
    text-decoration: line-through;
  }

  .uncheck-all-button {
    display: block;
  }

  .delete-note-button:hover {
    cursor: pointer;
  }

  .edit-note-button {
    margin-left: 20px;
  }
</style>


