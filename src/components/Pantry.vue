<template>
  <div id="pantry">
    <app-header
      v-bind:isUser="isUser"
      v-bind:userEmail="userEmail"
      v-on:logOut="logOut"
    >
    </app-header>
    <h2>Pantry</h2>
    <p v-if="isUser && error" class="error-message">{{ errorMssg }}</p>
    <button
      class="button warn-button delete-all-in-pantry-button"
      v-if="isUser && items.length > 0"
      v-on:click="deleteAllItems"
    >
      {{ deleteAllItemsString }}
    </button>
    <button
      class="button warn-button delete-all-aisles-button"
      v-if="isUser && items.length > 0"
      v-on:click="deleteAllAisles"
    >
      Delete All Aisles
    </button>
    <div class="item-input-container" v-if="isUser">
      <input
        type="text"
        placeholder="Name"
        @input="makeErrorFalse"
        v-model="name"
        class="text-input-field"
      />
      <input
        type="text"
        placeholder="Aisle"
        @input="makeErrorFalse"
        v-model="aisle"
        class="text-input-field"
      />
      <input
        type="text"
        placeholder="Note"
        @input="makeErrorFalse"
        v-model="note"
        class="text-input-field"
      />
      <input
        type="text"
        placeholder="Quantity"
        @input="makeErrorFalse"
        v-model="quantity"
        class="text-input-field"
      />
      <input
        type="text"
        placeholder="Link"
        @input="makeErrorFalse"
        v-model="link"
        class="text-input-field"
      />
    </div>
    <button
      class="button add-item-to-pantry-button"
      v-on:click="addItem"
      v-if="isUser"
    >
      {{ addItemString }}
    </button>
    <div
      class="pantry-main-container"
      v-if="isUser"
      v-bind:class="{ noBorder: items.length === 0 }"
    >
      <div class="items" v-if="items.length > 0">
        <each-pantry-item
          v-for="item of items"
          v-bind:key="item.id"
          v-bind:item="item"
          v-bind:mainShortItems="mainShortItems"
          v-on:transferItemToMainList="transferItemToMainList"
          v-on:deleteItem="deleteItem"
          v-on:viewEditModal="viewEditModal"
        >
        </each-pantry-item>
      </div>
      <p v-else>There are no items in your pantry. Add one now.</p>
    </div>
    <p v-else>
      Oops, you are not logged in. Please click the Go Home button above to log
      in.
    </p>
    <toast v-if="viewToast" v-bind:message="toastMessage"> </toast>
    <edit-item-modal
      v-if="viewEdit"
      v-on:closeModal="closeEditModal"
      v-bind:item="itemToEdit"
      v-bind:itemsRef="itemsRef"
      v-on:showToast="showToast"
    >
    </edit-item-modal>
  </div>
</template>

<script>
import * as firebase from 'firebase';
import firebaseApp from '../../firebaseConfig'; // eslint-disable-line
import EachPantryItem from './EachPantryItem';
import Toast from './Toast';
import AppHeader from './AppHeader';
import EditItemModal from './EditItemModal';
import cleanUpUserEmail from '../helpers/cleanUpUserEmail';
import buttonStrings from '../helpers/buttonStrings';
import logOut from '../helpers/logOut';
import sortItems from '../helpers/sortItems';
import display from '../helpers/displayVars';
import httpValidate from '../helpers/httpValidate';
import Item from '../models/Item';

export default {
  name: 'Pantry',
  components: {
    EachPantryItem,
    Toast,
    AppHeader,
    EditItemModal,
  },
  data() {
    return {
      isUser: false,
      itemsRef: {},
      userEmail: '',
      userId: null,
      items: [],
      name: '',
      aisle: '',
      note: '',
      quantity: '',
      link: '',
      error: false,
      errorMssg: '',
      toastMessage: '',
      viewToast: false,
      goHomeString: buttonStrings.goHome,
      deleteAllItemsString: buttonStrings.deleteAllItems,
      addItemString: buttonStrings.addItem,
      viewEdit: false,
      itemToEdit: {},
      mainShortItems: [],
    };
  },
  methods: {
    addItem: function() {
      const { name, aisle, note, quantity, link } = this;
      if (!name) {
        this.triggerErrorState(
          'Oops, you must enter at least a name. Please try again.',
        );
        return;
      }
      if (link && !httpValidate(link)) {
        this.triggerErrorState(
          'Error: the link must be a valid website link. Please try again.',
        );
        return;
      }
      this.resetInputFields();
      const item = new Item({ name, aisle, note, quantity, link });
      try {
        this.itemsRef.push(item);
        this.showToast(`${item.name} added to pantry.`);
      } catch (error) {
        alert(`Something went wrong. Please try again. Error: ${error}`);
      }
    },
    closeEditModal: function() {
      this.viewEdit = false;
    },
    deleteAllAisles: function() {
      const warning = confirm(
        'Are you sure you want to delete ALL aisles for all items? This cannot be undone!',
      );
      if (warning) {
        const { items } = this;
        const itemsNoAisles = items.map(item =>
          Object.assign({}, item, { aisle: '' }),
        );
        this.items = itemsNoAisles;
        this.itemsRef.set(itemsNoAisles);
        this.showToast('All aisles removed from items.');
      }
    },
    deleteAllItems: function() {
      const warning = confirm(
        'Are you sure you want to delete ALL items? This cannot be undone!',
      );
      if (warning) {
        this.itemsRef.set([]);
      }
    },
    deleteItem: function(item) {
      if (this.itemsRef) {
        this.itemsRef.child(item.id).remove();
        this.showToast(`${item.name} removed from pantry.`);
      }
    },
    getMainShortItems: function(mainItems) {
      mainItems.on('value', snapshot => {
        const newArr = [];
        snapshot.forEach(item => {
          newArr.push({
            name: item.val().name,
            id: item.key,
          });
        });
        this.mainShortItems = newArr;
      });
    },
    initializeApp: function() {
      firebase.auth().onAuthStateChanged(user => {
        if (user) {
          this.isUser = true;
          const email = cleanUpUserEmail(user.email);
          this.userEmail = user.email;
          this.userId = user.uid;
          this.itemsRef = firebase.database().ref(email + '/pantry'); //eslint-disable-line
          const mainShortList = firebase.database().ref(email + '/main'); //eslint-disable-line
          this.listenForItems(this.itemsRef);
          this.getMainShortItems(mainShortList);
        } else {
          this.isUser = false;
        }
      });
    },
    listenForItems: function(itemsRef) {
      itemsRef.on('value', snapshot => {
        const newArr = [];
        snapshot.forEach(item => {
          newArr.push({
            name: item.val().name,
            aisle: item.val().aisle,
            quantity: item.val().quantity,
            note: item.val().note,
            inCart: item.val().inCart || false,
            link: item.val().link || null,
            id: item.key,
          });
        });
        this.items = sortItems(newArr);
      });
    },
    logOut: function() {
      logOut();
    },
    makeErrorFalse: function() {
      this.error = false;
      this.errorMssg = '';
    },
    resetInputFields: function() {
      this.name = '';
      this.aisle = '';
      this.note = '';
      this.quantity = '';
      this.link = '';
    },
    showToast: function(message) {
      this.toastMessage = message;
      this.viewToast = true;
      setTimeout(() => {
        this.viewToast = false;
        this.toastMessage = '';
      }, display.timerStandard);
    },
    transferItemToMainList: function(item) {
      const email = cleanUpUserEmail(this.userEmail);
      /* eslint-disable prefer-template */
      firebase
        .database()
        .ref(email + '/main')
        .push(item);
      this.showToast(`${item.name} added to main list.`);
      /* eslint-enable prefer-template */
    },
    triggerErrorState: function(message) {
      this.error = true;
      this.errorMssg = message;
    },
    viewEditModal: function(it) {
      this.viewEdit = true;
      this.itemToEdit = it;
    },
  },
  mounted: function() {
    this.initializeApp();
  },
};
</script>

<style scoped>
#pantry {
  position: relative;
}

.pantry-main-container {
  border: 1px solid #000000;
  border-radius: 5px;
  margin: 60px auto;
  width: 80vw;
}

.noBorder {
  border: none;
}

.error-message {
  color: #ff0000;
}
</style>
