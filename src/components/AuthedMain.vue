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
      <datalist
        id="names"
        v-if="names.length > 0"
      >
        <option
          v-for="name in removeDuplicates(names)"
          v-bind:key="name.id"
          v-bind:value="name"
        >
          {{name}}
        </option>
      </datalist>
      <select
        v-if="isSafari && names.length > 0"
        v-model="name"
        class="safari-dropdown"
      >
        <option
          disabled
          value=""
        >
          Select a name
        </option>
        <option
          v-for="name in removeDuplicates(names)"
          v-bind:key="name.id"
          v-bind:value="name"
          class="safari-dropdown-item"
        >
          {{name}}
        </option>
      </select>
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
      <p>
        Units:
      </p>
      <select
          class="units-select"
          v-model="units"
        >
          <option
            v-for="num of nums"
            v-bind:key="num * Math.random()"
            v-bind:value="num"
          >
            {{num}}
          </option>
      </select>
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
        class="button warn-button bottom-button delete-all-items-in-cart-button"
        v-on:click="deleteAllInCart"
        v-bind:disabled="!thereAreItemsInCart(items)"
      >
        {{deleteAllInCartString}}
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
import Item from '../models/Item';
import thereAreItemsInCart from '../helpers/thereAreItemsInCart';
import filterOutDuplicates from '../helpers/filterOutDuplicates';
import flattenArr from '../helpers/flattenArr';
import buttonStrings from '../helpers/buttonStrings';
import browserMatches from '../helpers/browserMatches';
import display from '../helpers/displayVars';

export default {
  name: 'AuthedMain',
  components: {
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
  data(): {
    name?: string,
    aisle?: string,
    note?: string,
    quantity?: string,
    units: number,
    error: boolean,
    errorMssg?: string,
    thereAreItemsInCart: Function,
    names: Array<string>,
    goToPantryString: string,
    goToRecipesString: string,
    addItemString: string,
    deleteAllItemsString: string,
    deleteAllInCartString: string,
    sortAlphaString: string,
    sortAisleString: string,
    isSafari: boolean,
    nums: number[],
  } {
    return {
      name: '',
      aisle: '',
      note: '',
      quantity: '',
      units: 1,
      error: false,
      errorMssg: '',
      thereAreItemsInCart,
      names: [],
      goToPantryString: buttonStrings.goToPantry,
      goToRecipesString: buttonStrings.goToRecipes,
      addItemString: buttonStrings.addItem,
      deleteAllItemsString: buttonStrings.deleteAllItems,
      deleteAllInCartString: buttonStrings.deleteAllInCart,
      sortAlphaString: buttonStrings.sortAlpha,
      sortAisleString: buttonStrings.sortAisle,
      isSafari: false,
      nums: [],
    };
  },
  methods: {
    addItem: function (): void {
      const { name, aisle, note, quantity, units } = this;
      if (!name) {
        this.triggerErrorState('Oops! Your item needs at least a name to be valid. Please try again.');
        return;
      }
      this.resetInputFields();
      const it = new Item({ name, aisle, note, quantity, units });
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
    countItemsInCart: function (): number {
      const newArr = this.items.filter((item: Item) => {
        return item.inCart;
      });
      return newArr.length;
    },
    deleteAllInCart: function (): void {
      const warning = confirm('Are you sure you want to delete ALL items in your cart? This cannot be undone!');
      if (warning) {
        this.$emit('deleteAllInCart');
      }
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
    tabulateNumbers: function (): void {
      for (let i = 0; i < 101; i++) {
        if (i > 0) {
          this.nums.push(i);
        }
      }
    },
    toggleInCart: function (item: Item): void {
      this.$emit('toggleInCart', item);
    },
    triggerErrorState: function (message: string): void {
      this.error = true;
      this.errorMssg = message;
    },
  },
  mounted: function (): void {
    this.tabulateNumbers();
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

  .safari-dropdown {
    margin-bottom: 30px;
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


