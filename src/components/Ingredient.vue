<template>
  <div class="ingredient">
    <div
      class="container"
      v-bind:class="[
        isHighlighted ? 'highlighted' : '',
        ingredient.isHidden ? 'hidden' : '',
      ]"
    >
      <p class="ingredient-quantity">{{ ingredient.quantity }}</p>
      <p class="ingredient-name">{{ ingredient.name }}</p>
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
        class="icon hide-ingredient-icon"
        src="../assets/check-square-o.png"
        v-on:click="hideIngredient"
        title="Hide Ingredient"
      />
    </div>
  </div>
</template>

<script>
// @flow
import { IngredientInt } from '../types/interfaces/Ingredient';
import display from '../helpers/displayVars';

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
      isHighlighted: false,
      isCompleted: false,
    };
  },
  methods: {
    addIngredient: function(): void {
      this.$emit('transferIngredient', this.ingredient);
      this.setTempHighlighting();
    },
    hideIngredient: function(): void {
      this.$emit('hideIngredient', this.ingredient);
    },
    openEditModal: function(): void {
      this.$emit('openEditModal', this.ingredient);
    },
    removeIngredient: function(): void {
      const warning = confirm(`Delete ${this.ingredient.name}: are you sure?`);
      if (warning) {
        this.$emit('removeIngredient', this.ingredient);
      }
    },
    setTempHighlighting: function(): void {
      this.isHighlighted = true;
      setTimeout(() => {
        this.isHighlighted = false;
      }, display.timerStandard);
    },
    showToast: function(message: string): void {
      this.$emit('showToast', message);
    },
  },
};
</script>

<style scoped>
.container {
  align-items: center;
  border: 1px solid #000000;
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
  border: 2px solid #ff0000;
  background-color: #c56415;
}

.hidden {
  display: none;
}
</style>
