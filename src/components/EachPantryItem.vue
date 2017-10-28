<template>
  <div class="each-pantry-item">
    <h3 class="pantry-item-name">{{item.name}}</h3>
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
};
</script>

<style scoped>

</style>


