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
      class="icon delete-ingredient-icon"
      src="../assets/cancel-circle.png"
      v-on:click="removeIngredient"
      title="Delete Ingredient"
    />
    <img
      class="icon add-ingredient-icon"
      src="../assets/plus-icon-small.png"
      v-on:click="addIngredient"
      title="Add Ingredient"
    />
    </div>
  </div>
</template>

<script>
// @flow

export default {
  name: 'Ingredient',
  props: {
    ingredient: {
      type: Object,
      required: true,
    },
  },
  methods: {
    addIngredient: function (): void {
      this.$emit('transferIngredient', this.ingredient);
    },
    removeIngredient: function (): void {
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
    width: 60vw;
  }

  .ingredient-quantity {
    margin-right: 10px;
  }

  .ingredient-name {
    margin-right: 10px;
  }
</style>


