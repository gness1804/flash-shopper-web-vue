<template lang="pug">
  .each-completed-item
    h3.completed-item-name {{item.name}}
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

</style>



