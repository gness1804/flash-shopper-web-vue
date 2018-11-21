<template>
  <div
    class="each-pantry-item"
    v-bind:class="{ highlighted: isHighlighted }"
  >
    <h3
      class="pantry-item-name"
      v-bind:class="{ grayedOut: isInMainList }"
    >
      {{item.name}}
    </h3>
    <button
      v-bind:disabled="isButtonDisabled"
      v-on:click="transferItemToMainList"
      class="blank-button add-item-to-main-list-button"
    >
      <img
          class="large-icon"
          v-bind:class="{ hidden: isButtonDisabled }"
          src="../assets/plus-icon-small.png"
          title="Add Item to Main List"
        />
    </button>
      <img
        class="large-icon delete-item-button"
        src="../assets/cancel-circle.png"
        v-on:click="deleteItem"
        title="Delete Item"
      />
      <img
        class="large-icon edit-item-button"
        src="../assets/pencil.png"
        v-on:click="viewEditModal"
        title="Edit Item"
      />
      <a
        v-if="item.link"
        v-bind:href="item.link"
        target="_blank"
      >
        <img
          class="large-icon item-link-button"
          src="../assets/link.png"
          title="Go to Link"
        />
      </a>
  </div>
</template>

<script>
// @flow

import display from '../helpers/displayVars';
import titleMatchesMainItem from '../helpers/titleMatchesMainItem';
import { EachPantryItemInt } from '../types/interfaces/EachItemContainer';

export default {
  name: 'EachPantryItem',
  props: {
    item: {
      type: Object,
      required: true,
    },
    mainShortItems: {
      type: Array,
      required: false,
    },
  },
  data(): EachPantryItemInt {
    return {
      isHighlighted: false,
      isInMainList: false,
      isButtonDisabled: false,
    };
  },
  methods: {
    deleteItem: function (): void {
      const warning = confirm(`Warning: do you want to delete ${this.item.name} from the pantry? This cannot be undone!`);
      if (warning) {
        this.$emit('deleteItem', this.item);
      }
    },
    setDisabledState: function (): void {
      this.isInMainList = true;
      this.isButtonDisabled = true;
    },
    setTempHighlighting: function (): void {
      this.isHighlighted = true;
      this.setDisabledState();
      setTimeout(() => {
        this.isHighlighted = false;
      }, display.timerStandard);
    },
    transferItemToMainList: function (): void {
      this.$emit('transferItemToMainList', this.item);
      this.setTempHighlighting();
    },
    viewEditModal: function (): void {
      this.$emit('viewEditModal', this.item);
    },
  },
  mounted: function (): void {
    setTimeout(() => {
      if (titleMatchesMainItem(this.item.name, this.mainShortItems)) {
        this.setDisabledState();
      }
    }, display.timerStandard);
  },
};
</script>

<style scoped>
  .each-pantry-item {
    align-items: center;
    display: flex;
    flex-direction: row;
    justify-content: center;
  }

  .highlighted {
    border: 2px solid #f00;
    background-color: #C56415;
  }

  .pantry-item-name {
    margin-right: 40px;
  }

  .grayedOut {
    color:#8c8383;
    text-decoration: line-through;
  }

  .blank-button {
    background-color: transparent;
    border: none;
  }

  .hidden {
    display: none;
  }
</style>


