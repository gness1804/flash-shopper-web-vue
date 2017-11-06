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
      </div>
      <div
        class="ingredients-container"
        v-if="ingredients.length > 0"
      >
        <h4>Ingredients:</h4>
        <ingredient
          v-for="ingredient of ingredients"
          v-bind:ingredient="ingredient"
          v-bind:key="ingredient.id"
        >
        </ingredient>
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
  >
  </add-ingredient-modal>
  </div>
</template>

<script>
import * as firebase from 'firebase';
import firebaseApp from '../../firebaseConfig';  // eslint-disable-line
import Toast from './Toast';
import Ingredient from './Ingredient';
import AddIngredientModal from './AddIngredientModal';
import cleanUpUserEmail from '../helpers/cleanUpUserEmail';

export default {
  name: 'Recipes',
  components: {
    Toast,
    Ingredient,
    AddIngredientModal,
  },
  data() {
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
      error: false,
      errorMssg: '',
      reader: new FileReader(),
      viewToast: false,
      toastMessage: '',
      showModal: false,
    };
  },
  methods: {
    addIngredient: function (ingredient) {
      this.ingredients.push(ingredient);
      this.closeModal();
    },
    closeModal: function () {
      this.showModal = false;
    },
    getImage: function (e) {
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
    openModal: function () {
      this.showModal = true;
    },
    removeImage: function () {
      const warning = confirm('Remove image: are you sure?');
      if (warning) {
        this.image = require('../assets/spoon-knife.png');
        this.showToast('Image removed.');
      }
    },
    showToast: function (message) {
      this.toastMessage = message;
      this.viewToast = true;
      setTimeout(() => {
        this.viewToast = false;
        this.toastMessage = '';
      }, 3000);
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
  .recipe-image-main {
    background-color: #fff;
    border-radius: 50%;
    display: block;
    margin: 60px auto;
    width: 20vw;
  }

  .add-ingredient-button {
    display: block;
    margin: 20px auto;
  }
</style>


