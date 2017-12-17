<template>
  <div class="modal edit-item-modal">
    <p
      v-on:click="closeModal"
      class="close-modal-button"
      title="Close"
    >
      X
    </p>
   <h2>Edit Item</h2>
   <p
      class="error-container"
      v-if="error"
    >
    {{errorMssg}}
    </p>
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
   </div>
   <button
    class="button save-item-button"
    v-on:click="saveItem"
   >
     Save Item
   </button>
  </div>
</template>

<script>
import Item from '../models/Item';
import thereAreChanges from '../helpers/thereAreChanges';
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
      required: true,
    },
  },
  data(): {
    name?: string,
    aisle?: string,
    note?: string,
    quantity?: string,
    error: boolean,
    errorMssg?: string,
    targetItem: Item,
    initName: string,
    initAisle: string,
    initNote: string,
    initQty: string,
    } {
    return {
      name: this.item.name,
      aisle: this.item.aisle || '',
      note: this.item.note || '',
      quantity: this.item.quantity || '',
      error: false,
      errorMssg: '',
      targetItem: {},
      initName: this.item.name,
      initAisle: this.item.aisle || '',
      initNote: this.item.note || '',
      initQty: this.item.quantity || '',
    };
  },
  methods: {
    closeModal: function (optionalString?: string): void {
      if (optionalString && optionalString === 'saved') {
        this.$emit('closeModal');
        return;
      }
      const { name, aisle, note, quantity, initName, initAisle, initNote, initQty } = this;
      const options = {
        name,
        aisle,
        note,
        quantity,
        initName,
        initAisle,
        initNote,
        initQty,
      };
      if (thereAreChanges(options)) {
        const warning = confirm('Warning: You have unsaved changes! Are you sure you want to exit editing?');
        if (warning) {
          this.$emit('closeModal');
          this.showToast('Changes discarded.');
        }
        return;
      }
      this.$emit('closeModal');
    },
    makeErrorFalse: function (): void {
      this.error = false;
      this.errorMssg = '';
    },
    resetInputFields: function (): void {
      this.name = '';
      this.aisle = '';
      this.note = '';
      this.quantity = '';
    },
    saveItem: function (): void {
      const { name, aisle, note, quantity } = this;
      if (!name) {
        this.triggerErrorState('Oops! Your item must have at least a name.');
        return;
      }
      this.targetItem.update({
        name,
        aisle,
        note,
        quantity,
      });
      this.closeModal('saved');
      this.showToast('Item saved.');
    },
    showToast: function (message: string): void {
      this.$emit('showToast', message);
    },
    triggerErrorState: function (message: string): void {
      this.error = true;
      this.errorMssg = message;
    },
  },
  mounted: function (): void {
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


