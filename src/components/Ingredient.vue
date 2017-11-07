<template>
  <div class="ingredient">
    <h4>{{ingredient.name}}</h4>
  </div>
</template>

<script>
export default {
  name: 'ingredient',
  props: {
    ingredient: {
      type: Object,
      required: true,
    },
  },
};
</script>

<style scoped>

</style>


