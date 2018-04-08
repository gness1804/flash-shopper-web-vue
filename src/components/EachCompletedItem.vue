<template lang="pug">
  .each-completed-item
    h3.completed-item-name {{item.name}}
    img.large-icon.restore-to-main-button(src="../assets/arrow-up.png" v-on:click="restoreItemToMain" title="Restore to Main List")
    img.large-icon.delete-item-button(src="../assets/cancel-circle.png" v-on:click="deleteItem" title="Delete Item")
    p.date-output {{ item.dateCompleted ? item.dateCompleted : 'No Date Found.' }}
</template>

<script>
// @flow

export default {
  name: 'eachCompletedItem',
  props: {
    item: {
      type: Object,
      required: true,
    },
  },
  methods: {
    deleteItem: function (): void {
      this.$emit('deleteItem', this.item);
    },
    restoreItemToMain: function (): void {
      this.$emit('restoreItemToMain', this.item);
    },
  },
};
</script>

<style scoped>
  .each-completed-item {
    align-items: center;
    display: flex;
    flex-direction: row;
    justify-content: center;
  }

  .restore-to-main-button {
    margin: 0 20px;
  }
</style>



