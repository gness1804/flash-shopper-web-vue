<template>
  <div class="ingredient">
    <div
      class="container"
      v-bind:class="{ hidden: isHidden }"
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
        class="icon hide-ingredient-icon"
        src="../assets/eye-blocked.png"
        v-on:click="hideIngredient"
        title="Hide Ingredient"
      />
    </div>
  </div>
</template>

<script>
// @flow
import containsDirString from '../helpers/containsDirString';
import display from '../helpers/displayVars';
import { IngredientInt } from '../types/interfaces/Ingredient';

export default {
  name: 'Ingredient',
  props: {
    ingredient: {
      type: Object,
      required: true,
    },
    dirToCheckAgainst: {
      type: String,
      required: false,
    },
  },
  data(): IngredientInt {
    return {
      containsKeyText: false,
      isHidden: false,
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
    hideIngredient: function (): void {
      this.isHidden = true;
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
  },
  watch: {
    dirToCheckAgainst: async function (newVal): void {
      this.containsKeyText = await containsDirString(newVal, this.ingredient.name);
      if (this.containsKeyText) {
        this.showToast('Ingredient(s) marked!');
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

  .hidden {
    display: none;
  }

  .ingredient-quantity {
    margin-right: 10px;
  }

  .ingredient-name {
    margin-right: 10px;
  }
</style>


