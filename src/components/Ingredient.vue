<template>
  <div class="ingredient">
    <div class="container">
      <p
        class="ingredient-quantity"
      >{{ingredient.quantity}}</p>
      <p
        class="ingredient-name"
      >{{ingredient.name}}</p>
    <img
      class="delete-ingredient-icon"
      src="../assets/cancel-circle.png"
      v-on:click="removeIngredient"
      title="Delete Ingredient"
    />
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
  methods: {
    removeIngredient: function () {
      const warning = confirm(`Delete ${this.ingredient.name}: are you sure?`);
      if (warning) {
        this.$emit('removeIngredient', this.ingredient);
      }
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


