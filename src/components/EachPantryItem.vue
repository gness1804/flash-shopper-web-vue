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
  </div>
</template>

<script>
// @flow
import display from '../helpers/displayVars';
import titleMatchesMainItem from '../helpers/titleMatchesMainItem';

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
  data(): {
    isHighlighted: boolean,
    isInMainList: boolean,
    isButtonDisabled: boolean,
  } {
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
    transferItemToMainList: function (): void {
      this.$emit('transferItemToMainList', this.item);
      this.isHighlighted = true;
      this.setDisabledState();
      setTimeout(() => {
        this.isHighlighted = false;
      }, display.timerStandard);
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


