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
    </div>
    <div class="buttons-container">
      <button
        class="button bottom-button add-item-button"
        v-on:click="addItem"
      >
      Add Item
      </button>
      <button
        class="button warn-button bottom-button"
        v-on:click="deleteAllItems"
      >
      Delete ALL Items
      </button>
      <button
        class="button warn-button bottom-button"
        v-on:click="deleteAllInCart"
      >
      Delete ALL In Cart
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
        v-on:removeItem="removeItem"
        v-on:updateName="updateName"
        v-on:toggleInCart="toggleInCart"
        v-on:addToAPN="addToAPN"
        v-on:addToInstacart="addToInstacart"
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
import NoItems from './NoItems';
import EachItemContainer from './EachItemContainer';
import Item from '../models/Item';

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
  },
  data() {
    return {
      name: '',
      aisle: '',
      note: '',
      quantity: '',
      error: false,
      errorMssg: '',
    };
  },
  methods: {
    addItem: function () {
      const { name, aisle, note, quantity } = this;
      if (!name) {
        this.triggerErrorState('Oops! Your item needs at least a name to be valid. Please try again.');
        return;
      }
      this.resetInputFields();
      const it = new Item(name, aisle, note, quantity);
      this.$emit('addItem', it);
    },
    addToAPN: function (_item) {
      this.$emit('addToAPN', _item);
    },
    addToInstacart: function (_item) {
      this.$emit('addToInstacart', _item);
    },
    countItemsInCart: function () {
      const newArr = this.items.filter((item) => {
        return item.inCart;
      });
      return newArr.length;
    },
    deleteAllInCart: function () {
      const warning = confirm('Are you sure you want to delete ALL items in your cart? This cannot be undone!');
      if (warning) {
        this.$emit('deleteAllInCart');
      }
    },
    deleteAllItems: function () {
      const warning = confirm('Are you sure you want to delete ALL items? This cannot be undone!');
      if (warning) {
        this.$emit('deleteAllItems');
      }
    },
    makeErrorFalse: function () {
      this.error = false;
      this.errorMssg = '';
    },
    removeItem: function (_item) {
      this.$emit('removeItem', _item);
    },
    resetInputFields: function () {
      this.name = '';
      this.aisle = '';
      this.note = '';
      this.quantity = '';
    },
    toggleInCart: function (_item) {
      this.$emit('toggleInCart', _item);
    },
    triggerErrorState: function (message) {
      this.error = true;
      this.errorMssg = message;
    },
    updateName: function (newName, item) {
      this.$emit('updateName', newName, item);
    },
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

  .item-input-container {
    align-items: center;
    display: flex;
    flex-direction: column;
    justify-content: center;
    margin: 40px auto;
  }

  .error-container {
    color: red;
  }

  .bottom-button {
    margin-right: 20px;
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

</style>


