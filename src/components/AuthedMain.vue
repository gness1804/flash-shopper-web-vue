<template>
  <div class="authed-main">
    <h3>Enter New Item:</h3>
    <div
      class="item-input-container"
    >
      <input
        type="text"
        placeholder="Name"
        v-model="name"
        class="text-input-field"
      />
      <input
        type="text"
        placeholder="Aisle"
        v-model="aisle"
        class="text-input-field"
      />
      <input
        type="text"
        placeholder="Note"
        v-model="note"
        class="text-input-field"
      />
      <input
        type="text"
        placeholder="Quantity"
        v-model="quantity"
        class="text-input-field"
      />
    </div>
    <button
      class="button"
      v-on:click="addItem"
    >
    Add Item
    </button>
    <button
      class="button warn-button"
      v-on:click="deleteAllItems"
    >
    Delete ALL Items
    </button>
    <button
      class="button warn-button"
      v-on:click="deleteAllInCart"
    >
    Delete ALL In Cart
    </button>
    <div
      class="items-container"
      v-if="items.length > 0"
    >
      <p>Items:</p>
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
    };
  },
  methods: {
    addItem: function () {
      const { name, aisle, note, quantity } = this;
      if (!name) {
        alert('Oops! Your item needs at least a name to be valid. Please try again');
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
    updateName: function (newName, item) {
      this.$emit('updateName', newName, item);
    },
  },
};
</script>

<style scoped>
  .item-input-container {
    align-items: center;
    display: flex;
    flex-direction: column;
    justify-content: center;
    margin: 40px auto;
  }
</style>


