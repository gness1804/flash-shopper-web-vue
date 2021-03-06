<template>
  <div class="recipe-view">
    <app-header
      v-bind:isUser="isUser"
      v-bind:userEmail="userEmail"
      v-on:logOut="logOut"
    >
    </app-header>
    <div class="logged-in-container" v-if="isUser">
      <h2 class="recipe-view-headline" contenteditable v-on:blur="saveTitle">
        {{ title }}
      </h2>
      <img class="recipe-view-image" v-bind:src="image" alt="The recipe." />
      <div class="image-container">
        <p>Add/Replace Image</p>
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
          {{ removeImageString }}
        </button>
      </div>
      <CategorySelector
        :default-categories="defaultCategories"
        v-on:changeCategory="changeCategory"
        :initCategories="initCategories"
        :name="title"
      />
      <p class="note-output">{{ note }}</p>
      <img
        class="delete-note-button"
        src="../assets/cancel-circle.png"
        v-on:click="deleteNote"
        title="Delete Note"
        alt="Red X signifying delete note"
      />
      <img
        class="icon edit-note-button"
        src="../assets/pencil.png"
        v-on:click="editNote"
        title="Edit Note"
        alt="Pencil signifying edit note."
      />
      <a
        v-if="validateURL(source)"
        class="source-output-link"
        v-bind:href="source"
        target="_blank"
      >
        {{ source }}
      </a>
      <p v-else class="source-output-raw-text">{{ source }}</p>
      <img
        class="icon edit-source-button"
        src="../assets/pencil.png"
        v-on:click="editSource"
        title="Edit Source"
        alt="Pencil signifying edit source."
      />
      <add-source
        v-if="showAddSourceInput"
        v-bind:source="source"
        v-on:hideAddSourceInput="hideAddSourceInput"
        v-on:saveSource="saveSource"
      >
      </add-source>
      <p>Times Made: {{ timesMade }}</p>
      <p v-if="lastMade">Last Made: {{ lastMadeHumanReadable }}</p>
      <p v-else>This has not been made yet. Make it now!</p>
      <button class="button make-recipe-button" v-on:click="makeRecipe">
        Make!
      </button>
      <button
        class="button unmake-recipe-button"
        v-on:click="decreaseTimesMade"
      >
        Unmake
      </button>
      <button
        class="button warn-button reset-recipe-button"
        v-on:click="resetTimesMade"
      >
        Reset
      </button>
      <button
        class="button warn-button delete-all-aisles-button"
        v-on:click="deleteAllAisles"
      >
        Delete All Aisles
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
          v-on:hideIngredient="hideIngredient"
          v-on:removeIngredient="removeIngredient"
          v-on:transferIngredient="transferIngredient"
          v-on:openEditModal="openEditModal"
          v-on:showToast="showToast"
        >
        </ingredient>
      </div>
      <div class="no-ingredients-container" v-else>
        <p>You do not have any ingredients! Add some now.</p>
      </div>
      <p
        v-if="countHiddenIngredients > 0"
        class="link hidden-ingredients-pseudolink"
        v-on:click="showIngredients"
      >
        See all {{ countHiddenIngredients }} hidden ingredient(s)...
      </p>
      <button
        class="button show-inputs-button"
        v-if="!showShowHideContainer"
        v-on:click="showInputs"
      >
        {{ showInputsString }}
      </button>
      <button
        class="button hide-inputs-button"
        v-if="showShowHideContainer"
        v-on:click="hideInputs"
      >
        {{ hideInputsString }}
      </button>
      <button
        class="button show-ingrs-button"
        v-on:click="showIngredients"
        :disabled="countHiddenIngredients === 0"
      >
        Show All Ingredients
      </button>
      <button
        class="button uncheck-all-button"
        v-on:click="uncheckAll"
        :disabled="directionsDone === 0"
      >
        {{ uncheckAllString }}
      </button>
      <div class="show-hide-container" v-if="showShowHideContainer">
        <div class="add-ingredient-container">
          <button class="button add-ingredient-button" v-on:click="openModal">
            {{ addIngredientString }}
          </button>
        </div>
        <div class="directions-input-container">
          <button class="button add-direction-button" v-on:click="addDirection">
            {{ addDirectionString }}
          </button>
        </div>
      </div>
      <div
        class="directions-container"
        v-if="directions && directions.length > 0"
      >
        <h4>Directions:</h4>
        <p v-if="directionsDone === 0">
          No steps completed yet! Time to get cooking!
        </p>
        <p v-else-if="directionsDone !== directions.length">
          You have completed {{ directionsDone }} /
          {{ directions.length }} steps.
        </p>
        <p v-else>Congrats! You have completed the recipe.</p>
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
              {{ direction.details }}
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
          </li>
        </ol>
      </div>
      <toast v-if="viewToast" v-bind:message="toastMessage"> </toast>
      <add-ingredient-modal
        v-if="showModal"
        v-on:closeModal="closeModal"
        v-on:addIngredient="addIngredient"
        v-on:showToast="showToast"
      >
      </add-ingredient-modal>
      <timer-modal v-if="showTimerModal" v-on:closeTimerModal="closeTimerModal">
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
    <div class="not-logged-in-container" v-else>
      <p>
        Oops, you are not logged in. Please click on the Go Home button to log
        in.
      </p>
    </div>
  </div>
</template>

<script>
// @flow

import * as firebase from 'firebase';
import moment from 'moment';
import firebaseApp from '../../firebaseConfig'; // eslint-disable-line
import Ingredient from './Ingredient';
import Toast from './Toast';
import AddIngredientModal from './AddIngredientModal';
import TimerModal from './TimerModal';
import NoteModal from './NoteModal';
import EditItemModal from './EditItemModal';
import AppHeader from './AppHeader';
import AddSource from './AddSource';
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
import display from '../helpers/displayVars';
import httpValidate from '../helpers/httpValidate';
import findLastMade from '../helpers/findLastMade';
import { RecipeViewInt } from '../types/interfaces/RecipeView';
import CategorySelector from './CategorySelector';
import { recipeCategories } from '../types/enums/RecipeCategory';

export default {
  name: 'recipeView',
  components: {
    CategorySelector,
    Ingredient,
    Toast,
    AddIngredientModal,
    TimerModal,
    AppHeader,
    NoteModal,
    EditItemModal,
    AddSource,
  },
  data(): RecipeViewInt {
    return {
      id: '',
      title: '',
      image: '',
      ingredients: [],
      directions: [],
      note: 'Add a note...',
      source: '',
      isUser: false,
      userEmail: '',
      userId: '',
      itemsRef: {},
      toastMessage: '',
      viewToast: false,
      targetRecipe: {},
      defaultCategories: Object.keys(recipeCategories),
      initCategories: [],
      selectedCategories: [],
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
      showAddSourceInput: false,
      validateURL: httpValidate,
      timesMade: 0,
      datesMade: [],
      lastMade: 0,
      directionsDone: 0,
      askToUpdateTimesMade: true,
    };
  },
  methods: {
    addDirection: function(): void {
      const input = prompt('Enter a new direction.');
      if (input) {
        const dir = new Direction(input, this.countDirections + 1);
        this.directions.push(dir);
        this.targetRecipe.update({
          directions: this.directions,
        });
        this.showToast('Direction added.');
      }
    },
    addIngredient: function(ingredient: Item): void {
      const modifiedIng = { ...ingredient, ingredientId: Date.now() };
      this.ingredients = this.ingredients.concat(modifiedIng);
      this.targetRecipe.update({
        ingredients: this.ingredients,
      });
      this.closeModal();
      this.showToast('Ingredient added.');
    },
    changeCategory: function(categories: [], isInit: boolean): void {
      this.selectedCategories = categories;

      if (!isInit) {
        this.targetRecipe.update({
          categories: this.selectedCategories,
        });
        this.showToast('Categories updated.');
      }
    },
    changeOrderForDir: function(targetDir: Direction): void {
      const newOrder = prompt('Enter desired new order for this direction.');
      const parsedOrder = parseInt(newOrder, 10);
      if (newOrder && orderIsValid(parsedOrder, this.directions)) {
        this.directions = this.directions.filter((d: Direction) => {
          return d.id !== targetDir.id;
        });
        this.directions.splice(parsedOrder - 1, 0, targetDir);
        this.directions = sequentialize(this.directions);
        this.targetRecipe.update({
          directions: this.directions,
        });
        this.showToast('Direction order changed.');
      } else {
        alert(
          'Bad data. The order value must be a positive number greater than zero but no more than the number of existing directions.',
        );
      }
    },
    closeEditModal: function(): void {
      this.showEditModal = false;
    },
    closeModal: function(): void {
      this.showModal = false;
    },
    closeNoteModal: function(): void {
      this.showNoteModal = false;
      this.selectedIngredient = {};
    },
    closeTimerModal: function(): void {
      this.showTimerModal = false;
    },
    computeDirsDone: function(): void {
      this.directionsDone = this.directions.filter(
        (dir: Direction) => dir.done === true,
      ).length;
    },
    computeTimesMade: function(): number {
      return this.datesMade.length;
    },
    decreaseTimesMade: async function(): void {
      if (this.timesMade === 0) {
        alert('Error: cannot decrement Times Made below zero.');
        return;
      }
      const warning = confirm(
        'Are you sure you want to decrease the times made?',
      );
      if (warning) {
        await this.datesMade.sort().pop();
        this.timesMade = await this.computeTimesMade();
        this.targetRecipe.update({
          timesMade: this.timesMade,
          datesMade: this.datesMade,
        });
        this.showLastMade();
      }
    },
    deleteAllAisles: function() {
      const warning = confirm(
        'Are you sure you want to delete ALL aisles for all items? This cannot be undone!',
      );
      if (warning) {
        this.ingredients = this.ingredients.map(ingredient =>
          Object.assign({}, ingredient, { aisle: '' }),
        );
        this.targetRecipe.update({
          ingredients: this.ingredients,
        });
        this.showToast('All aisles removed from ingredients.');
      }
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
        this.targetRecipe.update({
          directions: this.directions,
        });
        this.showToast('Direction removed.');
      }
    },
    deleteNote: function(): void {
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
    editDirection: function(dir: Direction): void {
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
    editIngredient: function(ing: Item): void {
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
    editNote: function(): void {
      this.showNoteModal = true;
    },
    editSource: function(): void {
      this.showAddSourceInput = true;
    },
    filterOutTargetRecipe: async function(recipes: Recipe[]): void {
      const targetId = this.id;
      const target = recipes.filter((rec: Recipe) => rec.id === targetId);
      if (target) {
        this.title = target[0].title || '';
        this.image =
          target[0].image ||
          'https://d30y9cdsu7xlg0.cloudfront.net/png/82540-200.png';
        this.ingredients = (await sortIngredients(target[0].ingredients)) || [];
        this.directions = (await target[0].directions) || [];
        this.note = target[0].note || 'Add a note...';
        this.source = target[0].source || display.addSourceDefault;
        this.timesMade =
          target[0].timesMade || (await this.computeTimesMade()) || 0;
        this.datesMade = target[0].datesMade || [];
        this.initCategories = target[0].categories || [];
        this.targetRecipe = this.itemsRef.child(this.id);
        this.computeDirsDone();
      }
      this.getIngredientTitles(this.ingredients);
    },
    getImage: function(e: Event): void {
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
      }, display.timerStandard);
    },
    getIngredientTitles: function(ings: Array<Item>): void {
      this.ingNames = flattenArr(ings);
    },
    goHome: function(): void {
      this.$router.push('/');
    },
    hideAddSourceInput: function(): void {
      this.showAddSourceInput = false;
    },
    hideIngredient: async function(_ingredient: Item): void {
      const { ingredientId } = _ingredient;
      const newIngredients = await this.ingredients.map((i: Item) => {
        if (i.ingredientId === ingredientId) {
          return Object.assign({}, i, {
            isHidden: true,
          });
        }
        return i;
      });
      this.ingredients = newIngredients;
      this.targetRecipe.update({
        ingredients: newIngredients,
      });
    },
    hideInputs: function(): void {
      this.showShowHideContainer = false;
    },
    increaseTimesMade: async function(): void {
      await this.datesMade.push(Date.now());
      this.timesMade = await this.computeTimesMade();
      this.targetRecipe.update({
        timesMade: this.timesMade,
        datesMade: this.datesMade,
      });
      this.showLastMade();
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
            timesMade: recipe.val().timesMade,
            datesMade: recipe.val().datesMade,
            categories: recipe.val().categories,
            id: recipe.key,
          });
        });
        this.filterOutTargetRecipe(newArr);
      });
    },
    logOut: function(): void {
      logOut();
    },
    makeRecipe: function(): void {
      this.increaseTimesMade();
      this.showToast('Marked recipe as made.');
    },
    openEditModal: function(ing: Item): void {
      this.showEditModal = true;
      this.selectedIngredient = ing;
    },
    openModal: function(): void {
      this.showModal = true;
    },
    openTimer: function(): void {
      this.showTimerModal = true;
    },
    removeImage: function(): void {
      const warning = confirm('Remove image: are you sure?');
      if (warning) {
        this.image = 'https://d30y9cdsu7xlg0.cloudfront.net/png/82540-200.png';
        this.targetRecipe.update({
          image: this.image,
        });
        this.showToast('Image removed.');
      }
    },
    removeIngredient: function(ingredient: Item): void {
      this.ingredients = this.ingredients.filter(
        (i: Item) => i.ingredientId !== ingredient.ingredientId,
      );
      this.targetRecipe.update({
        ingredients: this.ingredients,
      });
      this.showToast('Ingredient removed.');
    },
    reorderDirections: function(): void {
      this.directions = sequentialize(this.directions);
    },
    resetTimesMade: function(): void {
      const warn = confirm('Reset times made: are you sure?');
      if (warn) {
        this.timesMade = 0;
        this.datesMade = [];
        this.targetRecipe.update({
          timesMade: this.timesMade,
          datesMade: this.datesMade,
        });
        this.showLastMade();
      }
    },
    saveNote: function(_note: string): void {
      this.note = _note;
      this.targetRecipe.update({
        note: this.note,
      });
      this.showToast('Note updated.');
    },
    saveSource: function(_source: string): void {
      this.source = _source;
      this.targetRecipe.update({
        source: this.source,
      });
      this.showToast('Source updated.');
    },
    saveTitle: function(): void {
      this.title = document.querySelector('.recipe-view-headline').innerText;
      this.targetRecipe.update({
        title: this.title,
      });
      this.showToast('Title updated.');
    },
    showIngredients: async function(): void {
      const newIngredients = await this.ingredients.map((i: Item) => {
        return Object.assign({}, i, {
          isHidden: false,
        });
      });
      this.ingredients = newIngredients;
      this.targetRecipe.update({
        ingredients: newIngredients,
      });
    },
    showInputs: function(): void {
      this.showShowHideContainer = true;
    },
    showLastMade: function(): void {
      setTimeout(() => {
        this.lastMade = findLastMade(this.datesMade);
      }, display.timerStandard);
    },
    showToast: function(message: string): void {
      this.toastMessage = message;
      this.viewToast = true;
      setTimeout(() => {
        this.viewToast = false;
        this.toastMessage = '';
      }, display.timerStandard);
    },
    toggleDone: async function(dir: Direction): void {
      const ind = this.directions.indexOf(dir);
      const newDir = { ...dir, done: !dir.done, id: Date.now().toString() };
      this.directions.splice(ind, 0, newDir);
      this.directions = await this.directions.filter(
        (d: Direction) => d.id !== dir.id,
      );
      this.computeDirsDone();
      this.targetRecipe.update({
        directions: this.directions,
      });
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
    uncheckAll: async function(): void {
      this.directions = await this.directions.map((dir: Direction) =>
        Object.assign(dir, { done: false }),
      );
      this.targetRecipe.update({
        directions: this.directions,
      });
      this.computeDirsDone();
    },
  },
  computed: {
    countDirections: function(): number {
      return this.directions.length;
    },
    countHiddenIngredients: function(): number {
      return this.ingredients.filter(i => i.isHidden).length;
    },
    lastMadeHumanReadable: function(): string {
      const _date = new Date(this.lastMade).toString();
      return moment(_date).format('MMMM Do YYYY, h:mm a');
    },
  },
  mounted: async function(): void {
    if (this.$route) {
      this.id = this.$route.params.id;
      await this.initializeApp();
    }
    await this.showLastMade();
    await this.computeDirsDone();
  },
};
</script>

<style scoped>
.recipe-view-headline {
  font-size: 36px;
}

.recipe-view-image {
  background-color: #ffffff;
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
  border: 1px solid #000000;
  margin: 30px auto;
  padding: 10px;
  width: 60vw;
}

.direction-details {
  margin-bottom: 15px;
}

.strike {
  color: #9a8c8c;
  text-decoration: line-through;
}

.delete-note-button:hover {
  cursor: pointer;
}

.edit-note-button {
  margin-left: 20px;
}

.source-output-link {
  display: block;
  margin: 20px auto;
}

.hidden-ingredients-pseudolink {
  margin: 10px auto 60px;
}

.hidden-ingredients-pseudolink:hover {
  cursor: pointer;
}
</style>
