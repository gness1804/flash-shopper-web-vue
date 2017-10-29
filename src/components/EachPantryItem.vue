<template>
  <div class="each-pantry-item">
    <h3 class="pantry-item-name">{{item.name}}</h3>
    <img
        class="large-icon add-item-to-main-list-button"
        src="../assets/plus-icon-small.png"
        v-on:click="transferItemToMainList"
        title="Add Item to Main List"
      />
  </div>
</template>

<script>
export default {
  name: 'EachPantryItem',
  props: {
    item: {
      type: Object,
      required: true,
    },
  },
  methods: {
    transferItemToMainList: function () {
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


