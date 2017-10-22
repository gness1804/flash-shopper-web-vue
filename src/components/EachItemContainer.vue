<template>
  <div class="each-item-container">
    <h3>{{item.name}}</h3>
    <p>{{item.aisle}}</p>
    <p>{{item.note}}</p>
    <p>{{item.quantity}}</p>
  </div>
</template>

<script>
export default {
  name: 'EachItemContainer',
  props: {
    item: {
      type: Object,
      required: true,
    },
  },
  // data() {
  //   return {

  //   };
  // },
};
</script>

<style scoped>

</style>


