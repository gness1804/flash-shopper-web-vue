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
    <div
      class="items-container"
      v-if="items.length > 0"
    >
      <each-item-container
        v-for="item of items"
        v-bind:key="item.id"
        v-bind:item="item"
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
    addItem: async function () {
      const { name, aisle, note, quantity } = this;
      if (!name) {
        alert('Oops! Your item needs at least a name to be valid. Please try again');
        return;
      }
      const it = new Item(name, aisle, note, quantity);
      await this.$emit('addItem', it);
      // this.resetInputFields();
    },
    // resetInputFields: function () {
    //   console.log('sanity check');
    //   this.name = '';
    //   this.aisle = '';
    //   this.note = '';
    //   this.quantity = '';
    // },
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


