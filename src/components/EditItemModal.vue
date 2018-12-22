<template>
  <div class="modal edit-item-modal">
    <p v-on:click="closeModal" class="close-modal-button" title="Close">X</p>
    <h2>Edit Item</h2>
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
    <button class="button save-item-button" v-on:click="saveItem">
      Save Item
    </button>
  </div>
</template>

<script>
import thereAreChanges from '../helpers/thereAreChanges';
import httpValidate from '../helpers/httpValidate';
import { EditItemModalInt } from '../types/interfaces/ItemModals';
// @flow

export default {
  name: 'EditItemModal',
  props: {
    item: {
      type: Object,
      required: true,
    },
    itemsRef: {
      type: Object,
      required: false,
    },
    isIngredient: {
      type: Boolean,
      required: false,
    },
  },
  data(): EditItemModalInt {
    return {
      name: this.item.name,
      aisle: this.item.aisle || '',
      note: this.item.note || '',
      quantity: this.item.quantity || '',
      link: this.item.link || '',
      error: false,
      errorMssg: '',
      targetItem: {},
      initName: this.item.name,
      initAisle: this.item.aisle || '',
      initNote: this.item.note || '',
      initQty: this.item.quantity || '',
      initLink: this.item.link || '',
    };
  },
  methods: {
    closeModal: function(optionalString?: string): void {
      if (optionalString && optionalString === 'saved') {
        this.$emit('closeModal');
        return;
      }
      const {
        name,
        aisle,
        note,
        quantity,
        link,
        initName,
        initAisle,
        initNote,
        initQty,
        initLink,
      } = this;
      const options = {
        name,
        aisle,
        note,
        quantity,
        link,
        initName,
        initAisle,
        initNote,
        initQty,
        initLink,
      };
      if (thereAreChanges(options)) {
        const warning = confirm(
          'Warning: You have unsaved changes! Are you sure you want to exit editing?',
        );
        if (warning) {
          this.$emit('closeModal');
          this.showToast('Changes discarded.');
        }
        return;
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
    saveItem: function(): void {
      const { name, aisle, note, quantity, link, item } = this;
      if (!name) {
        this.triggerErrorState('Oops! Your item must have at least a name.');
        return;
      }
      if (link && !httpValidate(link)) {
        this.triggerErrorState(
          'Error: the link must be a valid website link. Please try again.',
        );
        return;
      }
      if (this.isIngredient) {
        const newIng = { ...item, name, aisle, note, quantity, link };
        this.$emit('editIngredient', newIng);
        return;
      }
      this.targetItem.update({
        name,
        aisle,
        note,
        quantity,
        link,
      });
      this.closeModal('saved');
      this.showToast('Item saved.');
    },
    showToast: function(message: string): void {
      this.$emit('showToast', message);
    },
    triggerErrorState: function(message: string): void {
      this.error = true;
      this.errorMssg = message;
    },
  },
  mounted: function(): void {
    if (this.isIngredient) {
      this.targetItem = this.item;
      return;
    }
    this.targetItem = this.itemsRef.child(this.item.id);
  },
};
</script>

<style scoped>
.close-modal-button {
  color: #f00;
}

.close-modal-button:hover {
  cursor: pointer;
}
</style>
