<template>
  <div class="modal add-ingredient-modal">
    <p v-on:click="closeModal" class="close-modal-button" title="Close">X</p>
    <h2>Add Ingredient</h2>
    <p class="error-container" v-if="error">{{ errorMssg }}</p>
    <div class="item-input-container">
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
      class="button add-ingredient-modal-button"
      v-on:click="addIngredient"
    >
      Add Ingredient
    </button>
  </div>
</template>

<script>
import Item from '../models/Item';
import { ItemModalInt } from '../types/interfaces/ItemModals';
import httpValidate from '../helpers/httpValidate';
// @flow

export default {
  name: 'AddIngredientModal',
  data(): ItemModalInt {
    return {
      name: '',
      aisle: '',
      note: '',
      quantity: '',
      link: '',
      error: false,
      errorMssg: '',
    };
  },
  methods: {
    addIngredient: function(): void {
      const { name, aisle, note, quantity, link } = this;
      if (!name || !quantity) {
        this.triggerErrorState(
          'Oops! Your ingredient needs at least a name and a quantity to be valid. Please try again.',
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
      const ingredient = new Item({ name, aisle, note, quantity, link });
      this.$emit('addIngredient', ingredient);
    },
    closeModal: function(): void {
      const { name, aisle, note, quantity, link } = this;
      if (name || aisle || note || quantity || link) {
        const warning = confirm(
          'You have unsaved changes! Are you sure you want to exit?',
        );
        if (warning) {
          this.$emit('closeModal');
          const message = 'Changes discarded.';
          this.$emit('showToast', message);
        } else {
          return;
        }
      }
      this.$emit('closeModal');
    },
    makeErrorFalse: function(): void {
      this.error = false;
      this.errorMssg = '';
    },
    resetInputFields: function(): void {
      this.name = '';
      this.aisle = '';
      this.note = '';
      this.quantity = '';
      this.link = '';
    },
    triggerErrorState: function(message: string): void {
      this.error = true;
      this.errorMssg = message;
    },
  },
};
</script>

<style scoped>
.close-modal-button {
  color: #ff0000;
}

.close-modal-button:hover {
  cursor: pointer;
}
</style>
