<template>
  <div class="ingredient">
    <div class="container">
      <p
        class="ingredient-quantity"
      >{{ingredient.quantity}}</p>
      <p
        class="ingredient-name"
      >{{ingredient.name}}</p>
    </div>
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
  .container {
    align-items: center;
    border: 1px solid #000;
    display: flex;
    flex-direction: row;
    justify-content: center;
    margin: 10px auto;
    width: 40vw;
  }

  .ingredient-quantity {
    margin-right: 10px;
  }
</style>


