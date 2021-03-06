<template>
  <div class="each-item-container">
    <h3 class="each-item-name" v-bind:class="{ strike: item.inCart }">
      {{ item.name }}
    </h3>
    <p
      class="each-item-aisle"
      v-if="item.aisle"
      v-bind:class="{ strike: item.inCart }"
    >
      <span class="bold"> Aisle: </span> {{ item.aisle }}
    </p>
    <p
      class="each-item-note"
      v-if="item.note"
      v-bind:class="{ strike: item.inCart }"
    >
      <span class="bold"> Note: </span> {{ item.note }}
    </p>
    <p
      class="each-item-quantity"
      v-if="item.quantity"
      v-bind:class="{ strike: item.inCart }"
    >
      <span class="bold"> Quantity: </span> {{ item.quantity }}
    </p>
    <a
      v-bind:href="item.link"
      class="link each-item-link"
      v-if="item.link"
      v-bind:class="{ strike: item.inCart }"
      target="_blank"
    >
      <p>Link</p>
    </a>
    <div class="buttons-container">
      <img
        class="icon remove-item-button"
        src="../assets/cancel-circle.png"
        v-on:click="removeItem"
        title="Delete Item"
      />
      <img
        class="icon toggle-in-cart-button"
        src="../assets/cart.png"
        v-on:click="toggleInCart"
        v-bind:title="item.inCart ? inCartTitle : notInCartTitle"
      />
      <img
        class="icon add-to-instacart-button"
        src="../assets/instacart.png"
        v-on:click="addToInstacart"
        title="Add Item to Instacart"
      />
      <img
        class="icon add-to-heb-button"
        src="../assets/heb-icon.png"
        v-on:click="addToHEB"
        title="Add Item to HEB"
      />
      <img
        class="icon edit-item-button"
        src="../assets/pencil.png"
        v-on:click="openEditModal"
        title="Edit Item"
      />
      <img
        class="icon transfer-to-done-button"
        src="../assets/check-square-o.png"
        v-on:click="transferToDone"
        title="Mark Item as Done"
      />
    </div>
    <edit-item-modal
      v-if="showEditModal"
      v-on:closeModal="closeEditModal"
      v-bind:item="item"
      v-bind:itemsRef="itemsRef"
      v-on:showToast="showToast"
    >
    </edit-item-modal>
  </div>
</template>

<script>
import moment from 'moment';
import EditItemModal from './EditItemModal';
import { EachItemContainerInt } from '../types/interfaces/EachItemContainer';
// @flow

export default {
  name: 'EachItemContainer',
  components: {
    EditItemModal,
  },
  props: {
    item: {
      type: Object,
      required: true,
    },
    itemsRef: {
      type: Object,
      required: true,
    },
  },
  data(): EachItemContainerInt {
    return {
      inCartTitle: 'Remove Item from Cart',
      notInCartTitle: 'Add Item to Cart',
      showEditModal: false,
    };
  },
  methods: {
    addToAPN: function(): void {
      this.$emit('addToAPN', this.item);
    },
    addToHEB: function(): void {
      this.$emit('addToHEB', this.item);
    },
    addToInstacart: function(): void {
      this.$emit('addToInstacart', this.item);
    },
    closeEditModal: function(): void {
      this.showEditModal = false;
    },
    openEditModal: function(): void {
      this.showEditModal = true;
    },
    removeItem: function(): void {
      const warning = confirm(
        `Are you sure you want to delete ${
          this.item.name
        }? This cannot be undone!`,
      );
      if (warning) {
        this.$emit('removeItem', this.item);
      }
    },
    showToast: function(message: string): void {
      this.$emit('showToast', message);
    },
    toggleInCart: function(): void {
      this.$emit('toggleInCart', this.item);
    },
    transferToDone: function(): void {
      const warning = confirm(
        'Are you sure you want to mark this item as completed?',
      );
      if (warning) {
        const newItem = {
          ...this.item,
          dateCompleted: moment().format('MMM Do YY'),
        };
        this.$emit('transferToDone', newItem);
      }
    },
  },
};
</script>

<style scoped>
.each-item-container {
  background-color: #ffffff;
  border: 1px solid #000000;
  border-radius: 5px;
  margin: 20px auto;
  overflow: hidden;
  padding: 10px;
  width: 40vw;
}

.each-item-name {
  cursor: pointer;
  margin-top: 0;
}

.buttons-container {
  align-items: center;
  display: flex;
  flex-direction: row;
  justify-content: center;
}

.each-item-link {
  font-weight: 600;
}

.strike,
.each-item-link.strike {
  color: #9a8c8c;
  text-decoration: line-through;
}
</style>
