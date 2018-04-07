<template lang="pug">
  .each-completed-item
    h3.completed-item-name {{item.name}}
    img.large-icon.restore-to-main-button(src="../assets/arrow-up.png")
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
};
</script>

<style>
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



