<template>
  <div class="authed-main">
    <div class="upper-icons-container">
      <div class="upper-icon-block">
        <img class="upper-icon" src="../assets/list.png" />
        <span class="items-length">{{ items.length }}</span>
      </div>
      <div class="upper-icon-block">
        <img class="upper-icon" src="../assets/cart-arrow-down.png" />
        <span class="items-in-cart-count">{{ countItemsInCart() }}</span>
      </div>
    </div>
    <p class="error-container" v-if="error">{{ errorMssg }}</p>
    <h3 class="headline">Enter New Item:</h3>
    <div class="item-input-container">
      <input
        type="text"
        placeholder="Name"
        @input="makeErrorFalse"
        @blur="checkAisle"
        v-model="name"
        class="text-input-field"
        list="names"
      />
      <button
        v-bind:disabled="!name"
        v-on:click="addToHEB(name)"
        class="blank-button search-heb-button"
      >
        <img
          class="heb-icon-name-search"
          src="../assets/heb-icon.png"
          title="Search HEB"
        />
      </button>
      <NamesSelector
        :names="names"
        :remove-duplicates="removeDuplicates(names)"
      />
      <NamesSelectorSafari
        :is-safari="isSafari"
        :name="name"
        :names="names"
        :remove-duplicates="removeDuplicates(names)"
        v-on:selectNameSafari="selectNameSafari"
      />
      <label for="populate" class="auto-populate-label">
        Auto Populate Aisle
        <input
          type="checkbox"
          id="populate"
          v-model="isAisleAutoPopulated"
          checked
        />
      </label>
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
    <div class="buttons-container">
      <button class="button bottom-button add-item-button" v-on:click="addItem">
        {{ addItemString }}
      </button>
      <button
        class="button bottom-button sort-alpha-button"
        v-on:click="sortAlpha"
      >
        {{ sortAlphaString }}
      </button>
      <button
        class="button bottom-button sort-aisle-button"
        v-on:click="sortAisle"
      >
        {{ sortAisleString }}
      </button>
      <button
        class="button warn-button bottom-button delete-all-items-button"
        v-on:click="deleteAllItems"
        v-bind:disabled="items.length === 0"
      >
        {{ deleteAllItemsString }}
      </button>
      <button
        class="button warn-button bottom-button delete-all-aisles-button"
        v-on:click="deleteAllAisles"
        v-bind:disabled="items.length === 0"
      >
        Delete All Aisles
      </button>
      <button
        class="button warn-button bottom-button complete-all-items-in-cart-button"
        v-on:click="completeAllInCart"
        v-bind:disabled="!thereAreItemsInCart(items)"
      >
        {{ completeAllInCartString }}
      </button>
    </div>
    <div class="items-container" v-if="items.length > 0">
      <p class="items-headline">Items:</p>
      <each-item-container
        v-for="item of items"
        v-bind:key="item.id"
        v-bind:item="item"
        v-bind:itemsRef="itemsRef"
        v-on:removeItem="removeItem"
        v-on:toggleInCart="toggleInCart"
        v-on:addToAPN="addToAPN"
        v-on:addToInstacart="addToInstacart"
        v-on:showToast="showToast"
        v-on:addToHEB="addToHEB"
        v-on:transferToDone="transferToDone"
      >
      </each-item-container>
    </div>
    <no-items v-else> </no-items>
  </div>
</template>

<script>
// @flow

import { v4 } from 'uuid';
import NoItems from './NoItems';
import EachItemContainer from './EachItemContainer';
import NamesSelector from './NamesSelector';
import NamesSelectorSafari from './NamesSelectorSafari';
import Item from '../models/Item';
import ShortItem from '../models/ShortItem';
import thereAreItemsInCart from '../helpers/thereAreItemsInCart';
import {
  filterOutDuplicateNames,
  filteroutDuplicateRecentItems,
} from '../helpers/filterOutDuplicates';
import flattenArr from '../helpers/flattenArr';
import buttonStrings from '../helpers/buttonStrings';
import browserMatches from '../helpers/browserMatches';
import display from '../helpers/displayVars';
import httpValidate from '../helpers/httpValidate';
import { AuthedMainInt } from '../types/interfaces/AuthedMain';

export default {
  name: 'AuthedMain',
  components: {
    NamesSelectorSafari,
    NamesSelector,
    NoItems,
    EachItemContainer,
  },
  props: {
    items: {
      type: Array,
      required: true,
    },
    itemsRef: {
      type: Object,
      required: true,
    },
    pantryShortItems: {
      type: Array,
      required: false,
    },
  },
  data(): AuthedMainInt {
    return {
      name: '',
      aisle: '',
      note: '',
      quantity: '',
      link: '',
      error: false,
      errorMssg: '',
      thereAreItemsInCart,
      names: [],
      goToPantryString: buttonStrings.goToPantry,
      goToRecipesString: buttonStrings.goToRecipes,
      addItemString: buttonStrings.addItem,
      deleteAllItemsString: buttonStrings.deleteAllItems,
      completeAllInCartString: buttonStrings.completeAllInCart,
      sortAlphaString: buttonStrings.sortAlpha,
      sortAisleString: buttonStrings.sortAisle,
      isSafari: false,
      isAisleAutoPopulated: true,
      recentSearches: [],
    };
  },
  methods: {
    addItem: async function(): void {
      const { name, aisle, note, quantity, link } = this;
      if (!name) {
        this.triggerErrorState(
          'Oops! Your item needs at least a name to be valid. Please try again.',
        );
        return;
      }
      if (link && !httpValidate(link)) {
        this.triggerErrorState(
          'Error: the link must be a valid website link. Please try again.',
        );
        return;
      }
      // success state
      this.resetInputFields();
      const it = new Item({
        name,
        aisle,
        note,
        quantity,
        link,
      });
      this.$emit('addItem', it);
      if (aisle) {
        // filter out duplicates from localStorage list
        this.recentSearches = await filteroutDuplicateRecentItems(
          name,
          this.recentSearches,
        );
        // add object with name and aisle to localStorage list
        const _it = new ShortItem(v4(), name, aisle);
        await this.recentSearches.push(_it);
        localStorage.setItem(
          'fsRecentSearches',
          JSON.stringify(this.recentSearches),
        );
      }
    },
    addToAPN: function(_item: Item): void {
      this.$emit('addToAPN', _item);
    },
    addToHEB: function(_item: Item | string): void {
      this.$emit('addToHEB', _item);
    },
    addToInstacart: function(_item: Item): void {
      this.$emit('addToInstacart', _item);
    },
    checkAisle: function(): void {
      if (this.isAisleAutoPopulated) {
        this.populateAisle(this.name);
      }
    },
    clearLocalStorageSearches: function () {
      localStorage.setItem('fsRecentSearches', JSON.stringify([]));
    },
    completeAllInCart: function(): void {
      const warning = confirm(
        'Are you sure you want to mark ALL the items in your cart as completed?',
      );
      if (warning) {
        this.$emit('completeAllInCart');
      }
    },
    countItemsInCart: function(): number {
      const newArr = this.items.filter((item: Item) => {
        return item.inCart;
      });
      return newArr.length;
    },
    deleteAllAisles: function() {
      const warning = confirm(
        'Are you sure you want to delete ALL aisles for all items? This cannot be undone!',
      );
      if (warning) {
        this.$emit('deleteAllAisles');
        this.clearLocalStorageSearches();
      }
    },
    deleteAllItems: function(): void {
      const warning = confirm(
        'Are you sure you want to delete ALL items? This cannot be undone!',
      );
      if (warning) {
        this.$emit('deleteAllItems');
      }
    },
    detectBrowser: function(): void {
      const browser = navigator.userAgent;
      if (browserMatches(browser)) {
        this.isSafari = true;
      }
    },
    goToPantry: function(): void {
      this.$router.push('/pantry');
    },
    goToRecipes: function(): void {
      this.$router.push('/recipes');
    },
    initLocalStorage: async function(): void {
      if (localStorage.getItem('fsRecentSearches')) {
        this.recentSearches = await JSON.parse(
          localStorage.getItem('fsRecentSearches'),
        );
      } else {
        this.clearLocalStorageSearches();
      }
    },
    makeErrorFalse: function(): void {
      this.error = false;
      this.errorMssg = '';
    },
    populateAisle: function(name): void {
      const pantryItem = this.pantryShortItems.filter(i => i.name === name)[0];
      const pantryAisle = pantryItem ? pantryItem.aisle : undefined;
      const recentSearchesItem = this.recentSearches.filter(
        i => i.name === name,
      )[0];
      const recentSearchesAisle = recentSearchesItem
        ? recentSearchesItem.aisle
        : undefined;
      if (pantryItem && pantryAisle) {
        this.aisle = pantryAisle;
        this.showToast('Populated aisle number from pantry list.');
      } else if (recentSearchesItem && recentSearchesAisle) {
        this.aisle = recentSearchesAisle;
        this.showToast('Populated aisle number from recent searches.');
      } else {
        this.aisle = '';
      }
    },
    removeDuplicates: function(arr: string[]): string[] {
      return filterOutDuplicateNames(arr);
    },
    removeItem: function(_item: Item): void {
      this.$emit('removeItem', _item);
    },
    resetInputFields: function(): void {
      this.name = '';
      this.aisle = '';
      this.note = '';
      this.quantity = '';
      this.link = '';
    },
    selectNameSafari: function(name: string): void {
      this.name = name;
      if (this.isAisleAutoPopulated) {
        this.populateAisle(name);
      }
    },
    setNames: function(): void {
      setTimeout(() => {
        this.names = flattenArr(this.pantryShortItems);
      }, display.timerStandard);
    },
    showToast: function(message: string): void {
      this.$emit('showToast', message);
    },
    sortAisle: function(): void {
      this.$emit('sortAisle');
    },
    sortAlpha: function(): void {
      this.$emit('sortAlpha');
    },
    toggleInCart: function(item: Item): void {
      this.$emit('toggleInCart', item);
    },
    transferToDone: function(_item: Item): void {
      this.$emit('transferToDone', _item);
    },
    triggerErrorState: function(message: string): void {
      this.error = true;
      this.errorMssg = message;
    },
  },
  mounted: async function(): void {
    await this.detectBrowser();
    await this.setNames();
    await this.initLocalStorage();
  },
};
</script>

<style scoped>
.buttons-container {
  align-items: center;
  display: flex;
  flex-direction: row;
  justify-content: center;
}

.bottom-button {
  margin-right: 20px;
}

.go-to-pantry-button {
  margin-top: 20px;
}

.items-headline {
  font-size: 24px;
  margin: 40px auto;
}

.upper-icons-container {
  align-items: center;
  display: flex;
  flex-direction: row;
  justify-content: center;
  margin: 30px auto;
}

.upper-icon-block {
  margin-right: 20px;
}

.upper-icon {
  height: 40px;
  width: 40px;
}

.auto-populate-label {
  font-size: 13px;
  margin-bottom: 20px;
}

.auto-populate-label:hover,
.auto-populate-label input:hover {
  cursor: pointer;
}

.search-heb-button {
  margin: 20px auto;
}

.search-heb-button:disabled {
  opacity: 0.5;
}

.heb-icon-name-search {
  height: 40px;
}

@media (max-width: 500px) {
  /*prettier-ignore*/

  .buttons-container {
    flex-direction: column;
  }

  .button.bottom-button {
    border-radius: 10px;
    font-size: 20px;
    margin-bottom: 5%;
    margin-right: 0;
    padding: 10px;
    width: 60%;
  }
}
</style>
