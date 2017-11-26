<template>
  <div class="each-pantry-item">
    <h3 class="pantry-item-name">{{item.name}}</h3>
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
  </div>
</template>

<script>
// @flow

export default {
  name: 'EachPantryItem',
  props: {
    item: {
      type: Object,
      required: true,
    },
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
    },
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

  .pantry-item-name {
    margin-right: 40px;
  }
</style>


