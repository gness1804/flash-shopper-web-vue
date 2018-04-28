<template>
  <div class="ingredient">
    <div
      class="container"
      v-bind:class="{ highlighted: isHighlighted}"
    >
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
     <img
      class="icon edit-ingredient-icon"
      src="../assets/pencil.png"
      v-on:click="openEditModal"
      title="Edit Ingredient"
    />
    <img
      class="icon highlight-ingredient-icon"
      src="../assets/eye.png"
      v-on:click="toggleHighlight"
      title="Highlight Ingredient"
    />
    </div>
  </div>
</template>

<script>
// @flow
import display from '../helpers/displayVars';
import { IngredientInt } from '../types/interfaces/Ingredient';

export default {
  name: 'Ingredient',
  props: {
    ingredient: {
      type: Object,
      required: true,
    },
  },
  data(): IngredientInt {
    return {
      containsKeyText: false,
      isHighlighted: false,
    };
  },
  methods: {
    addIngredient: function (): void {
      this.$emit('transferIngredient', this.ingredient);
      this.containsKeyText = true;
      setTimeout(() => {
        this.containsKeyText = false;
      }, display.timerStandard);
    },
    openEditModal: function (): void {
      this.$emit('openEditModal', this.ingredient);
    },
    removeIngredient: function (): void {
      const warning = confirm(`Delete ${this.ingredient.name}: are you sure?`);
      if (warning) {
        this.$emit('removeIngredient', this.ingredient);
      }
    },
    showToast: function (message: string): void {
      this.$emit('showToast', message);
    },
    toggleHighlight: function (): void {
      this.isHighlighted = !this.isHighlighted;
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

  .highlighted {
    border: 2px solid #f00;
    background-color: #C56415;
  }
</style>


