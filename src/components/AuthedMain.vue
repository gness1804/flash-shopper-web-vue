<template>
  <div class="authed-main">
    <div class="upper-icons-container">
      <div class="upper-icon-block">
      <img
        class="upper-icon"
        src="../assets/list.png"
      />
      <span class="items-length">{{items.length}}</span>
      </div>
      <div class="upper-icon-block">
      <img
        class="upper-icon"
        src="../assets/cart-arrow-down.png"
      />
      <span class="items-in-cart-count">{{countItemsInCart()}}</span>
      </div>
    </div>
    <p
      class="error-container"
      v-if="error"
    >
    {{errorMssg}}
    </p>
    <h3 class="headline">Enter New Item:</h3>
    <div
      class="item-input-container"
    >
      <input
        type="text"
        placeholder="Name"
        @input="makeErrorFalse"
        v-model="name"
        class="text-input-field"
        list="names"
      />
      <NamesSelector
        :names="names"
        :remove-duplicates="removeDuplicates(names)"
      />
      <NamesSelectorSafari
        :is-safari="isSafari"
        :name="name"
        :names="names"
        :remove-duplicates="removeDuplicates(names)"
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
    <div class="buttons-container">
      <button
        class="button bottom-button add-item-button"
        v-on:click="addItem"
      >
        {{addItemString}}
      </button>
      <button
        class="button bottom-button sort-alpha-button"
        v-on:click="sortAlpha"
      >
        {{sortAlphaString}}
      </button>
      <button
        class="button bottom-button sort-aisle-button"
        v-on:click="sortAisle"
      >
        {{sortAisleString}}
      </button>
      <button
        class="button warn-button bottom-button delete-all-items-button"
        v-on:click="deleteAllItems"
        v-bind:disabled="items.length === 0"
      >
        {{deleteAllItemsString}}
      </button>
      <button
        class="button warn-button bottom-button complete-all-items-in-cart-button"
        v-on:click="completeAllInCart"
        v-bind:disabled="!thereAreItemsInCart(items)"
      >
        {{completeAllInCartString}}
      </button>
    </div>
    <div
      class="items-container"
      v-if="items.length > 0"
    >
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
    <no-items
      v-else
    >
    </no-items>
  </div>
</template>

<script>
// @flow

import NoItems from './NoItems';
import EachItemContainer from './EachItemContainer';
import NamesSelector from './NamesSelector';
import NamesSelectorSafari from './NamesSelectorSafari';
import Item from '../models/Item';
import thereAreItemsInCart from '../helpers/thereAreItemsInCart';
import filterOutDuplicates from '../helpers/filterOutDuplicates';
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
    };
  },
  methods: {
    addItem: function (): void {
      const { name, aisle, note, quantity, link } = this;
      if (!name) {
        this.triggerErrorState('Oops! Your item needs at least a name to be valid. Please try again.');
        return;
      }
      if (link && !httpValidate(link)) {
        this.triggerErrorState('Error: the link must be a valid website link. Please try again.');
        return;
      }
      this.resetInputFields();
      const it = new Item({ name, aisle, note, quantity, link });
      this.$emit('addItem', it);
    },
    addToAPN: function (_item: Item): void {
      this.$emit('addToAPN', _item);
    },
    addToHEB: function (_item: Item): void {
      this.$emit('addToHEB', _item);
    },
    addToInstacart: function (_item: Item): void {
      this.$emit('addToInstacart', _item);
    },
    completeAllInCart: function (): void {
      const warning = confirm('Are you sure you want to mark ALL the items in your cart as completed?');
      if (warning) {
        this.$emit('completeAllInCart');
      }
    },
    countItemsInCart: function (): number {
      const newArr = this.items.filter((item: Item) => {
        return item.inCart;
      });
      return newArr.length;
    },
    deleteAllItems: function (): void {
      const warning = confirm('Are you sure you want to delete ALL items? This cannot be undone!');
      if (warning) {
        this.$emit('deleteAllItems');
      }
    },
    detectBrowser: function (): void {
      const browser = navigator.userAgent;
      if (browserMatches(browser)) {
        this.isSafari = true;
      }
    },
    goToPantry: function (): void {
      this.$router.push('/pantry');
    },
    goToRecipes: function (): void {
      this.$router.push('/recipes');
    },
    makeErrorFalse: function (): void {
      this.error = false;
      this.errorMssg = '';
    },
    removeDuplicates: function (arr: Array<string>): Array<string> {
      return filterOutDuplicates(arr);
    },
    removeItem: function (_item: Item): void {
      this.$emit('removeItem', _item);
    },
    resetInputFields: function (): void {
      this.name = '';
      this.aisle = '';
      this.note = '';
      this.quantity = '';
      this.link = '';
    },
    showToast: function (message: string): void {
      this.$emit('showToast', message);
    },
    sortAisle: function (): void {
      this.$emit('sortAisle');
    },
    sortAlpha: function (): void {
      this.$emit('sortAlpha');
    },
    toggleInCart: function (item: Item): void {
      this.$emit('toggleInCart', item);
    },
    transferToDone: function (_item: Item): void {
      this.$emit('transferToDone', _item);
    },
    triggerErrorState: function (message: string): void {
      this.error = true;
      this.errorMssg = message;
    },
  },
  mounted: function (): void {
    this.detectBrowser();
    setTimeout(() => {
      this.names = flattenArr(this.pantryShortItems);
    }, display.timerStandard);
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

  @media (max-width: 500px) {
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


