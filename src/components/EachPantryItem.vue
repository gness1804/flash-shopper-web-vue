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
    <img
        class="large-icon add-item-to-main-list-button"
        src="../assets/plus-icon-small.png"
        v-on:click="transferItemToMainList"
        title="Add Item to Main List"
      />
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
  } {
    return {
      isHighlighted: false,
      isInMainList: false,
    };
  },
  methods: {
    deleteItem: function (): void {
      const warning = confirm(`Warning: do you want to delete ${this.item.name} from the pantry? This cannot be undone!`);
      if (warning) {
        this.$emit('deleteItem', this.item);
      }
    },
    transferItemToMainList: function (): void {
      this.$emit('transferItemToMainList', this.item);
      this.isHighlighted = true;
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
        this.isInMainList = true;
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
</style>


